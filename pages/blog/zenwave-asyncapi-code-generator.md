---
title: API-First with AsyncAPI and ZenWave SDK
date: 2023-08-10T06:00:00+01:00
type: Engineering
tags:
  - ZenWave SDK
  - Code Generator
  - Java
  - Spring Cloud Streams
cover: /img/posts/zenwave/ZenWave360-AsyncAPI-SpringCloudStreams.png
canonical: https://zenwave360.github.io/Event-Driven-Architectures/AsyncAPI-Code-Generator
authors:
  - name: Ivan Garcia Sainz-Aja
    photo: /img/avatars/ivangsa.webp
    link: https://www.linkedin.com/in/ivangarciasainzaja/
    byline: Software Architect at Sngular. Speaker. Building ZenWave 360º
excerpt: 'With ZenWave SDK plugins, you can generate strongly typed business interfaces, payload and header DTOs and several integration patterns like Transactional Outbox, DeadLetter Queue... from AsyncAPI definitions.'
---

## API-First with AsyncAPI and ZenWave SDK

With ZenWave's `spring-cloud-streams3` and `jsonschema2pojo` plugins, you can generate:
- Strongly typed **business interfaces**
- **Payload DTOs** and 
- **Header objects** from AsyncAPI definitions.

It uses Spring Cloud Streams as the default implementation, so it can connect to many different brokers via provided binders.

And because everything is hidden behind interfaces, we can encapsulate many Enterprise Integration Patterns:

- Transactional Outbox: with MongoDB ChangeStreams, Plain SQL, and Debezium SQL flavors
- Business DeadLetter Queues: allowing you to route different business Exceptions to different DeadLetter queues for non-retryable errors.
- Enterprise Envelope: when your organization uses a common Envelope for messages, you can still express your AsyncAPI definition in terms of your business payload.


