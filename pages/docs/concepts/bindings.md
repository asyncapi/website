---
title: Bindings
weight: 35
---

## What is binding?
A binding is a way of connecting an event with a piece of code that should be executed in response to that event. When an event occurs, the binding ensures that the associated code is triggered and executed, allowing the system to respond to the event in an appropriate way. 

Bindings are typically used to handle user input, network events, and other kinds of asynchronous occurrences that require a system to take some action.

Here are a few examples of binding in an event-driven architecture:

1. Binding a button click event to a function that processes the user's input and updates the user interface
2. Binding a key press event to a function that allows the user to navigate through a form or menu

In each of these examples, the binding connects the event to the appropriate event handling function, allowing the system to respond to user actions or system events in a specific and predictable way.

## Why do we need a binding?
Without bindings, the system would not know how to respond to events, and the user experience would be unpredictable and potentially frustrating. By establishing bindings between events and event handling functions, the system can respond to user actions and system events in a consistent and expected manner.

<DocsButton
 suggestions={[
    {
      href:'/docs/concepts/message',
      type: 'back',  
      title: 'Message',
   },
   {
      href:'/docs/tutorials',
      type: 'next',  
      title: 'Tutorials - Overview',
   }
 ]}
/>