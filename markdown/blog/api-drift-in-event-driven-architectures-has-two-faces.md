---
title: API Drift in Event-Driven Architectures has Two Faces
date: 2026-05-12T09:00:00+02:00
type: Engineering
tags:
  - API-First
  - API-First Ops
  - AsyncAPI
  - Event-Driven Architecture
  - Kafka
  - Terraform
  - Spring Boot
  - Platform Engineering
  - API Governance
  - API Drift
  - ZenWave SDK
cover: /img/posts/zenwave/api-drift-two-faces-banner.png
authors:
  - name: Ivan Garcia Sainz-Aja
    photo: /img/avatars/ivangsa.webp
    link: https://ivangsa.com/about
    byline: Software Engineer. Speaker. Building ZenWave 360º
excerpt: 'In Event-Driven Architectures, API Drift happens in two places: implementation and platform. AsyncAPI and API-First Ops can keep both continuously aligned from a single contract.'
---

# API Drift in Event-Driven Architectures has Two Faces

In REST architectures, gateways usually mediate communication. They handle routing, authentication, observability, and rate limiting, but they rarely shape the behavior of the system itself.

Event-Driven Architectures are different.

In EDA, the broker shapes behavioral semantics. Kafka topics define scalability, ordering guarantees, replay capabilities, and retention behavior. Schema Registries define schema evolution, compatibility rules, and message contracts.

The broker and schema infrastructure become part of the behavioral model of the system itself.

This changes what API Drift means in Event-Driven Architectures.

API Drift in Event-Driven Architectures is a problem with two faces.

---

## Implementation Drift

This is the drift most teams already know:
- generated code diverges
- implementations evolve separately
- consumers rely on undocumented behavior
- contracts and services fall out of sync

API-First development practices solve this increasingly well.

Using AsyncAPI as the canonical representation, we can:
- generate code
- validate schemas
- continuously rebuild implementations from the contract

This is API-First Dev. The contract becomes the source of truth for implementation.

We can reduce implementation drift by generating read-only code on every build.

If generated code is not committed to source control, and implementations are continuously rebuilt
from the canonical API contract, specification and implementation stay synchronized by construction.

---

## Platform Drift

In Event-Driven Architectures, infrastructure itself also drifts.

Over time:
- topic configuration diverges
- retention policies evolve independently
- ACLs drift
- infrastructure and services make different assumptions

Eventually:
- the contract says one thing
- the platform runs another
- applications assume something else

This is platform drift.

And unlike implementation drift, most API-First approaches still ignore it.

But if the broker shapes system behavior, then infrastructure itself must become contract-driven.

This is where API-First Ops begins.

Using AsyncAPI as the operational source of truth, we can derive:
- Kafka topics
- Schema Registry subjects
- ACLs
- Terraform infrastructure
- governance validation

directly from the API contract itself.

One contract. Two faces of API Drift solved together.

---

## Tooling

These are not new ideas.

The implementation side has been running in production Java and Spring shops since 2020. It started
as a closed source internal tool inside a large organization and became open source in 2023. The
AsyncAPI Generator for Spring Boot and Spring Cloud Stream and Spring Kafka is the direct evolution of that work. It
is battle tested.

The operational side is newer. AsyncAPI to Terraform is recent, and the Kafka binding extensions it
depends on are still open proposals. But the principle is exactly the same:

derive infrastructure from the contract the same way we derive code.

If you want to explore either side:

- [ZenWave AsyncAPI Generator](https://www.zenwave360.io/zenwave-sdk/plugins/asyncapi-generator/) — implementation drift, Spring Boot, production-ready
- [ZenWave AsyncAPI Ops](https://www.zenwave360.io/zenwave-sdk/plugins/asyncapi-ops/) — platform drift, Terraform, early adopter territory

If you want to go deeper into either face:

- [Preventing API Drift with AsyncAPI: A Java/Spring Perspective](https://ivangsa.com/articles/2026-03-01-preventing-api-drift-with-asyncapi/)
- [API First Ops: Provisioning Kafka Infrastructure from AsyncAPI](https://www.zenwave360.io/posts/API-First-Ops-Provisioning-Kafka-from-AsyncAPI/)
- [API First 360: AsyncAPI as the Source of Truth for Code and Infrastructure](https://ivangsa.com/articles/api-first-360-asyncapi-code-and-infrastructure/)

And if you want to help shape the specification itself:

* [Kafka Binding Extension: env-server-overrides #292](https://github.com/asyncapi/bindings/issues/292)
* [Kafka Binding Extension: error-topics #299](https://github.com/asyncapi/bindings/issues/299)