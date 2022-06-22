import type { Context } from "netlify:edge";

const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN_NR");
const NR_API_KEY = Deno.env.get("NR_API_KEY");
const NR_METRICS_ENDPOINT = Deno.env.get("NR_METRICS_ENDPOINT") || "https://metric-api.eu.newrelic.com/metric/v1";

// Example of legitimate request: /<source>/<file> OR /<source>
// Example of non-legitimate request: /<source>/<another-random-path>/<file>
const legitimateRequestRegex = /^\/[\w\-]*(\/[\w\-\.]*\.json)?$/

export default async (request: Request, context: Context) => {
  if (!isRequestLegitimate(request)) {
    context.log("Request is not legitimate");
    return;
  }

  // Deleting Origin header, which is involved in the cache policy, so requests can hit GH cache.
  // Reason: raw.githubusercontent.com responses include vary: Authorization,Accept-Encoding,Origin
  request.headers.delete("origin");

  // Setting GH Token to increase GH rate limit to 5,000 req/h.
  request.headers.set("Authorization", "token " + GITHUB_TOKEN);

  // Fetching the definition file
  const response = await context.next();

  const isRequestingAFile = request.url.charAt(request.url.length - 1) !== "/";
  if (isRequestingAFile) {
    if (response.ok) {
      // Setting proper Content-Type header for JSON Schema files.
      // This lets tooling fetch the schemas directly from their URL.
      response.headers.set("Content-Type", "application/schema+json");

      // Sending metrics to NR.
      const metric = newNRMetricCount("asyncapi.jsonschema.download.success", request)

      await sendMetricToNR(context, metric);
    } else {
      // Notifying NR of the error.
      const attributes = {
        "responseStatus": response.status,
        "responseStatusText": response.statusText,
      };
      const metric = newNRMetricCount("asyncapi.jsonschema.download.error", request, attributes);

      await sendMetricToNR(context, metric);
    }
  }

  return response;
};


// Non-legitimate requests should not use our Github Token and affect the rate limit.
function isRequestLegitimate(request: Request): boolean {
  return legitimateRequestRegex.test(new URL(request.url).pathname);
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

function newNRMetricCount(name: string, request: Request, attributes: any = {}): NRMetric {
  var metric = new NRMetric(name, NRMetricType.Count, 1);
  metric["interval.ms"] = 1;

  const splitPath = new URL(request.url).pathname.split("/");

  metric.attributes = {
    "source": splitPath[1],
    "file": splitPath[2],
    "url": request.url,
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