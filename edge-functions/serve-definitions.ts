import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  
  // Setting proper Content-Type header for JSON Schema files.
  // This lets tooling fetch the schemas directly from their URL.
  response.headers.set("Content-Type", "application/schema+json");
  
  return response;
};