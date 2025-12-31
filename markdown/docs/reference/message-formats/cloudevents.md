---
title: 'CloudEvents' 
weight: 20
---

CloudEvents is a specification for describing event data in common formats to provide interoperability across services, platforms and systems.[^1]

This document clarifies how CloudEvents can be specified in AsyncAPI.

[^1]: https://github.com/cloudevents/spec

## Usage

Depending on the protocol and the mode (binary/structured), the inclusion of the
CloudEvents fields varies.

## Structured Mode

In structured mode, the entire event, attributes, and data are encoded in the
message body. When using structured mode, the usage only varies depending on the
serialization format:

| Format | Example                                                                 | Include                                  |
| ------ | ----------------------------------------------------------------------- | ---------------------------------------- |
| JSON   | [Short Example](#json-example) [Full Example](https://github.com/cloudevents/spec/blob/main/cloudevents/working-drafts/asyncapi-examples/light-switch-events-structured-json.yaml) | [Reference](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/formats/cloudevents.json) |

### JSON Example

To add CloudEvents in structured mode, the following `allOf` reference needs to
be added:

```yaml
components:
  messages:
    messageKey:
      payload:
        type: object
        allOf:
        - $ref: 'https://raw.githubusercontent.com/cloudevents/spec/v1.0.2/cloudevents/formats/cloudevents.json'
```

See also: [Full Example](https://github.com/cloudevents/spec/blob/main/cloudevents/working-drafts/asyncapi-examples/light-switch-events-structured-json.yaml)

## Binary Mode

In binary mode, protocol-specific bindings are mapping fields to protocol
content-type metadata property or headers; therefore, the AsyncAPI format needs
to depend on the protocol:

| Protocol Binding                               | Example                                                              | Trait                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Kafka](https://github.com/asyncapi/bindings/tree/master/kafka) | [Short Example](#avro-example) [Full Example](https://github.com/cloudevents/spec/blob/main/cloudevents/working-drafts/asyncapi-examples/light-switch-events-binary-kafka.yaml) | [Trait](https://github.com/cloudevents/spec/blob/main/cloudevents/working-drafts/asyncapi-traits/cloudevents-headers-kafka-binary.yaml) |

### Avro Example

To add CloudEvents in binary mode, the following `traits` reference needs to
be added:

```yaml
components:
  messages:
    messageKey:
      traits:
      - $ref: 'https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/working-drafts/asyncapi-traits/cloudevents-headers-kafka-binary.yaml'
```

See also: [Full Example](https://github.com/cloudevents/spec/blob/main/cloudevents/working-drafts/asyncapi-examples/light-switch-events-binary-kafka.yaml)
