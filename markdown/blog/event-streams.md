---
title: "Designing Event Streams for AI Agents"
date: 2026-10-19T06:00:00+01:00
type: Engineering
tags:
  - Event Streams
cover: /img/posts/event-streams/blog-banner.webp
authors:
  - name: Dakshitha Ratnayake
    photo: /img/avatars/dakshitha.webp
    link: https://www.linkedin.com/in/dakshitha-ratnayake-3197181a
    byline: Director of Developer Relations at WSO2, with over 15 years of experience in software development, solution architecture, and technical evangelism
excerpt: 'Picture an AI agent subscribed to a real-time event stream, calling a large language model on every event that arrives. Over a weekend, across hundreds of thousands of events, it quietly burns through hundreds of dollars.'
---

## Designing Event Streams for AI Agents

Picture an AI agent subscribed to a real-time event stream. Every time an event arrives, the agent calls a large language model to decide what to do next. Over a single weekend, hundreds of thousands of events pass through the stream. Each event is legitimate, but the model calls quietly accumulate, burning through hundreds of dollars. From the platform's perspective, nothing appears to be wrong. The events are valid. The agent is authenticated. Its subscription is active. The brokers are healthy, and no operational alerts are triggered.

Every existing check passes. The problem is that those checks were designed to monitor the infrastructure, not how an autonomous agent consumes the stream.They tell you whether events are being delivered. They do not tell you whether the agent should be receiving them, whether it needs all of them, what actions they trigger, or how much those actions cost. As more agents begin reacting to events in real time, these gaps become harder to ignore.

## An agent is not a microservice
Event streams were designed with a particular kind of consumer in mind: the microservice. Several of the assumptions behind that design start to break when the consumer is an agent.

Consider what a microservice consumer actually is. Given the same event and the same state, it follows a known execution path. Its resource requirements and downstream behavior are reasonably predictable.

An agent is different.

An event may trigger a reasoning loop whose length is not known in advance. The agent may invoke a model several times, retrieve additional context, call tools, retry an action, or branch into further work. Its behavior is probabilistic, and so is the amount of computation a single event can trigger.

That makes the cost much less predictable too. Each model invocation consumes tokens, and later steps may require more context than earlier ones as the agent carries forward conversation history, retrieved information, tool results, and intermediate reasoning. A single event can therefore turn into multiple increasingly expensive model calls.

That problem exists however the agent is triggered. Event streams simply change the scale.

An event-driven agent can receive hundreds or thousands of machine-generated triggers. You are no longer attaching a bounded piece of code to a high-throughput stream. You are attaching a potentially open-ended reasoning process to it.
That changes what the infrastructure needs to control. With a traditional consumer, it is usually enough to govern whether a service can connect to a stream and then monitor whether that service is healthy. But when a single event can trigger an unpredictable chain of model calls, tool calls, and downstream actions, knowing that the agent is allowed to connect tells you very little about what it is allowed to do with what it consumes.

The infrastructure is not wrong; the unit of control has changed. Security at the connection level and monitoring at the service level are no longer sufficient. Agents need contracts around what they can consume and act on at the channel level, and observability into what each consumed event actually causes. 

That mismatch produces three specific gaps.

## Gap 1: Discovery. The stream nobody documented
If you build a REST API, it usually ends up registered in an API gateway, where people can find it via a portal or registry. Event streams often never get that treatment. In many organizations, Kafka topics live in broker configurations, consumer-group assignments, and tribal knowledge, meaning the information exists only in people's heads. Teams that run a schema registry have solved one piece of this: the registry can tell you the shape of the data on a topic, and it can catch some breaking changes when producers register a new version. But it stops there. It does not tell you what topics exist and what they are for, where to connect and over what protocol, what credentials and scopes are required, or what volume to expect. The schema is one field of the contract, not the contract. Documentation by convention, meaning Confluence pages and README files, covers the rest badly and does not scale as agent systems multiply. Mature organizations have moved to stream catalogues and portals, and the machine-readable document those catalogues index is exactly what the next section describes.

Discovery is not a one-time problem either. Streams change. A renamed field or a changed type silently breaks the consumers downstream, because nobody knew they were listening. Now consider this: if a schema change can silently break a deterministic consumer, imagine what it does to an agent that acts on what it reads.

## Gap 2: Access. Authenticated is not scoped

