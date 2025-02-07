---
title: Automatically pipe events from AsyncAPI channels with TriggerMesh
date: 2023-03-20T5:28:08+01:00
type: Engineering
tags: ['Serverless','CloudEvents']
cover: /img/posts/asyncapi-say-hi-to-triggermesh/blog-graphic-asyncapi-triggermesh.webp
authors:
  - name: Jonathan Michaux
    photo: /img/avatars/jmichaux.webp
    link: https://twitter.com/j_michaux
    byline: Product at TriggerMesh
excerpt: TriggerMesh makes it easy to reliably pipe events from any source to any destination. Let's use it to read from AsyncAPI channels, and see how to autogenerate the TriggerMesh config.
---

This tutorial demonstrates how to use AsyncAPI with TriggerMesh. It shows how the two play nicely together because TriggerMesh can easily ingest, transform, filter, and route events from channels defined in an AsyncAPI definition. This is one of many possible ways to use the two technologies together. This post assumes you have basic knowledge of AsyncAPI already, but are potentially new to TriggerMesh.

If you want access to the source files for this tutorial, head to the [dedicated GitHub TriggerMesh repo](https://github.com/triggermesh/tutorials/tree/main/asyncAPI).

The scenario is based on the perspective of a DevOps engineer that has been provided with an AsyncAPI definition that describes an application (or set of applications) that produce `order` events over various channels, including a **Kafka topic**, a **Google pub/sub topic**, and an **HTTP service**.  The engineer's task is to ingest `orders` from these channels and route them to a single downstream **Kafka topic** called `unified-orders.`

The tutorial leverages the TriggerMesh open-source command-line interface called `tmctl` to create the TriggerMesh **sources**, **brokers**, **triggers**, and **targets** that make up the event flow. `tmctl` lets you run these components locally on any laptop that has Docker.

<Figure
  src="/img/posts/asyncapi-say-hi-to-triggermesh/triggermesh-concepts.webp"
  caption="The main components of TriggerMesh"
/>

The project includes a [prototype parser](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/parser.js) built with AsyncAPI's [js-parser](https://github.com/asyncapi/parser-js). It parses the [provided AsyncAPI definition](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/asyncapi.yaml) and generates `tmctl` CLI commands that create TriggerMesh event sources that ingest events from various channels into a TriggerMesh broker for further processing. You could write the `tmctl` commands manually too, but this parser shows how a well-documented AsyncAPI definition can be used alongside TriggerMesh.

The following schema illustrates what we'll build in this tutorial.

<Figure
  src="/img/posts/asyncapi-say-hi-to-triggermesh/full-schema.webp"
  caption="Schema shows the event flow we'll build during the tutorial"
/>

Please reach out to the TriggerMesh team on the [TriggerMesh Slack workspace](https://join.slack.com/t/triggermesh-community/shared_invite/zt-1kngevosm-MY7kqn9h6bT08hWh8PeltA) or [GitHub TriggerMesh](https://github.com/triggermesh/tutorials/issues/new) if you need help getting this to work or have any feedback.

## Prerequisites

### `tmctl`

Install `tmctl` with homebrew or [other methods](https://docs.triggermesh.io/get-started/quickstart/):

```sh
brew install triggermesh/cli/tmctl
```

### AsyncAPI's `js-parser`

We also need to install the AsyncAPI parser. Make sure you have a recent enough version of npm and node:

```sh
npm install @asyncapi/parser
```

### Quickstart a Kafka cluster

One of the order management systems is producing `orders` on a Kafka topic called `orders`. We also want to write all unified orders to a downstream `unified-orders` topic. We'll need a cluster to implement these topics.

Here we provide an easy way to start one using [Redpanda](https://redpanda.com/) and Docker Compose, but you could use any Kafka distribution you like (self-hosted or managed).

The provided [docker-compose file](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/docker-compose.yml) will start a single node Redpanda cluster and a handy console. It is configured to work with the docker desktop and could require some adjustments to the listeners and advertised listeners for it to work on other environments. Reach out to us on Slack or GitHub if you need help, or read this [kafka listeners blog post](https://www.confluent.io/blog/kafka-listeners-explained/) if you want to dive deep into this.

Run the following command in the same directory as the docker compose file to start Redpanda:

```sh
docker-compose up -d
```

### Start a mock HTTP service

We'll start a mock HTTP service locally to simulate the order management system that provides `orders` through an HTTP API. Copy the [order.json](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/order.json) file to the current directory, it will be used as a mock event. Run the mock HTTP server, ideally in a new terminal (requires python 2 or 3):

```sh
python3 -m http.server 8000
```

### (Optional) AsyncAPI CLI

You don't necessarily need it, but the [AsyncAPI CLI](https://github.com/asyncapi/cli) is a great companion for working with AsyncAPI definitions during development, particularly the Studio that you can easily run in your browser to view or edit the [provided AsyncAPI definition](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/asyncapi.yaml).

```sh
brew install asyncapi
asyncapi start studio &
```

## Overview of the AsyncAPI definition

### Servers

Let's see what is in our [AsyncAPI definition](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/asyncapi.yaml). We've defined three servers that represent the three order management systems. These definitions contain information we'll need to create the TriggerMesh source components that will read from these servers.

```yaml
servers:
  kafkaserver:
    url: host.docker.internal:9092
    protocol: kafka
  httpserver:
    url: http://host.docker.internal:8000
    protocol: http
  googlepubsub:
    url: https://cloud.google.com
    protocol: googlepubsub
```

### Channels

I've defined one channel per order management system, each with its own reference to the server and bindings for its specific protocol. There may be ways to improve on this by creating a single channel that has different implementations depending on the server.

```yaml
channels:
  orders:
    description: Kafka topic to which orders are produced
    servers:
      - kafkaserver
    subscribe:
      message:
        $ref: '#/components/messages/order'
  /orders/order.json:
    description: REST API endpoint that responds with an order
    servers:
      - httpserver
    subscribe:
      message:
        $ref: '#/components/messages/order'
      bindings:
        http:
          type: request
          method: GET
  orders-gcp:
    description: Google pub/sub topic to which orders are produced
    servers:
      - googlepubsub
    subscribe:
      message:
        $ref: '#/components/messages/order'
      bindings:
        googlepubsub:
          topic: projects/jmcx-asyncapi/topics/ordersgcp
```

There is nothing overly special about the `order` message and schema so we don't need to go into detail on it here (but you can see it at the end of the [AsyncAPI definition](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/asyncapi.yaml)).

We can see that by combining information from the servers and the channels, we have everything we need (except, in some cases, auth credentials) to create TriggerMesh source components that can subscribe to and read from these channels. Let's do that!

## Generating the TriggerMesh source components

Let's use [the parser](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/parser.js) to generate some TriggerMesh components that will consume events from the channels defined in the AsyncAPI definition.

Make sure you're in the same directory as the JS file and try running the following command:

```sh
node parser.js
```

It should print the generated `tmctl` commands to standard out, and will also write them to a file called [tmctl.sh](https://github.com/triggermesh/tutorials/blob/main/asyncAPI/tmctl.sh). It will overwrite the file on each run. It's contents should look something like this:

```sh
tmctl create broker TriggerMeshAsyncAPI
tmctl create source kafka --name orders-kafkasource --topic orders --bootstrapServers host.docker.internal:9092 --groupID orders-group
tmctl create source httppoller --name ordersorderjson-httppollersource --method GET --endpoint http://host.docker.internal:8000/order.json --interval 10s --eventType io.triggermesh.httppoller.event
tmctl create source googlecloudpubsub --name orders-gcp-pubsubsource --topic projects/jmcx-asyncapi/topics/ordersgcp --serviceAccountKey $(cat serviceaccountkey.json)
```

The first command creates a lightweight event broker, the central component that will decouple event producers and consumers, and provide pub/sub-style reliable delivery of events to their targets. The name of the broker is derived from the title of the AsyncAPI definition.

Next, one source component is created per `channel` that provides a `subscribe` operation and has a reference to a `server` with a supported protocol such as `http`, `kafka`, or `googlepubsub`.

To get this working on your environment, you may want to play with the `bootstrapServers` value for the Kafka source, and the endpoint `host` for the HTTP poller source. You can change them in the AsyncAPI definition and then re-run the parser.
You'll also need to create a file called `serviceaccountkey.json` with a GCP [service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys), if you want to get the Google Pub/Sub channel working. If not, you can delete the Pub/Sub channel in the asyncAPI definition.

You can visit the TriggerMesh documentation for the [Kafka source](https://docs.triggermesh.io/sources/kafka/), [HTTP Poller source](https://docs.triggermesh.io/sources/httppoller/), and [Google Pub/Sub source](https://docs.triggermesh.io/sources/googlecloudpubsub/) for more information on parameters and usage.

We can now execute these `tmctl` commands to create the TriggerMesh components. You can either copy/paste them into your terminal or run the generated script:

```sh
sh tmctl.sh
```
Or you can pipe the output of the parser into the shell:

```sh
node parser.js | sh
```

We'll also open a second terminal and start `tmctl watch` to watch events flowing through the broker:

```sh
tmctl watch
```

## Orders are already coming in from the HTTP service

The first thing you'll notice is that the HTTP poller is starting to produce events from the order management system that exposes the HTTP API, we can see the event showing up in the broker in the `tmctl watch` terminal:

<Figure
  src="/img/posts/asyncapi-say-hi-to-triggermesh/poller-event.webp"
  caption="A CloudEvent that originates from the HTTP poller"
/>

The poller is configured to fetch an event every 10 seconds. You can adjust the endpoint and other parameters depending on your environment and needs. I’m using `host.docker.internal` because I’m running on Docker Desktop.

## Ingest orders from Kafka

Now we can send an order to the `orders` topic and watch it land in the broker too. To do this, you can open the Redpanda console that was started in the docker compose and should be available at `http://localhost:8080/` by default.

Go to the orders topic and publish this:

```json
{
  "orderid": 18,
  "ordertime": 1497014222380,
  "region": "eu",
  "category": "fashion",
  "item": {
    "itemid": "184",
    "brand": "Patagonia",
    "category": "Kids",
    "name": "Tribbles Hoody"
	}
}
```

You should see it show up in the terminal that is running `tmctl watch`:

<Figure
  src="/img/posts/asyncapi-say-hi-to-triggermesh/watch-new-order.webp"
  caption="A new order from the Kafka channel shows up in TriggerMesh"
/>

## Pub/Sub

The same idea goes for the Google pub/sub topic. You can head to GCP and publish an event there and it'll also show up in the TriggerMesh broker:

<Figure
  src="/img/posts/asyncapi-say-hi-to-triggermesh/gcp-publish.webp"
  caption="Publishing an event to a Google Pub/Sub topic"
/>

## Routing all orders to a single Kafka topic

We just showed how simple it was to capture `order` events from three different AsyncAPI channels with TriggerMesh. Now they are all arriving in our central broker, wrapped as [CloudEvents](https://cloudevents.io/) so that they all have a uniform envelope that can be used to implement transformations and filters.

Let's keep it simple here and route events from all sources to a new Kafka topic called `unified-orders`. To do that, we'll start by creating a new Kafka target:

```sh
tmctl create target kafka --name unified-orders-target --topic unified-orders --bootstrapServers <serverURL>
```

And then we can define a "catch-all" trigger that will send all events to that target:

```sh
tmctl create trigger --target unified-orders-target
```

Although we generally recommend being more specific when creating triggers by adding a list of event types that should fire the Trigger. For example I could send only the events from the HTTP service to the Kafka topic as such:

```sh
tmctl create trigger --target unified-orders-target --eventTypes io.triggermesh.httppoller.event
```

Now take a look at the RedPanda console and you should see all orders arriving on the `unified-orders topic`. You can send more orders into GCP Pub/Sub and AWS SQS and see them get routed to the Kafka topic. 

## Wrap-up

In this post, we piped events from multiple AsyncAPI channels into a single Kafka topic. By pairing AsyncAPI with TriggerMesh, we can generate the TriggerMesh source components that will ingest and centralize the events into a broker. From there, we can start creating routes to deliver filtered sets of events to different targets. We did this with a Kafka target, but there are [many other targets available](https://docs.triggermesh.io/targets/).

If you wanted to take this example further, you could implement some [JSON transformations](https://docs.triggermesh.io/transformation/jsontransformation/) that would standardize legacy order formats coming from some of the sources or could customize the format for a specific consumer on a new Kafka topic (as shown in the initial diagram). You could also model other parts of the architecture with their own AsyncAPI definitions.

Oh and one more thing, try the `tmctl dump` command. It will produce Kubernetes manifests that you can deploy onto a Kubernetes cluster [with TriggerMesh installed](https://docs.triggermesh.io/installation/kubernetes-yaml/) and run these event flows as a Kubernetes-native application.

Head to [AsyncAPI.com](https://www.asyncapi.com/) to learn more about AsyncAPI, and the [TriggerMesh quickstart](https://docs.triggermesh.io/get-started/quickstart/) if you want to try out `tmctl` for yourself. You can also reach the [TriggerMesh community on Slack](https://join.slack.com/t/triggermesh-community/shared_invite/zt-1kngevosm-MY7kqn9h6bT08hWh8PeltA), we'd love to hear from you!


> _All graphics by [Jonathan Michaux](https://github.com/jmcx)._
