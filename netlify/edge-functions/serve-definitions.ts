import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {

  // Deleting Origin header, which is involved in the cache policy, so requests can hit GH cache.
  // Reason: raw.githubusercontent.com responses include vary: Authorization,Accept-Encoding,Origin
  request.headers.delete("origin");

  // Setting GH Token to increase GH rate limit to 5,000 req/h.
  request.headers.set("Authorization", "token " + Deno.env.get("GITHUB_TOKEN"));

  // Fetching the definition file
  const response = await context.next();
  
  // Setting proper Content-Type header for JSON Schema files.
  // This lets tooling fetch the schemas directly from their URL.
  response.headers.set("Content-Type", "application/schema+json");
  
  return response;
};