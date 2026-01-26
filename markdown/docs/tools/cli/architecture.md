---
title: 'CLI Architecture'
weight: 40
---

# CLI Architecture

## Overview

The AsyncAPI CLI is built with [oclif](https://oclif.io/) and provides both command-line operations and a REST API server for working with AsyncAPI specifications.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│  Entry Points                                   │
│  ┌──────────┐              ┌──────────┐         │
│  │   CLI    │              │   API    │         │
│  │  (oclif) │              │ (Express)│         │
│  └────┬─────┘              └────┬─────┘         │
└───────┼─────────────────────────┼───────────────┘
        └───────────┬─────────────┘
                    ▼
        ┌───────────────────────┐
        │   Domain Services     │
        │  Validation, Generator│
        │  Convert, Config      │
        └───────────┬───────────┘
                    ▼
        ┌───────────────────────┐
        │   Domain Models       │
        │  Specification,Context│
        └───────────┬───────────┘
                    ▼
        ┌───────────────────────┐
        │   Utilities           │
        │  Logger, Helpers      │
        └───────────────────────┘
```

---

## Directory Structure

```
src/
├── apps/
│   ├── cli/              # CLI commands & internals
│   └── api/              # REST API (Express)
├── domains/
│   ├── models/           # Specification, Context
│   └── services/         # Business logic
├── errors/               # Custom errors
├── interfaces/           # TypeScript types
└── utils/                # Utilities
```

---

## Core Components

### CLI Application

| Component | Description |
|-----------|-------------|
| **Entry Points** | `bin/run` (dev), `bin/run_bin` (prod) |
| **Base Command** | Metrics, parser integration, error handling |

**Commands:**
- **Core:** `validate`, `convert`, `format`, `optimize`, `diff`, `bundle`
- **Generation:** `generate client`, `generate models`, `generate fromTemplate`
- **Config:** `config context`, `config analytics`, `config versions`
- **Utility:** `new file`, `new template`, `start api|studio|preview`, `pretty`

### API Server

**Endpoints:** `/v1/validate`, `/v1/parse`, `/v1/generate`, `/v1/convert`, `/v1/bundle`, `/v1/diff`, `/v1/docs`, `/v1/help`, `/v1/version`

**Features:** Express with Helmet security, CORS, compression, RFC 7807 error responses

### Domain Services

All services extend `BaseService` and return `ServiceResult<T>`:

| Service | Purpose |
|---------|---------|
| `ValidationService` | Validates specs with Spectral, calculates scores |
| `GeneratorService` | Generates code/models |
| `ConvertService` | Converts between AsyncAPI/OpenAPI formats |
| `ConfigService` | Manages CLI config and contexts |
| `ArchiverService` | Creates ZIP archives |

### Domain Models

| Model | Purpose |
|-------|---------|
| **Specification** | Loads from file, URL, or context; auto-detects `asyncapi.json\|yml\|yaml` |
| **Context** | Manages multiple AsyncAPI contexts; stored in `~/.asyncapi/` |

### Error Classes

`ContextError`, `SpecificationFileError`, `ValidationError`, `GeneratorError`, `DiffError`

---

## Execution Flow

**CLI Command:**
```
User Command → oclif → Base Command → Domain Service → ServiceResult
```

**API Request:**
```
HTTP Request → Express → Controller → Domain Service → HTTP Response
```

---

## Extension Points

| Add | Steps |
|-----|-------|
| **New Command** | Create in `src/apps/cli/commands/`, extend `Command`, implement `run()` |
| **New API Endpoint** | Create controller in `src/apps/api/controllers/`, register in `index.ts` |
| **New Service** | Create in `src/domains/services/`, extend `BaseService`, return `ServiceResult<T>` |

---

## Configuration

| Config | Location |
|--------|----------|
| CLI Context | `~/.asyncapi/contexts.json`, `~/.asyncapi/.current` |
| Analytics | `~/.asyncapi-analytics` |

**Environment Variables:**
- `NODE_ENV` — `development` | `production` | `test`
- `PORT` — API server port (default: 3000)
- `ASYNCAPI_METRICS_*` — Metrics configuration

---

## Technology Stack

| Category | Technologies |
|----------|--------------|
| **Core** | oclif, TypeScript, Express |
| **AsyncAPI** | @asyncapi/parser, generator, converter, bundler, diff, optimizer |
| **Supporting** | winston, ajv, chalk, @clack/prompts |
