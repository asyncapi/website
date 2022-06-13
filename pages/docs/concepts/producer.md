<img width="1632" alt="producers concept" src="https://user-images.githubusercontent.com/53813901/173432679-31c8d066-a866-4d42-bc81-39b62e53fc0a.png">

## What is a Producer? 

An event indicates a state change or update which is triggered by a users action; this could be something like an item being placed in a shopping cart on an e-commerce website or clicking the subscribe button on a YouTube channel. A producer is a type of application that senses that state change then publishes that event as a message to the channel. Ideally what is being sent to the channel by the producer is a message called the event notification, and not the event itself. 

## Why do we need Producers? 

One of the core concepts of an event driven architecture is the publish/subscribe communication model. Producers are essentially publishers in this model, they are the first logical layer in an event driven architecture, and are responsible for publishing messages to the channel so that any consumer subscribed to that event can handle it. ## Where do Producers fit within the AsyncAPI EDA architecture?