Authentication is proving who you are, authorization is what you are allowed to do. In most event systems today, authentication happens at the connection. Once a client holds valid broker or gateway credentials, ask “which channels can it subscribe to” and the answer is very often: all of them. For a code-reviewed microservice, that was an acceptable trade (but this was never good security posture), made knowingly, because the code only ever subscribed to the topics it was written to subscribe to.

An agent breaks the assumption that made the gap survivable. An order-monitoring agent typically holds credentials that could also reach the raw payments topic and the support-tickets topic. It only happens to subscribe to orders. Nothing enforces that. The day someone loosens its prompt to "investigate anything suspicious," it starts pulling payment data into LLM prompts, and nothing anywhere says no. And remember: an agent does not just read what it reaches. It acts on it. Fine-grained, rigorously enforced authorization was always the right goal. Agents move it from best practice to prerequisite.

Now put an agent behind those same credentials. An order-monitoring agent typically holds credentials that could also reach the raw payments topic and the support-tickets topic. It only happens to subscribe to orders. Nothing enforces that. The day someone loosens its prompt to “investigate anything suspicious,” it starts pulling payment data into LLM prompts, and nothing anywhere says no. And remember: an agent does not just read what it reaches. It acts on it.

## Gap 3: Observability. Green dashboards, broken data

Gap three is observability. Your streaming stack can tell you whether events are flowing, but not what a consumer is actually doing with them. Cluster monitoring answers, “Is the platform healthy?” (lag, throughput, broker health). But the metrics that predict agent trouble sit one layer higher: what each consumer is consuming, invoking, and spending.

For agents, that introduces a metric we have never really needed before: dollars per subscription. Traditional consumers had relatively predictable costs, so nobody thought to alert on them. Agentic consumers can turn a stream of events into downstream API calls, model invocations, and rapidly growing spend.

The takeaway is simple: infrastructure monitoring asks, “Is the platform healthy?” For agents, that is no longer enough. The more important question is, “What is this consumer doing, and what is it costing?”(per agent, per channel). And today, very little in a standard streaming stack can answer that.

## This is where the industry is heading
These three gaps would matter less if agents on event streams were a niche experiment. They are not. Over the last year, Confluent, StreamNative, HiveMQ, and Solace have all published architectures where agents consume streams directly, with Solace going furthest: agents that dynamically subscribe to precisely the streams they need in the moment, then unsubscribe. The industry's own guidance is to build agents that choose their own subscriptions while they run.

But who may subscribe to what? How do you control cost when consumption triggers model calls? How would you observe any of it?

## What AsyncAPI v3 provides
Look back at the three gaps and notice what they share. Each begins with the same absence: nothing machine-readable describes the stream. Discovery failed because there was nothing for a catalogue to index. Access could not be scoped because nothing declared which credentials belong to which channel, so a gateway had nothing to enforce. Consumption could not be governed because nothing named the unit to govern: which agent, on which channel, at what expected volume. All three gaps are one missing artifact: a contract for the stream, written down in a form both people and software can read.

That contract format exists. AsyncAPI is to event-driven APIs what OpenAPI is to REST: a YAML document describing the interface, meaning its servers, channels, messages, operations, and security requirements, so that every team, every gateway, and increasingly every agent reads one shared document instead of guessing.
Let’s take a look at a scenario where agents consume a WebSocket stream backed by Kafka, with a gateway in front. The agents never touch Kafka directly. Every subscription terminates at the gateway.

Here is a real (trimmed) AsyncAPI v3 document for that interface:

```yaml
asyncapi: 3.0.0
info:
  title: Order Events Streaming API
  version: 1.2.0

servers:
  production:
    host: events.acme.example
    protocol: wss
    description: Event gateway fronting the order-events Kafka cluster over WebSocket.

channels:
  orderEvents:
    address: orders/{region}/events
    description: >
      Order lifecycle events per region.
      Peak throughput 200-500 events/sec.
    parameters:
      region:
        enum: [eu, us, apac]
    messages:
      orderEvent:
        $ref: '#/components/messages/OrderEvent'

operations:
  receiveOrderEvents:
    action: receive
    channel:
      $ref: '#/channels/orderEvents'
    security:
      - $ref: '#/components/securitySchemes/agentOAuth'

components:
  messages:
    OrderEvent:
      name: OrderEvent
      title: Order lifecycle event
      payload:
        type: object
        required: [order_id, type, region, amount, occurred_at]
        properties:
          order_id:
            type: string
            format: uuid
          type:
            type: string
            enum: [order.placed, payment.failed, order.cancelled, refund.requested]
          region:
            type: string
            enum: [eu, us, apac]
          amount:
            type: number
            description: Order value in the region's currency.
          occurred_at:
            type: string
            format: date-time
  securitySchemes:
    agentOAuth:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://auth.acme.example/token
          availableScopes:
            orders:events:read:eu: Subscribe to EU order event channels
            orders:events:read:us: Subscribe to US order event channels
            orders:events:read:apac: Subscribe to APAC order event channels

```

