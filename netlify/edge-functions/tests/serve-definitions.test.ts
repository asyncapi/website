import serveDefinitions from "../serve-definitions.ts";
import { Context } from "https://edge-bootstrap.netlify.app/v1/index.ts";
import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";

const validRequests = [
  {
    requestURL: "http://localhost:8888/definitions/2.4.0/info.json",
    responseURL:
      "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/definitions/2.4.0/info.json",
  },
  {
    requestURL: "http://localhost:8888/schema-store/2.5.0-without-$id.json",
    responseURL:
      "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/schemas/2.5.0-without-$id.json",
  },
];

const invalidRequests = [
  {
    requestURL: "http://localhost:8888/definitions/asyncapi.yaml",
  },
  {
    requestURL: "http://localhost:8888/schema-store/2.4.0.JSON",
  },
];

const context = {
  next: () => {},
  log: () => {},
};

function setup() {
  mf.install();

  mf.mock("*", (req) => {
    console.log(req.url);

    const body = {
      url: req.url,
      method: req.method,
      headers: req.headers,
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}

Deno.test("serve-definitions test for validRequests", async () => {
  setup();

  for (const entry of validRequests) {
    console.log("Testing: " + entry.requestURL);

    const request = new Request(entry.requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);
    const body = await response.json();

    assertEquals(response.status, 200);
    assertEquals(body.url, entry.responseURL);

    console.log("\n");
  }

  mf.uninstall();
});

Deno.test("serve-definitions test for invalidRequests", async () => {
  setup();

  for (const entry of invalidRequests) {
    console.log("Testing: " + entry.requestURL);
    const request = new Request(entry.requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);
    
    assertEquals(response, undefined);    
  }

  mf.uninstall();
});
