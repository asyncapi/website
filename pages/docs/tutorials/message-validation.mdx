---
title: Message validation in runtime
description: In this tutorial, you'll learn how to validate AsyncAPI messages (events).

weight: 130
---

## Introduction
In this tutorial, you'll learn how to validate messages (events) that are sent to your AsyncAPI application.

## Background context
Message validation can be performed at both the **producer** and **consumer** levels. Message validation requires the participation of the producer, consumer, and broker. We will learn how to validate messages at the consumer level by discarding invalid messages based on the parameters provided.

You will be using the [Eclipse Mosquitto](https://mosquitto.org/) broker. The MQTT protocol provides a lightweight method of messaging using a publish/subscribe model. You will also use an MQTT client that runs an MQTT library and connects to an MQTT broker over a network. Here producers and consumers are MQTT clients. The producer and consumer labels refer to whether the client is sending or receiving messages.

In the [previous tutorial, you generated an application](https://asyncapi.com/docs/tutorials/generate-code) that uses [Glee](https://github.com/asyncapi/glee) framework. Now you will be validating the messages that you will be sending to your application using a Mosquitto broker and an MQTT client.

<Remember>

If you did not follow the previous tutorial and do not have an application generated, then follow these instructions: 

    asyncapi new glee --name=tutorial --template tutorial`.
    cd tutorial && npm install

</Remember>

## Validate messages
In this step, you will send a message to your application using an MQTT broker and check the errors logged when you accidentally send an invalid message.

1. Start your generated application:

<CodeBlock language="bash">
{`npm run dev`}
</CodeBlock>

2. Send a message:

<CodeBlock language="bash">
  {`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": "3", "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

Go back to the previous terminal and check if your application logged the streetlight condition you just sent, with errors related to the invalid message. You should see something displayed in the terminal similar to the following:

<CodeBlock language="bash">
  {`lightMeasured was received from mosquitto:
{ id: 1, lumens: '3', sentAt: '2017-06-07T12:34:32.000Z' }
x You have received a malformed event or there has been error processing it. Please review the error below:
TYPE should be integer
 
  1 | {
  2 |   "id": 1,
> 3 |   "lumens": "3",
    |             ^^^ 👈🏽  type should be integer
  4 |   "sentAt": "2017-06-07T12:34:32.000Z"
  5 | }
 
ONEOF should match exactly one schema in oneOf
 
> 1 | {
    | ^
> 2 |   "id": 1,
    | ^^^^^^^^^^
> 3 |   "lumens": "3",
    | ^^^^^^^^^^
> 4 |   "sentAt": "2017-06-07T12:34:32.000Z"
    | ^^^^^^^^^^
> 5 | }
    | ^^ 👈🏽  oneOf should match exactly one schema in oneOf`}
</CodeBlock>

Here, you can see that the property `lumens` has type `integer`, but you are sending a message with type `string`:

<CodeBlock language="yaml" highlightedLines={[10,11]}>
  {`  message:
        name: lumensInfo
        payload:
          type: object
          properties:
            id:
              type: integer
              minimum: 0
              description: Id of the streetlight.
            lumens:
              type: integer
              minimum: 0
              description: Light intensity measured in lumens.`}
</CodeBlock>

3. Send a correct message to your application:

<CodeBlock language="bash">
  {`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

You can see that your generated application received a message in the terminal:

<CodeBlock language="bash">
  {`lightMeasured was received from mosquitto:
{ id: 1, lumens: 3, sentAt: '2017-06-07T12:34:32.000Z' }
Streetlight with id "1" updated its lighting information to 3 lumens at 2017-06-07T12:34:32.000Z.`}
</CodeBlock>

Such a terminal message indicates that your message is valid and the application received it correctly.

## Summary
In this tutorial, you learned how to connect your generated application to an MQTT broker, send messages through it, identify when an invalid message is sent to your application, and how to correct an invalid message. 

## Next steps
Now that you've completed this tutorial, enjoy our [AsyncAPI message validation guide](https://www.asyncapi.com/docs/guides/message-validation).