Let’s walk it block by block, against the three gaps.

- **servers**. Where to connect, over what protocol, with what kind of authentication, all in a format machines can read. An agent, or the engineer building one, learns the front door from the contract instead of from a colleague.
- **channels, and the parameterized address**. The curly braces in `orders/{region}/events` mean one definition describes a whole family of channels: `orders/eu/events`, `orders/us/events`, `orders/apac/events`. That parameter is exactly where access scoping will attach, and the scopes that mirror it are declared a few blocks down.
- **The throughput line**. “Peak throughput 200-500 events/sec” is just prose, not enforcement. But it is prose inside the contract, where an integrating team will actually find it, instead of inside someone’s head. For a consumer that pays money every time it thinks, knowing the peak rate before the first event arrives is sizing information, not trivia.
- **messages**. The schema gives an agent names, types, and constraints before the first event ever arrives: the type enum tells it the four things that can happen to an order, the region field matches the channel parameter, and required fields are stated rather than assumed. It does not give business meaning, an LLM may infer that, but it is far better than reverse-engineering payloads from samples. The schema is also what lets a gateway or client validate each event at the edge, so a drifted field fails loudly instead of silently.
- **operations**. This is v3’s cleanest structural change: operations are separated from channels and carry their own security. That means “receiving from the eu channel requires orders:events:read:eu” can be expressed as part of the contract rather than implied.
- **securitySchemes**. The available scopes mirror the region parameter one for one. It is worth being precise about the division of labor here: the spec lets you declare the scopes and parameterize the address, but the rule binding the region parameter to the region scope is a convention you establish, and the gateway is what encodes and enforces it. The contract makes the convention visible; it does not make it real.

The spec provides the critical contract. Enforcement, rate limiting, cost semantics, and visibility into consumer behavior come from the mechanisms working alongside it, your gateway and your infrastructure. A specification describes security intent; whether that intent becomes reality depends on what enforces it. Which is why the next section exists: three governance patterns, one per gap.

## Three architectural patterns that close the gaps

- **Access: map scopes to channels**. This is a governance pattern, not part of the specification. An API gateway can map channel address patterns to required scopes, and check every subscription attempt against the client’s token. A token scoped to region eu opens orders/eu/events and nothing else. Two working practices make the pattern hold in real life: give each agent its own credentials, per purpose, never one shared “agents” account; and review scope grants the way you review code, so the spec change and the access change appear in the same review.

- **Cost: invert the default**. The runaway agent’s real bug is architectural: “every event goes to the model.” Flip that. Make the LLM call the expensive escalation path, not the unit of processing. Tier one filters locally with cheap deterministic checks, ordinary if-statements, and most events should die there for free. Tier two collects a batch into a window and makes one model call over the whole aggregate. Tier three reasons about a single event, rarely, and only while a budget allows. Around all of it sits a circuit breaker, a dollars-per-subscription-per-hour limit that, when tripped, switches the model off, keeps the local rules running, and pages a human. The agent keeps working. The bill stops. One update worth knowing: token-based rate limiting is starting to appear in AI gateways as a product feature, which means the breaker’s trigger, the stop-spending decision, is increasingly something your gateway can enforce for you. The graceful landing, falling back to local rules and paging a human can be handled by the agent code.

<Figure
  src="/img/posts/event-streams/image1.webp"
  caption="Figure 1: The cost inversion. Each tier is narrower than the last because fewer events should reach it; the breaker’s trigger can come from an AI Gateway, the fallback is still your code"
  className="text-center"
/>

- **Observability: add what agents require**. Keep the classic metrics: latency, retries, dropped events. Agents add four more, tracked per agent, per channel: events consumed; LLM invocations, watching the ratio of invocations to events; cost per subscription per hour, alerted like any budget; and downstream actions, because consume-and-act is a feedback loop you need to see end to end. 

