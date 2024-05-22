import serveDefinitions from "../serve-definitions.ts";
import { Context } from "https://edge-bootstrap.netlify.app/v1/index.ts";
import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";

const metricURL = "https://metric-api.eu.newrelic.com/metric/v1";

const validRequests = [
  {
    requestURL: "https://asyncapi.com/definitions/2.4.0/info.json",
    responseURL:
      "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/definitions/2.4.0/info.json",
  },
  {
    requestURL: "https://asyncapi.com/definitions/2.4.0.json",
    responseURL:
      "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/schemas/2.4.0.json",
  },
  {
    requestURL: "https://asyncapi.com/schema-store/2.5.0/operation.json",
    responseURL:
      "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/definitions/2.5.0/operation.json",
  },
  {
    requestURL: "https://asyncapi.com/schema-store/2.5.0-without-$id.json",
    responseURL:
      "https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/schemas/2.5.0-without-$id.json",
  },
];

const invalidRequests = [
  {
    requestURL: "https://asyncapi.com/definitions/asyncapi.yaml",
  },
  {
    requestURL: "https://asyncapi.com/schema-store/2.4.0.JSON",
  },
  {
    requestURL: "https://asyncapi.com/foobar",
  },
  {
    requestURL: "https://asyncapi.com/",
  },
];

const context = {
  next: () => {},
  log: () => {},
};

let metricCalls = 0;

function setup() {
  mf.install();

  mf.mock("*", (req) => {
    console.log(req.url);
    
    if (req.url === metricURL) {
      metricCalls++;
    }

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
  metricCalls = 0;

  setup();

  for (const entry of validRequests) {
    console.log("Testing: " + entry.requestURL);

    const request = new Request(entry.requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);
    const body = await response.json();

    assertEquals(response.status, 200);
    assertEquals(response.headers.get("Content-Type"), "application/schema+json");
    assertEquals(body.url, entry.responseURL);

    console.log("\n");
  }

  assertEquals(metricCalls, validRequests.length);

  mf.uninstall();
});

Deno.test("serve-definitions test for invalidRequests", async () => {
  metricCalls = 0;

  setup();

  for (const entry of invalidRequests) {
    console.log("Testing: " + entry.requestURL);
    const request = new Request(entry.requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);
    
    assertEquals(response, undefined);    
  }

  // No metrics should be sent for invalid requests
  assertEquals(metricCalls, 0);

  mf.uninstall();
});

Deno.test("serve-definitions test for various response statuses", async () => {
  const testCases = [
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 200, mockParam: "GET@https://asyncapi.com/definitions/2.4.0/info.json" },
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 304, mockParam: "GET@https://asyncapi.com/definitions/2.4.0/info.json" },
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 404, mockParam: "GET@https://asyncapi.com/definitions/2.4.0/info.json" },
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 500, mockParam: "GET@https://asyncapi.com/definitions/2.4.0/info.json" }, 
  ];

  for (const { requestURL, status, mockParam } of testCases) {
    console.log("Testing: " + requestURL);

    mf.install();

    mf.mock("*", () => {
      return new Response(status === 200 ? JSON.stringify({ url: requestURL }) : null, {
        status,
      });
    });

    const request = new Request(requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);

    if (status === 200) {
      const body = response.body ? await response.json() : null;
      assertEquals(response.status, status);
      assertEquals(body?.url, requestURL);
    } else {
      assertEquals(response.status, status);
    }

    if (status === 200 || status === 304) {
      metricCalls++;
    }

    
    console.log("\n");
    mf.uninstall();
  }

  assertEquals(metricCalls, testCases.filter((testCase) => testCase.status === 200 || testCase.status === 304).length);
});

Deno.test("serve-definitions test for schema-unrelated requests", async () => {
  setup();

  const schemaUnrelatedRequests = [
    "https://asyncapi.com/definitions/asyncapi.yaml",
    "https://asyncapi.com/schema-store/2.4.0.JSON",
    "https://asyncapi.com/foobar",
    "https://asyncapi.com/",
  ];

  for (const requestURL of schemaUnrelatedRequests) {
    console.log("Testing: " + requestURL);
    const request = new Request(requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);

    assertEquals(response, undefined);
  }

  mf.uninstall();
});

Deno.test("serve-definitions test for schema-related non-JSON requests", async () => {
  setup();
  metricCalls = 0;

  const schemaRelatedNonJsonRequests = [
    "https://asyncapi.com/schema-store/2.5.0-without-$id",
  ];

  for (const requestURL of schemaRelatedNonJsonRequests) {
    const context = {
      next: () => {
        return new Response(JSON.stringify({ url: requestURL }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      log: () => {},
    }

    console.log("Testing: " + requestURL);
    const request = new Request(requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as unknown as Context);
    const body = response?.body ? await response.json() : null;

    assertEquals(response?.status, 200);
    assertEquals(body.url, requestURL);
    assertEquals(response.headers.get("Content-Type"), "application/json"); // Default content type for non-JSON requests
  }

  mf.uninstall();

  assertEquals(metricCalls, 0);
});
