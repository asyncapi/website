import type { Context } from "netlify:edge";

const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
const NR_ACCOUNT = Deno.env.get("NR_ACCOUNT");
const NR_API_KEY = Deno.env.get("NR_API_KEY");

export default async (request: Request, context: Context) => {
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
      const event = {
        "eventType": "AsyncAPIJSONSchemaDefinitionDownload",
      };
  
      await sendEventToNR(request, context, event);
    } else {
      // Notifying NR of the error.
      const event = {
        "eventType": "AsyncAPIJSONSchemaDefinitionDownloadError",
        "responseStatus": response.status,
        "responseStatusText": response.statusText,
      };
  
      await sendEventToNR(request, context, event);
    }
  } 
  
  return response;
};

interface TimeoutRequestInit extends RequestInit {
  timeout: number;
}

async function doFetch(resource: string, options: TimeoutRequestInit): Promise<Response> {
  const { timeout = 5000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {...options, signal: controller.signal});
  clearTimeout(timeoutId);
  return response;
}

interface NREvent {
  eventType: string;
  url?: string;
  source?: string;
  file?: string;
}

async function sendEventToNR(request: Request, context: Context, event: NREvent) {
  const splitPath = new URL(request.url).pathname.split("/");
  if (event.source === "" || event.source === undefined) {
    event.source = splitPath[1];
    event.file = splitPath[2];
  }

  event.url = request.url;

  try {
    const rawResponse = await doFetch(`https://insights-collector.eu01.nr-data.net/v1/accounts/${NR_ACCOUNT}/events`, {
      timeout: 2000, // Success in 2 seconds, cancel if not. User's request is more important than collecting metrics.
      method: 'POST',
      headers: {
        'Api-Key': NR_API_KEY || "",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (rawResponse.status !== 200) {
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