See [AsyncAPI and Spring Cloud Streams 3 Configuration Options](https://zenwave360.github.io/zenwave-sdk/plugins/asyncapi-spring-cloud-streams3/#options) and [ZenWave Maven Plugin](/ZenWave-Code-Generator/Maven-Plugin) for more details.

```xml
<plugin>
    <groupId>io.github.zenwave360.zenwave-sdk</groupId>
    <artifactId>zenwave-sdk-maven-plugin</artifactId>
    <version>${zenwave.version}</version>
    <configuration>
        <inputSpec>classpath:/model/asyncapi.yml</inputSpec>
        <addCompileSourceRoot>true</addCompileSourceRoot>
        <addTestCompileSourceRoot>true</addTestCompileSourceRoot>
    </configuration>
    <executions>
        <!-- DTOs -->
        <execution>
            <id>generate-asyncapi-dtos</id>
            <phase>generate-sources</phase>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <generatorName>jsonschema2pojo</generatorName>
                <configOptions>
                    <modelPackage>io.zenwave360.example.core.domain.events</modelPackage>
                    <!--        <jsonschema2pojo.includeTypeInfo>true</jsonschema2pojo.includeTypeInfo>-->
                    <jsonschema2pojo.useLongIntegers>true</jsonschema2pojo.useLongIntegers>
                </configOptions>
            </configuration>
        </execution>
        <!-- Generate PROVIDER -->
        <execution>
            <id>generate-asyncapi</id>
            <phase>generate-sources</phase>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <generatorName>spring-cloud-streams3</generatorName>
                <configOptions>
                    <role>provider</role>
                    <style>imperative</style>
                    <transactionalOutbox>mongodb</transactionalOutbox>
                    <modelPackage>io.zenwave360.example.core.domain.events</modelPackage>
                    <producerApiPackage>io.zenwave360.example.core.outbound.events</producerApiPackage>
                    <consumerApiPackage>io.zenwave360.example.adapters.commands</consumerApiPackage>
                </configOptions>
            </configuration>
        </execution>
    </executions>

    <dependencies>
        <dependency>
            <groupId>io.github.zenwave360.zenwave-sdk.plugins</groupId>
            <artifactId>asyncapi-spring-cloud-streams3</artifactId>
            <version>${zenwave.version}</version>
        </dependency>
        <dependency>
            <groupId>io.github.zenwave360.zenwave-sdk.plugins</groupId>
            <artifactId>asyncapi-jsonschema2pojo</artifactId>
            <version>${zenwave.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

![ZenWave StreamCloudStreams AsyncAPI](/img/posts/zenwave/spring-cloud-streams3-generated.png)

### Provider vs Client

Because broker-based API definitions are inherently **symmetrical**, it's difficult to establish the roles of client/server. ZenWave generates code based on `provider` and `client` roles, where a `provider` "produces events" and "consumes commands". See [API-First with AsyncAPI](API-First-with-AsyncAPI) page for more details on "publish/subscribe", "producer/consumer," and "provider/client" roles.

> Write your AsyncAPI definitions from the `provider` perspective and then configure the code generator to generate either a `provider` or a `client`.

If you still find it confusing which is a provider and a client, use this rule: In a given messaging scenario, there can be only one provider of a message, while there can be multiple clients. If the provider is producing messages, use the `publish` section. If the provider is consuming messages, use the `subscribe` section.

### Spring Cloud Streams Producer: Using generated code to produce messages

On the producer side generates:

- Interface `ICustomerEventsProducer` to produce typed messages that uses your domain names: `onCustomerEvent`, `CustomerEventPayload`, and `CustomerEventPayloadHeaders`.
- Producer `@Component` `CustomerEventsProducer` to use Autowire in your services.

**To produce messages, all you need to do is @Autowire, the generated producer, as part of your code.**

Because it sits behind a business-oriented interface, this producer component can be implemented in different flavors and integration patterns like transactional outbox (for MongoDB and SQL), or enterprise envelop, depending on how you configure the Zenwave maven generator.

```java
// Autogenerated: you can @Autowire it in your code
public interface ICustomerEventsProducer {
    // headers object omitted for brevity
    /**
     * Customer Domain Events
     */
    boolean onCustomerEvent(CustomerEventPayload payload, CustomerEventPayloadHeaders headers);

}
```

```java
// Autogenerated: add it to your autoscan packages
@Component
public class CustomerEventsProducer implements ICustomerEventsProducer {
    
    // details omitted for brevity
    
    /**
     * Customer Domain Events
     */
    public boolean onCustomerEvent(CustomerEventPayload payload, CustomerEventPayloadHeaders headers) {
        // this is one of the many flavors, you shouldn't need to worry about the details
        log.debug("Sending message to topic: {}", onCustomerEventBindingName);
        Message message = MessageBuilder.createMessage(payload, new MessageHeaders(headers));
        return streamBridge.send(onCustomerEventBindingName, message);
    }
}
```

```java
// Autowire this producer in your code
@Autowired
ICustomerEventsProducer customerEventsProducer;

// and use it to produce messages
var message = new CustomerEventPayload()
        .withCustomerId("123")
        // [...] set some more data
        .withEventType(CustomerEventPayload.EventType.CREATED);
// notice how headers are also strongly typed
var headers = new ICustomerEventsProducer.CustomerEventPayloadHeaders()
        .entityId("123")
        .commonHeader("value")
        .set("undocumented-header", "value");

customerEventsProducer.onCustomerEvent(message, headers);
```


### Spring Cloud Streams Consumer: Using generated code to consume messages

On the consumer side generates:

- Functional Consumer `DoCustomerRequestConsumer`  for Spring Cloud Streams bindings.
- Business Interface `IDoCustomerRequestConsumerService` you need to implement in order to receive strongly typed messages.

This Functional Consumer can abstract away different integration patterns like Business Dead Letter Queue and others... depending on how you configure the Zenwave maven generator.

**To consume messages, you need to implement the generated business interface and register it as a Spring bean.**

```java
// Autogenerated: you need to implement and provide this business interface
public interface IOnCustomerEventConsumerService {
    /**
     * Customer Domain Events
     */
    default void onCustomerEvent(CustomerEventPayload payload, CustomerEventPayloadHeaders headers) {};
}
```

```java
// Autogenerated: add it to your autoscan packages and provide business interface implementation
@Component("on-customer-event")
public class OnCustomerEventConsumer implements Consumer<Message<CustomerEventPayload>> {

    // you need to implement this interface
    protected IOnCustomerEventConsumerService service;

    @Override
    public void accept(Message<CustomerEventPayload> message) {
        log.debug("Received message: {}", message);
        try {
            Object payload = message.getPayload();
            if (payload instanceof CustomerEventPayload) {
                var headers = new IOnCustomerEventConsumerService.CustomerEventPayloadHeaders();
                headers.putAll(message.getHeaders());
                service.onCustomerEvent((CustomerEventPayload) payload, headers);
                return;
            }
            log.error("Received message without any business handler: [payload: {}, message: {}]", payload.getClass().getName(), message);
        } catch (Exception e) {
            // error handling and dead-letter-queue routing omitted for brevity
        }
    }
}
```

```java
// Implement the business interface and add it to your context
@Component
class DoCustomerRequestConsumerService implements IDoCustomerRequestConsumerService {

    @Override
    public void doCustomerRequest(CustomerRequestPayload payload, CustomerRequestPayloadHeaders headers) {
        log.info("Received '{}' message with payload: {}", payload.getClass(), payload);
        // [...] do something with this message
    }
}
```

### Exception Handling with Business Dead Letter Queue

ZenWave SDK consumers can be configured to route exceptions to different error queues. This is useful to manage non-retryable business exceptions so the stream processing is not interrupted. If your code throws an exception not configured for error routing, it will be rethrown and follow the standard error handling mechanism for your particular Spring Cloud Stream binder.

```yaml
spring.cloud.stream.bindings:
    on-customer-event-in-0:
      destination: customer.events
      content-type: application/json
      # configuring error routing for this consumer
      dead-letter-queue-error-map: >
        {
          'javax.validation.ValidationException': 'on-customer-event-validation-error-out-0',
          'java.lang.Exception': 'on-customer-event-error-out-0'
        }
```

## Populating Headers at Runtime Automatically

ZenWave SDK provides `x-runtime-expression` for automatic header population at runtime. Values for this extension property are:

- `$message.payload#/<json pointer fragment>`: follows the same format as AsyncAPI [Correlation ID](https://www.asyncapi.com/docs/reference/specification/v2.5.0#correlationIdObject) object.
- `$tracingIdSupplier`: will use the tracing id `java.function.Supplier` configured in your Spring context.

```yaml
    CustomerEventMessage:
      name: CustomerEventMessage
      // [...] other properties omitted for brevity
      headers:
        type: object
        properties:
          kafka_messageKey:
            type: string
            description: This one will be populated automatically at runtime
            x-runtime-expression: $message.payload#/customer/id
          tracingId:
            type: string
            description: This one will be populated automatically at runtime
            x-runtime-expression: $tracingIdSupplier
```

```xml
<configOption>
    <tracingIdSupplierQualifier>myTracingIdSupplier</tracingIdSupplierQualifier><!-- default is "tracingIdSupplier" -->
    <runtimeHeadersProperty>x-custom-runtime-expression</runtimeHeadersProperty><!-- you can also override this extension property name -->
</configOption>
```

```java
    @Bean("myTracingIdSupplier")
    public Supplier tracingIdSupplier() {
        return () -> "test-tracing-id";
    }
```

### InMemory Producers as TestDoubles

Alongside the generated producer, ZenWave SDK also generates an _in-memory producer captor_ that can be used as a test double and a singletone manual context so you easily include them in your unit/integration tests.

```java
// generated class, you can use in your tests
public class ProducerInMemoryContext {

    public static final ProducerInMemoryContext INSTANCE = new ProducerInMemoryContext();


    private CustomerEventsProducerCaptor customerEventsProducerCaptor = new CustomerEventsProducerCaptor();

    public <T extends ICustomerEventsProducer> T customerEventsProducer() {
        return (T) customerEventsProducerCaptor;
    }
}
```

And you can use it in your tests to instantiate your service and perform assertions. You can find [a working example here](https://github.com/ivangsa/spring-boot-mongodb-elasticsearch-kafka-example/blob/e8fa9c89e5f3d72b90ac23749f636fc7640bdf39/src/test/java/io/zenwave360/example/core/implementation/CustomerUseCasesTest.java#L70).

```java
// example of how you can instantiate your service using the in-memory producer captor
public class InMemoryTestsManualContext extends InMemoryTestsConfig {

    // [...] other beans omitted for brevity
    
    public CustomerUseCasesImpl customerUseCases() {
        // instantiating a bean with in-memory dependencies
        return new CustomerUseCasesImpl(customerRepository(), ProducerInMemoryContext.INSTANCE.customerEventsProducer());
    }
}

// and using it in your tests to perform assertions
public class CustomerUseCasesTest {
    
    // this is the in-memory producer captor wired
    CustomerEventsProducerCaptor customerEventsProducer = ProducerInMemoryContext.INSTANCE.customerEventsProducer();

    @Test
    void testCustomerUseCase() {
        // [...] test your use case
        Assertions.assertEquals(3, customerEventsProducer.getCapturedMessages(customerEventsProducer.onCustomerEventBindingName).size());
    }
}
```

## Enterprise Integration Patterns

Because access to the underlying implementation is encapsulated behind the generated interfaces, it's possible to implement many Enterprise Integration Patterns (EIP) on top of them.

- Transactional Outbox: for MongoDB, plain JDBC, and Debezium SQL
- Business DeadLetterQueue
- Enterprise Envelop
- Automatic headers

Jump to (https://zenwave360.github.io/zenwave-sdk/plugins/asyncapi-spring-cloud-streams3/[ZenWave SDK Spring-Cloud-Streams plugin] for more details on how to configure this.

---
Originally published at [https://zenwave360.github.io](https://zenwave360.github.io/Event-Driven-Architectures/AsyncAPI-Code-Generator).
