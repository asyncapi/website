import serveDefinitions from "../serve-definitions.ts";
import { Context } from "https://edge-bootstrap.netlify.app/v1/index.ts";
import { stub } from "jsr:@std/testing@1.0.20/mock";
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

// Counter of calls hitting the New Relic metrics endpoint, incremented by the
// fetch stubs below. The variable itself must be module-scoped because the stub
// closures capture it, but every test resets it before asserting, so no test
// depends on execution order or on another test's leftover value.
let metricCalls = 0;

const context = {
  next: () => {},
  log: () => {},
};

function setup() {
  return stub(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = new Request(input, init);

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
  using _fetchStub = setup();
  metricCalls = 0;

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
});

Deno.test("serve-definitions test for invalidRequests", async () => {
  using _fetchStub = setup();
  metricCalls = 0;

  for (const entry of invalidRequests) {
    console.log("Testing: " + entry.requestURL);
    const request = new Request(entry.requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);

    assertEquals(response, undefined);
  }

  // No metrics should be sent for invalid requests
  assertEquals(metricCalls, 0);
});

Deno.test("serve-definitions test for various response statuses", async () => {
  const testCases = [
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 200 },
    { requestURL: "https://asynccode.com/definitions/2.4.0/info.json", status: 304 },
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 404 },
    { requestURL: "https://asynccode.com/definitions/2.4.0/info.json", status: 500 },
  ];

  for (const { requestURL, status } of testCases) {
    console.log("Testing: " + requestURL);

    using _fetchStub = stub(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
      const req = new Request(input, init);

      if (req.url === metricURL) {
        metricCalls++;
      }

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

    console.log("\n");
  }

  // serve-definitions.ts reports a metric for every .json file request:
  // 200/304 as success, 404/500 as errors. The stub increments metricCalls
  // for each NR endpoint call, so the expected total is every test case.
  assertEquals(metricCalls, testCases.length);
});

Deno.test("serve-definitions test for schema-unrelated requests", async () => {
  using _fetchStub = setup();
  metricCalls = 0;

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

  assertEquals(metricCalls, 0);
});

Deno.test("serve-definitions test for schema-related non-JSON requests", async () => {
  using _fetchStub = setup();
  metricCalls = 0;

  const schemaRelatedNonJsonRequests = [
    "https://asyncapi.com/schema-store/2.5.0-without-$id",
  ];

  for (const requestURL of schemaRelatedNonJsonRequests) {
    const localContext = {
      next: () => {
        return new Response(JSON.stringify({ url: requestURL }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      log: () => {},
    };

    console.log("Testing: " + requestURL);
    const request = new Request(requestURL, { method: "GET" });
    const response = await serveDefinitions(request, localContext as unknown as Context);
    const body = response?.body ? await response.json() : null;

    assertEquals(response?.status, 200);
    assertEquals(body.url, requestURL);
    assertEquals(response.headers.get("Content-Type"), "application/json"); // Default content type for non-JSON requests
  }

  assertEquals(metricCalls, 0);
});
