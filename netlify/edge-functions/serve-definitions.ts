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

  if (response.status === 200) {
    // Setting proper Content-Type header for JSON Schema files.
    // This lets tooling fetch the schemas directly from their URL.
    response.headers.set("Content-Type", "application/schema+json");

    // Sending metrics to NR.
    await sendMetrics(request, context);
  }
  
  return response;
};

async function sendMetrics(request: Request, context: Context) {
  try {
    const rawResponse = await doFetch(`https://insights-collector.eu01.nr-data.net/v1/accounts/${NR_ACCOUNT}/events`, {
      timeout: 2000, // Success in 2 seconds, cancel if not. User's request is more important than collecting metrics.
      method: 'POST',
      headers: {
        'Api-Key': NR_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "eventType":"AsyncAPIJSONSchemaDefinitionDownload",
        "path": new URL(request.url).pathname,
      })
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

interface TimeoutRequestInit extends RequestInit {
  timeout: number;
}

async function doFetch(resource: string, options: TimeoutRequestInit): Promise<Response> {
  const { timeout = 5000 } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(timeoutId);
  return response;  
}