## Where AsyncAPI fits in the agent stack
Three specifications increasingly appear in agent architectures, and they solve different problems rather than competing. OpenAPI describes HTTP APIs and the operations they expose. AsyncAPI describes event-driven interfaces: servers, channels, messages, operations, and security requirements. MCP, the Model Context Protocol, operates at runtime, letting an AI application discover and use capabilities such as tools, resources, and prompts. Put simply, OpenAPI and AsyncAPI describe interfaces; MCP defines how an AI application interacts with capabilities while it is running.

<Figure
  src="/img/posts/event-streams/image2.webp"
  caption="Figure 2: OpenAPI is the contract for synchronous request/response, AsyncAPI is the contract for event-driven interfaces, and MCP is the live protocol for finding and invoking tools at runtime."
  className="text-center"
/>

The idea of [AsyncAPI as the way agents consume event streams](https://www.apiscene.io/ai-and-apis/ai-agents-asyncapi-event-streams/) is not new. An agent can already consume an event API described in AsyncAPI. What makes it work today is a developer in the loop: the developer reads the contract, builds or generates the protocol client (e.g., a WebSocket client), obtains a scoped access token for the agent, and points it at the event gateway. From there the agent connects and subscribes, and the gateway authorizes or refuses each channel. The next section in this article walks that chain end to end. 

The unsolved part is removing the developer from that loop. An agent has no standard way to discover which event APIs are relevant to its task, request the scopes it needs, or configure its own governed subscription directly from the contract; teams that want this build it themselves. An agent can ask an MCP server what tools it has, which in practice gives OpenAPI-described APIs a runtime discovery path; there is no equivalent call for asking what AsyncAPI-described streams it may read. The request/response side of the stack has a runtime protocol for discovery; the event-driven side still ends at a catalogue built for humans.

AsyncAPI can tell an agent how an event API works. What is still missing is a broadly adopted runtime layer that helps the agent determine which streams it should consume and governs that consumption from discovery through execution.

## One agent, end to end: A use case

An online retailer streams every order event onto one Kafka topic, orders.events: placed, payment failed, cancelled, refund requested. A fraud triage agent watches the stream. Its job is to spot the patterns rules miss and flag the order before it ships: three cancellations from one card in a minute, a first-time buyer sending high-value goods to a freight forwarder, a refund requested nine minutes after delivery.
The same topic feeds the shipping service, an ordinary microservice running since 2019. Its topic name sits in a config file. The agent’s behavior on any given event is a model’s judgement.

**Design time**. The orders team writes the AsyncAPI document shown earlier, and it does two jobs at once. Importing it into the gateway creates the WebSocket API, its per-region topics, and the scope attached to each topic. Publishing it lists the same document in the developer portal, where the fraud team finds the channel and requests the eu scope, approved like a code review. One document, two readers: it creates the proxy that enforces it, and it teaches the consuming team what to ask for.

<Figure
  src="/img/posts/event-streams/image3.webp"
  caption="Figure 3: One document, two readers. The agent reads the contract to learn what to request; the gateway reads the same contract to decide what to enforce."
  className="text-center"
/>


**Startup**. The agent boots, asks its MCP server what tools it may use (flag_order and issue_refund, both fronting OpenAPI-described REST endpoints), gets a token for orders:events:read:eu, connects, and subscribes. The gateway checks the scope on each subscribe, not on the connection:

```
→ { "action": "subscribe", "channel": "orders/eu/events" }
← { "type": "subscribed", "channel": "orders/eu/events" }
→ { "action": "subscribe", "channel": "orders/us/events" }
← { "type": "error", "channel": "orders/us/events", "code": "scope_denied" }
```

Authenticated the whole time, still refused. That is gap 2, closed on the wire.

**Runtime**. An event arrives and is validated against the contract’s schema.

<Figure
  src="/img/posts/event-streams/image4.webp"
  caption="Figure 4:The path of one event. The gateway is the only Kafka consumer; the agent never sees a broker. Inside the agent, the expensive step is the escalation, not the default."
  className="text-center"
/>

Every event goes through cheap, deterministic checks first: how large is the order, is the customer known, does the address look normal, how many orders has this card placed in the last few minutes. A $30 order from a regular customer fails none of them and is discarded immediately, at no cost. Most events end this way, and no model was ever involved.

Occasionally an event is genuinely suspicious. A first-time customer orders $2,900 of goods shipped to a freight forwarder. That event survives the checks, waits briefly while a few other suspicious events collect, and the whole batch goes to the model in one call. The model judges the order fraudulent, so the agent acts: it calls the flag_order tool through MCP, and the MCP server turns that into an ordinary authenticated request to the orders REST API. The tool call uses a different credential than the stream subscription, on purpose: permission to read orders and permission to flag them are separate things, and the agent holds them separately.

Two safety systems run underneath. The first is the budget: if the agent's model spending hits its hourly limit, model calls stop, the cheap checks keep the agent running, and a human is paged. The second is the meter, which records four numbers per agent: events received, model calls made, dollars spent this hour, and actions taken. The gateway counts the first automatically; the agent emits the other three. The number to watch is the ratio of model calls to events. If the filter is healthy, it stays low. If it starts climbing toward one call per event, the filter has stopped filtering, and you are watching next weekend's bill form while it is still cheap to stop.

Now ask the three questions from the start of this article. Is the stream discoverable? Yes: the contract sits in a catalogue, and both the consuming team and the gateway read it. Is access scoped? Yes: the gateway checks the token's scope on every subscribe. Is consumption observable? Yes: four numbers exist, and one of them is in dollars. 

## Running this on WSO2 API Platform

With the WSO2 API Platform, the gateway lets you [create a streaming API from an existing AsyncAPI definition](https://wso2.com/api-platform/docs/cloud/create-api-proxy/my-apis/websocket/import-api-contract/), and the managed API carries security, access control, and throttling like any other. Its topics map to backend channels, the Kafka topic in our scenario, and the developer portal plays the catalogue role: the fraud team finds the channel, reads the schema, and subscribes there.

The scope check works through topic-level scopes: to read a topic, the token must carry the scope attached to that specific topic. That is enforcement at the subscription, not the connection, which is exactly what gap 2 demands, and it is what produces the eu-allowed, us-refused exchange above. The two working practices from the governance patterns map to product concepts too: one developer-portal application per agent gives you credentials per purpose.

The agent’s outbound traffic, both thinking and acting, runs through the [AI Gateway](https://wso2.com/api-platform/docs/ai-gateway/1.1.0/overview/), which provides two proxies. Route the model calls through its LLM Proxy and the circuit breaker’s trigger stops being custom code: a token-based rate limit caps the tokens an application may consume in a window and throttles beyond it. The reaction stays yours; the agent still has to notice the throttling, fall back to its rules, and page a human. As a bonus, the proxy applies guardrails such as PII masking on traffic to the model, a second line of defense against the loosened-prompt scenario from gap 2: topic scopes stop the agent reading the payments stream in the first place, and masking limits the damage if sensitive fields reach a prompt anyway.

The action path runs through the same AI Gateway: its MCP Proxy generates MCP tools from REST APIs and governs agent access to them, so flag_order becomes a generated, governed tool with its own application and credential, preserving the read/write separation by construction.

And the meter: the analytics layer, powered by Moesif, tracks API calls, LLM tokens, custom metrics, and MCP tool invocations in one place. In this scenario’s terms, that is all four signals, joined by application identity, because the same agent application fronts all three gateways.

<Figure
  src="/img/posts/event-streams/image5.webp"
  caption="Figure 5: The platform version of the scenario. The Event Gateway governs what the agent consumes; the AI Gateway’s two proxies govern what it thinks and does; one analytics plane sits under all of it."
  className="text-center"
/>

## The Monday checklist
Run the three questions against your own event-driven interfaces.

- **Discoverable?** - If your channels, schemas, and connection details are not in a machine-readable contract that a catalogue can index, the answer is no. Writing your first AsyncAPI v3 document is the cheapest fix in this article.
- **Scoped?** - If a credentialed agent can subscribe to any channel on your broker or gateway, the answer is no. Scopes mapped to channel addresses, enforced at the gateway, with the spec as the source of truth.
- **Observable?** - If you cannot state, per agent and per channel, the event rate, the LLM-invocation ratio, and the dollars per hour, the answer is no, and you are one enthusiastic subscription away from your own weekend story.

The agent in the opening scenario was not broken. It was ungoverned. Those are different problems, and the second one is yours to fix, with tools that exist today: three open specifications and some deliberate engineering.

