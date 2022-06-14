## What is a Producer? 

An event indicates a state change or update which is triggered by a user's/device's action; this could be something like an item being placed in a shopping cart on an e-commerce website or clicking the subscribe button on a YouTube channel or a temperature change in the sensor. A producer is a type of application that senses that state change and then publishes that event as a message.

## Why do we need Producers? 

One of the core concepts of an event driven architecture is the publish/subscribe communication model. Producers are essentially publishers in this model, they are the first logical layer in an event driven architecture, and are responsible for publishing messages to the channel so that any consumer subscribed to that event can handle it. ## Where do Producers fit within the AsyncAPI EDA architecture?