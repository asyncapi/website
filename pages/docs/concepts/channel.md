---
title: Channel
weight: 20
---

# What is a Channel


# Why do we need channels?

```mermaid
graph LR
    A[Producer] --> B(message)
    B --> C(Channel)
    C --> D[Consumer]
    C --> E[Consumer]
    C --> F[Consumer]
```
