// Changes to URL from 'netlify:edge' because we don't have package aliasing setup in our workflow.
import type { Context } from "https://edge-bootstrap.netlify.app/v1/index.ts";

const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN_NR");
const NR_API_KEY = Deno.env.get("NR_API_KEY");
const NR_METRICS_ENDPOINT = Deno.env.get("NR_METRICS_ENDPOINT") || "https://metric-api.eu.newrelic.com/metric/v1";

const URL_DEST_SCHEMAS = "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/schemas";
const URL_DEST_DEFINITIONS = "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/definitions";

// Schemas-related request:
//   Patterns: /<source> OR /<source>/<file> OR /<source>/<version>/<file>
//   Examples: /definitions OR /schema-store/2.5.0-without-$id.json OR /definitions/2.4.0/info.json
// Schemas-unrelated request:
//   Patterns: /<source>/<randompath>/*
//   Examples: /definitions/asyncapi.yaml OR /schema-store/2.4.0.JSON (uppercase)
//
// Schemas-unrelated requests should not use our GitHub Token and affect the rate limit. Those shouldn't send metrics to NR either as they just add noise.
const SchemasRelatedRequestRegex = /^\/[\w\-]*\/?(?:([\w\-\.]*\/)?([\w\-$%\.]*\.json))?$/

export default async (request: Request, context: Context) => {
  const rewriteRequest = buildRewrite(request);
  let response: Response;
  if (rewriteRequest === null) {
    // This is a Schema-unrelated request. Let it go through and do not intercept it.
    return await context.next();
  }

  // Fetching the definition file
  response = await fetch(rewriteRequest);

  const isRequestingAFile = request.url.endsWith('.json');
  if (isRequestingAFile) {
    let metricName: string
    const metricAttributes = {
      'responseStatus': response.status,
      'responseStatusText': response.statusText,
      'cached': false,
    };

    if (response.ok) {
      // Manually cloning the response so we can modify the headers as they are immutable
      response = new Response(response.body, response);

      // Setting proper Content-Type header for JSON Schema files.
      // This lets tooling fetch the schemas directly from their URL.
      response.headers.set("Content-Type", "application/schema+json");

      metricName = "asyncapi.jsonschema.download.success";
    } else {
      switch (response.status) {
        case 304:
          metricName = "asyncapi.jsonschema.download.success";
          metricAttributes.cached = true;
          break;
        default:
          // Notifying NR of the error.
          metricName = "asyncapi.jsonschema.download.error";
          console.log(`Error downloading JSON Schema file: ${  response.status  } ${  response.statusText}`);
          break;
      }
    }

    // Sending metrics to NR.
    await sendMetricToNR(context, newNRMetricCount(metricName, request, rewriteRequest, metricAttributes));
  }

  return response;
};

function buildRewrite(originalRequest: Request): (Request | null) {
  const extractResult = SchemasRelatedRequestRegex.exec(new URL(originalRequest.url).pathname);
  // No need to rewrite the request if it's not a legitimate request for a definition file
  if (extractResult === null || extractResult.length < 2 || !extractResult[2]) {
    return null;
  }

  const definitionVersion = extractResult[1];
  const file = extractResult[2];
  let url: string;

  if (definitionVersion === undefined) {
    // If no file is specified, the whole bundled schema will be served
    url = `${URL_DEST_SCHEMAS  }/${file}`;
  } else {
    url = `${URL_DEST_DEFINITIONS  }/${definitionVersion}${file}`;
  }

  originalRequest.headers.set('Authorization', `token ${  GITHUB_TOKEN}`);

  return new Request(url, {
    method: originalRequest.method,
    headers: originalRequest.headers,
  });
}

interface TimeoutRequestInit extends RequestInit {
  timeout: number;
}

async function doFetch(resource: string, options: TimeoutRequestInit): Promise<Response> {
  const { timeout = 5000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, { ...options, signal: controller.signal });
  clearTimeout(timeoutId);
  return response;
}

async function sendMetricToNR(context: Context, metric: NRMetric) {
  const metrics = [{ "metrics": [metric] }];
  try {
    const rawResponse = await doFetch(NR_METRICS_ENDPOINT, {
      timeout: 2000, // Success in 2 seconds, cancel if not. User's request is more important than collecting metrics.
      method: 'POST',
      headers: {
        'Api-Key': NR_API_KEY || "",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metrics)
    });

    if (!rawResponse.ok) {
      context.log(`Unexpected response status code when sending metrics: ${rawResponse.status} ${rawResponse.statusText}`);
    }
  } catch (e) {
    if (e instanceof DOMException) {
      context.log(`Timeout during sending metrics: ${e}`);
    } else {
      context.log(`Unexpected error sending metrics: ${e}`);
    }
  }
}

function newNRMetricCount(name: string, originalRequest: Request, rewriteRequest: Request, attributes: any = {}): NRMetric {
  const metric = new NRMetric(name, NRMetricType.Count, 1);
  metric["interval.ms"] = 1;

  const splitPath = new URL(originalRequest.url).pathname.split("/");
  // Examples:
  //   /definitions/2.4.0/info.json => file = info.json
  //   /definitions/2.4.0.json      => file = 2.4.0.json
  const file = splitPath.slice(-1).pop();
  const version = splitPath[2].replace(".json", "");

  metric.attributes = {
    "source": splitPath[1],
    "file": file,
    "url": originalRequest.url,
    "url_rewrite": rewriteRequest.url,
    "version": version,
    "file_type": rewriteRequest.url.startsWith(URL_DEST_SCHEMAS) ? "schema" : "definition",
    ...attributes,
  };

  return metric;
}

enum NRMetricType {
  Count = "count",
  Distribution = "distribution",
  Gauge = "gauge",
  Summary = "summary",
  UniqueCount = "uniqueCount",
}

class NRMetric {
  name: string;

  value: number | any;

  timestamp: number;

  "interval.ms": number;

  type: NRMetricType;

  attributes: any;

  constructor(name: string, type = NRMetricType.Count, value = 1, timestamp = Date.now()) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.timestamp = timestamp;
  }
}
