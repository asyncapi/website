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

const context = {
  next: () => {},
  log: () => {},
};

/**
 * Creates the New Relic-counting fetch stub together with the counter it
 * increments. Both belong to exactly one test, so no test can observe another
 * test's calls and nothing needs to be reset.
 */
function setup() {
  const counter = { calls: 0 };

  const fetchStub = stub(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = new Request(input, init);

    if (req.url === metricURL) {
      counter.calls++;
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

  return { fetchStub, counter };
}

Deno.test("serve-definitions test for validRequests", async () => {
  const session = setup();
  using _fetchStub = session.fetchStub;

  for (const entry of validRequests) {
    const request = new Request(entry.requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);
    const body = await response.json();

    assertEquals(response.status, 200);
    assertEquals(response.headers.get("Content-Type"), "application/schema+json");
    assertEquals(body.url, entry.responseURL);
  }

  assertEquals(session.counter.calls, validRequests.length);
});

Deno.test("serve-definitions test for invalidRequests", async () => {
  const session = setup();
  using _fetchStub = session.fetchStub;

  for (const entry of invalidRequests) {
    const request = new Request(entry.requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);

    assertEquals(response, undefined);
  }

  // No metrics should be sent for invalid requests
  assertEquals(session.counter.calls, 0);
});

Deno.test("serve-definitions test for various response statuses", async () => {
  const counter = { calls: 0 };
  const testCases = [
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 200 },
    { requestURL: "https://asynccode.com/definitions/2.4.0/info.json", status: 304 },
    { requestURL: "https://asyncapi.com/definitions/2.4.0/info.json", status: 404 },
    { requestURL: "https://asynccode.com/definitions/2.4.0/info.json", status: 500 },
  ];

  for (const { requestURL, status } of testCases) {
    using _fetchStub = stub(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
      const req = new Request(input, init);

      if (req.url === metricURL) {
        counter.calls++;
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
  }

  // serve-definitions.ts reports a metric for every .json file request:
  // 200/304 as success, 404/500 as errors. The stub counts each NR endpoint
  // call, so the expected total is every test case.
  assertEquals(counter.calls, testCases.length);
});

Deno.test("serve-definitions test for schema-unrelated requests", async () => {
  const session = setup();
  using _fetchStub = session.fetchStub;

  const schemaUnrelatedRequests = [
    "https://asyncapi.com/definitions/asyncapi.yaml",
    "https://asyncapi.com/schema-store/2.4.0.JSON",
    "https://asyncapi.com/foobar",
    "https://asyncapi.com/",
  ];

  for (const requestURL of schemaUnrelatedRequests) {
    const request = new Request(requestURL, { method: "GET" });
    const response = await serveDefinitions(request, context as Context);

    assertEquals(response, undefined);
  }

  assertEquals(session.counter.calls, 0);
});

Deno.test("serve-definitions test for schema-related non-JSON requests", async () => {
  const session = setup();
  using _fetchStub = session.fetchStub;

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

    const request = new Request(requestURL, { method: "GET" });
    const response = await serveDefinitions(request, localContext as unknown as Context);
    const body = response?.body ? await response.json() : null;

    assertEquals(response?.status, 200);
    assertEquals(body.url, requestURL);
    assertEquals(response.headers.get("Content-Type"), "application/json"); // Default content type for non-JSON requests
  }

  assertEquals(session.counter.calls, 0);
});
