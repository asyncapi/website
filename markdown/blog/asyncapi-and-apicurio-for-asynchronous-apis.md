---
title: "AsyncAPI and Apicurio for Asynchronous APIs"
date: 2022-01-26T06:00:00+01:00
type: Engineering
tags:
  - Schemas
  - Schema-Registry
  - Kafka
  - Avro
  - Apicurio 
cover: /img/posts/asyncapi-and-apicurio-for-asynchronous-apis/apicurio_registry.webp 
authors:
  - name: Nadja Hagen
    photo: /img/avatars/nadjahagen.webp
    link: https://twitter.com/hg_nadja
    byline: Jr. Consultant at Novatec Consulting
---

> This post originally appeared on [https://novatec-gmbh.de](https://www.novatec-gmbh.de/en/blog/asyncapi-and-apicurio-for-asynchronous-apis/)

The [OpenAPI](https://www.openapis.org/) specification has already established itself in many project and application areas. It can be applied to describe HTTP APIs in a standardized way, understandable for humans and computers. While OpenAPI is mainly intended for synchronous interfaces, asynchronous communication places new demands on the interface definition.  
Asynchronous architectures can build on different types of protocols, e.g., Kafka, AMQP, or MQTT. Additionally, communication often includes a messaging broker, which maintains several topics or channels. Another difference is the communication style: OpenAPI only allows specifying one-to-one connection links. In contrast to that, asynchronous communication often involves multiple communication partners. Therefore, common patterns like publish/subscribe require a new approach to defining APIs.  
[AsyncAPI](https://www.asyncapi.com/) was developed as an extension of OpenAPI to meet these new requirements of asynchronous communication and interfaces. [This article](https://www.asyncapi.com/blog/openapi-vs-asyncapi-burning-questions) highlights the differences between OpenAPI and AsyncAPI in more detail.

As another aspect, large projects usually include multiple teams working and developing together. Therefore, standardized development of APIs is a central aspect of cross-team application development. At the same time, the API definitions need to be available and easy to access for all teams. These demands are also addressed by [Apicurio Registry](https://www.apicur.io/registry/). It supports registering different document formats, e.g., OpenAPI, AsyncAPI, GraphQL, Apache Avro, or Protobuf.

Since AsyncAPI is developing quite fast, we want to have a look at what the specification and corresponding tools currently cover. Additionally, we will shortly examine how Apicurio and AsyncAPI can work together at the moment. Nevertheless, there are many new tools and features for AsyncAPI on the roadmap. For this reason, this article can only be a snapshot. So stay tuned until the end of this post to get an outlook on what is next to come.

Elements of an AsyncAPI Document
================================

Coming to the basics of AsyncAPI: How does an AsyncAPI definition look? AsyncAPI allows using YAML or JSON for document definition. A document consists of the following elements:

<p align="center">
  <img src="/img/posts/asyncapi-and-apicurio-for-asynchronous-apis/asyncapi.webp" alt="Elements of an AsyncAPI document"/>
</p>

In practice, the definition can become quite long. Consider the below example from AsyncAPI’s GitHub to get an impression of how such a definition can look:

    asyncapi: '2.2.0'
    info:
      title: Streetlights Kafka API
      version: '1.0.0'
      description: |
        The Smartylighting Streetlights API allows you to remotely manage the city lights.
      license:
        name: Apache 2.0
        url: https://www.apache.org/licenses/LICENSE-2.0

    servers:
      test:
        url: test.mykafkacluster.org:8092
        protocol: kafka-secure
        description: Test broker
        security:
          - saslScram: []

    defaultContentType: application/json

    channels:
      smartylighting.streetlights.1.0.event.\{streetlightId\}.lighting.measured:
        description: The topic on which measured values may be produced and consumed.
        parameters:
          streetlightId:
            $ref: '#/components/parameters/streetlightId'
        publish:
          summary: Inform about environmental lighting conditions of a particular streetlight.
          operationId: receiveLightMeasurement
          message:
            $ref: '#/components/messages/lightMeasured'

    components:
      messages:
        lightMeasured:
          name: lightMeasured
          title: Light measured
          summary: Inform about environmental lighting conditions of a particular streetlight.
          contentType: application/json
          payload:
            $ref: "#/components/schemas/lightMeasuredPayload"

      schemas:
        lightMeasuredPayload:
          type: object
          properties:
            lumens:
              type: integer
              minimum: 0
              description: Light intensity measured in lumens.
            sentAt:
              $ref: "#/components/schemas/sentAt"
        sentAt:
          type: string
          format: date-time
          description: Date and time when the message was sent.

      securitySchemes:
        saslScram:
          type: scramSha256
          description: Provide your username and password for SASL/SCRAM authentication

      parameters:
        streetlightId:
          description: The ID of the streetlight.
          schema:
            type: string

If you want to look at it in a more readable way, you can copy and paste the definition to the [AsyncAPI Studio](https://studio.asyncapi.com/) or the [AsyncAPI playground](https://playground.asyncapi.io)(*Remark*: AsyncAPI Playground will soon be archived and replaced by AsyncAPI Studio). More examples are available on [GitHub](https://github.com/asyncapi/spec/tree/master/examples).

I do not want to dive too deep into the exact details of the specification because the [documentation](https://www.asyncapi.com/docs/specifications/v2.2.0) is already helpful enough for this. But I want to highlight some parts of the specification that could be the icing on the cake when considering it.

Besides some general information about the API, like the title and the description, the "Info" object can contain a ["Contact" object](https://www.asyncapi.com/docs/specifications/v2.2.0#contactObject). Especially when thinking about multiple groups working together, the responsible team and how to reach them can be linked at this place. In the example from above, this would look like this:

    asyncapi: '2.2.0'
    info:
      title: Streetlights Kafka API
      version: '1.0.0'
      description: |
        The Smartylighting Streetlights API allows you to remotely manage the city lights.
      contact:
        name: API Support
        url: https://www.asyncapi.org/support
        email: support@asyncapi.org
      license:
    ...

The fixed structure defined by the specification might not be sufficient for all use cases. Therefore, it is possible to link external documentation for nearly every object in the AsyncAPI definition. Additionally, user-defined properties can be set to [extend the specification](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions). This can be done by simply prepending an "x-" at the field name. For example, we could add the internal team or project name:

    ...
      contact:
        name: API Support
        url: https://www.asyncapi.org/support
        email: support@asyncapi.org
        x-project-name: Future-Light-X10
        x-team-name: Kafka Streetlights Team
    ...

For long and detailed API definitions, the document can become messy fast. As an improvement for this, it is possible to include references to internal and external resources (using the $ref field). They enable us to reuse objects, add schemas and add definitions from external sources.  
As another use case, let’s assume there are already event-driven applications using an Avro schema for their messages. For example, the schema is registered at Confluent Schema Registry or Apicurio Registry. Using $ref, it is possible to reference this Avro schema within a message object in the AsyncAPI definition:

    ...
    messages:
        lightMeasured:
          name: lightMeasured
          title: Light measured
          summary: Inform about environmental lighting conditions of a particular streetlight.
          contentType: avro/binary
          schemaFormat: application/vnd.apache.avro+json;version=1.9.0
          payload:
            $ref: 'http://schema-registry:8081/subjects/topic/versions/1/#LightMeasuredPayload'
    ...

AsyncAPI also offers an [Avro schema parser](https://github.com/asyncapi/avro-schema-parser) which collects local Avro references or remote files from Confluent Schema Registry and inserts them into the definition.

Kafka, AMQP, MQTT or HTTP: Protocol-Specific Properties
=======================================================

As already mentioned at the beginning of this post, asynchronous communication can involve different types of protocols. As this is a fundamental aspect of your API definitions, AsyncAPI supports adding protocol-specific properties.  
These protocol-specific properties can be necessary on different levels: server level, channel level, operation level, and message level. For these levels, AsyncAPI allows defining protocol-specific objects, so-called bindings. This [repository](https://github.com/asyncapi/bindings) provides a complete list of all bindings and their specification details.  
For example, it is possible to add a key for Kafka messages:

    ...
    channels:
      smartylighting.streetlights.1.0.event.\{streetlightId\}.lighting.measured:
        description: The topic on which measured values may be produced and consumed.
        parameters:
          streetlightId:
            $ref: '#/components/parameters/streetlightId'
        publish:
          summary: Inform about environmental lighting conditions of a particular streetlight.
          operationId: receiveLightMeasurement
          message:
            bindings:
              kafka:
                key:
                  type: string
                  enum: ['Germany', 'Austria', 'Switzerland']
                bindingVersion: '0.1.0'
            $ref: '#/components/messages/lightMeasured'
    ...

Unfortunately, for many protocols, there are a lot of binding objects which are not specified yet. E.g., for Kafka, there are no specifications for the Server and Channel Binding objects. In the case of Kafka, relevant but missing properties could be the number of partitions or the delivery guarantee. These properties would be a good use case for [specification extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions) that [currently cannot be used in binding objects](https://github.com/asyncapi/bindings/issues/83#issuecomment-925965378).  
In addition, some [conventions](https://github.com/asyncapi/bindings/pull/75) for the specification of bindings are on the roadmap. As protocol-specific bindings are still in the alpha version, this feature will become mature with continuous development.

AsyncAPI and Apicurio: A Match?
===============================

In contrast to the [Confluent Schema Registry](https://docs.confluent.io/platform/current/schema-registry/index.html), Apicurio is not limited to [message schemas but also supports API specifications](https://www.apicur.io/registry/docs/apicurio-registry/2.1.x/getting-started/assembly-intro-to-the-registry.html). Apicurio could therefore also replace the Confluent Schema Registry.  
However, this is probably only true if the architecture does not mainly base on a Confluent ecosystem. But depending on the use case, Apicurio can be a helpful addition to the Schema Registry due to the additionally supported formats.

Apicurio Registry allows registering AsyncAPI definitions, which can then be searched and browsed. At the moment, unfortunately, AsyncAPI documents are not rendered to make them more readable. External references (like in the example above) are currently not resolved automatically either. Orientation for this could be the [AsyncAPI playground](https://playground.asyncapi.io/), where this is already possible. However, Apicurio Studio already offers this functionality for OpenAPI, and support for AsyncAPI in Apicurio Studio [is already planned](https://github.com/Apicurio/apicurio-registry/issues/865).

At the same time, Apicurio also offers the [Data Models Library](https://github.com/Apicurio/apicurio-data-models), which allows reading, writing, and modifying AsyncAPI and OpenAPI documents. The [Dereferencer-class](https://github.com/Apicurio/apicurio-data-models/blob/master/src/main/java/io/apicurio/datamodels/openapi/visitors/dereference/Dereferencer.java) resolves external references to other documents and inserts them into the definition. It is also possible to add your implementations of the [IReferenceResolver](https://github.com/Apicurio/apicurio-data-models/blob/master/src/main/java/io/apicurio/datamodels/core/util/IReferenceResolver.java) interface for custom resolution of references.  
When testing the library, I noticed that it cannot resolve all references in a document yet: The AsyncAPI specification also allows references in the payload object of a message (as shown in the example above). The library only checks objects for links that also implement the [IReferenceNode](https://github.com/Apicurio/apicurio-data-models/blob/master/src/main/java/io/apicurio/datamodels/core/models/IReferenceNode.java) interface. However, the [payload object](https://github.com/Apicurio/apicurio-data-models/blob/master/src/main/java/io/apicurio/datamodels/asyncapi/models/AaiMessage.java) does not yet implement this interface, and therefore, references in this object remain unresolved.  
There already is a [GitHub issue](https://github.com/Apicurio/apicurio-data-models/issues/327) which will hopefully resolve this soon.

For Avro schemas, Apicurio Registry supports schema validation and a compatibility check. However, this seems to be still missing for AsyncAPI, even when the user interface suggests the opposite (see screenshot below). I tested this feature with syntactically invalid AsyncAPI definitions (which were classified as invalid by AsyncAPI playground), which were not recognized as wrong by Apicurio Registry. Also, definition updates, including breaking changes, were not recognized as so. Nevertheless, this [GitHub issue](https://github.com/Apicurio/apicurio-registry/issues/16) suggests that support is planned.

![Screenshot of the details overview for artifacts in Apicurio](/img/posts/asyncapi-and-apicurio-for-asynchronous-apis/apicurio_registry_details.webp)

The Data Models Library of Apicurio and Apicurio Registry gives a first idea of what can be done with AsyncAPI. Nevertheless, the functionalities and use cases are still limited. When I tested the Data Models Library, I hoped for more features that could be used at runtime. In fact, it is currently cumbersome to extract message schemas from the AsyncAPI definition. Therefore, I would not recommend the library for this use case.  
However, one possibility would be to use Confluent Schema Registry or Apicurio Registry for Avro schemas. Messages could be serialized and deserialized with the schemas from there. The AsyncAPI definition can then reference these schemas. In addition, Apicurio Registry can be used as an API catalog. Developers could then use this catalog to work on new services or to mock applications.

Besides these aspects, you should consider that Apicurio has little to no competition. At least I could not find another established open-source registry on the market that supports both schemas and APIs and so many formats. Feel free to leave a comment if you know more about this!

As an alternative, it is also possible to build your own AsyncAPI catalog to support missing features. E.g., you could use existing AsyncAPI libraries and modules like the [AsyncAPI React component](https://github.com/asyncapi/asyncapi-react) to render definitions. If you want to know how this could look, have a look at [this repository](https://github.com/NovatecConsulting/tc-asyncapi-directory#2-preview) where I implemented this myself. In this prototype, I used the React component with Angular. In case you feel more comfortable with other frameworks, it is also possible to integrate it in Vue or NextJS.

If you want to test how Apicurio works, check out this small [quick start guide](https://github.com/NovatecConsulting/tc-apicurio-quickstart). It starts an Apicurio container and deploys some AsyncAPI example files.

The Roadmap: What is Next to Come
=================================

If you take a closer look at the [GitHub repositories](https://github.com/asyncapi) of AsyncAPI, you will quickly notice that a lot is happening here right now. There are many exciting and promising ideas, and the community seems to grow steadily. For example, an [event gateway](https://github.com/asyncapi/event-gateway) is currently being developed that will make it possible to validate and modify messages even before they arrive at the broker. Another idea is the [Glee framework](https://github.com/asyncapi/glee), which ensures that AsyncAPI definition and code match. At first glance, an unexpected project is the [AsyncAPI Chatbot](https://github.com/asyncapi/chatbot). It helps to create an AsyncAPI document without having to know the specification yourself.

Besides these innovative ideas, there are also tools to enable validation and compatibility checks. The [CLI](https://github.com/asyncapi/cli) tool validates AsyncAPI files. Also, the [Diff](https://github.com/asyncapi/diff) tool points out breaking changes to ensure backward compatibility. A combination of these projects would be helpful, as it is already requested on [GitHub](https://github.com/asyncapi/cli/issues/58). These two tools could also be integrated into Apicurio Registry to add missing features.

The AsyncAPI website also lists tools [developed by the community](https://www.asyncapi.com/docs/community/tooling). Many of these and several tools by the core team mainly support JavaScript - so ideally, you should not have a problem with that. Nevertheless, it is to be hoped that other programming languages will be supported in the future. This would make it easier for the community to access them.  
Many other official projects of the AsyncAPI team are still in the alpha or beta phase. Therefore, most of them cannot yet be used to their full potential. But since companies like eBay and Slack already use AsyncAPI, we can expect a lot more to come.

If you want to dive a bit deeper, I recommend having a look at the recording of the AsyncAPI conference in November 2021. There were many interesting talks on how AsyncAPI can be used in projects and with other tools. For more details on how to use schemas, schema registries, and API registries with AsyncAPI, listen to my conference talk below.

<YouTube id="37X4Hbu0bSQ" />