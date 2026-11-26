---
title: 'Structured Output and Exit Codes'
weight: 50
---

# Structured Output and Exit Code Specification

This contract applies to the `@asyncapi/cli` monorepo from version 6.2.0 onward. The canonical numeric and symbolic registry is maintained in [CLI Exit Codes](./codes.md).

## Scope

This specification covers every command implemented under `src/apps/cli/commands`, including long-running and watch commands. It also covers failures raised by shared loaders, services, workspace packages, configuration, Studio installation, and oclif argument parsing.

The REST API already uses RFC 7807 problem responses. It is not changed by this proposal, but the symbolic codes below should eventually be shared with equivalent API problem `type` values.

Plugin-owned commands such as `autocomplete`, `help`, and `version` should use the same envelope if oclif permits their output to be intercepted. Until then, they are explicit compatibility exceptions.

## Activation

Commands inherit a global `--json` flag through oclif. In this mode:

- stdout contains structured output only.
- Human-readable progress, spinners, prompts, colors, analytics notices, and update notices are disabled.
- Unexpected dependency logs are redirected to stderr.
- Interactive input is disabled. Missing required input produces `CLI_INPUT_REQUIRED`.
- Paths in output are absolute, except URLs and context names.
- Unknown or inapplicable values are represented by `null`, not omitted inconsistently.
- A finite command writes exactly one JSON object followed by a newline.
- Watch and server commands write newline-delimited JSON (NDJSON): one envelope when ready, then one envelope per lifecycle event. Each line independently follows this specification.

Do not reuse `--output` for this feature. That flag already means a generated or transformed file in several commands.

## Envelope

Every structured response has exactly these top-level fields:

```json
{
  "status": "success",
  "message": "The AsyncAPI document is valid.",
  "data": {},
  "errors": []
}
```

### Field rules

| Field | Type | Rules |
|---|---|---|
| `status` | `"success" \| "warning" \| "error"` | `success` means the requested operation completed; `warning` means it completed with a non-fatal condition; `error` means it did not complete. |
| `message` | string | Short, stable summary intended for people. Automation must not parse it. |
| `data` | object or `null` | Command-specific result. Use `{}` when a successful command has no additional result and `null` when the operation failed before producing usable data. |
| `errors` | array | Empty for `success` and `warning`. One or more stable error objects for `error`. The first item is the primary error and determines the process exit code. |

An error object has exactly two required fields:

```json
{
  "code": "ASYNCAPI_DOCUMENT_INVALID",
  "message": "The document contains validation errors."
}
```

`code` is a stable uppercase identifier. `message` may include contextual details and may change between releases.

Warnings are successful results and therefore do not belong in `errors`. Commands with warnings put them in `data.warnings` as `{ "code", "message" }` objects and use `status: "warning"`.

### Base JSON Schema

Command-specific schemas narrow `data`; this base schema enforces the common envelope:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AsyncAPI CLI structured result",
  "type": "object",
  "additionalProperties": false,
  "required": ["status", "message", "data", "errors"],
  "properties": {
    "status": {
      "enum": ["success", "warning", "error"]
    },
    "message": {
      "type": "string"
    },
    "data": {
      "type": ["object", "null"]
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["code", "message"],
        "properties": {
          "code": {
            "type": "string",
            "pattern": "^[A-Z][A-Z0-9_]*$"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

### Status and process exit

| Status | Exit behavior |
|---|---|
| `success` | Exit `0`. |
| `warning` | Exit `0`. |
| `error` | Exit with the numeric code mapped from the first item in `errors`. |

An invalid document, detected breaking change, or existing destination can be an expected domain result, but it is still `status: "error"` when command policy says the process must fail. Flags such as `diff --no-error` can turn that result into `warning` with exit `0`.

## Common Data Types

### Source

```json
{
  "input": "./asyncapi.yaml",
  "kind": "file",
  "resolved": "/workspace/asyncapi.yaml"
}
```

`kind` is `file`, `url`, `context`, or `auto-detected`.

### Diagnostic

```json
{
  "code": "asyncapi-document-resolved",
  "message": "The document is valid.",
  "severity": "info",
  "path": ["channels", "userSignedUp"],
  "range": null
}
```

`severity` is `error`, `warning`, `info`, or `hint`. Parser numeric severities must not leak into the public output.

### Written file

```json
{
  "path": "/workspace/output.yaml",
  "format": "yaml",
  "overwritten": false
}
```

### Summary counts

```json
{
  "errors": 0,
  "warnings": 1,
  "info": 0,
  "hints": 0
}
```

## Command Data Contracts

Fields marked nullable are always present and use `null` when not applicable. Document content is returned as a parsed JSON value where practical, rather than as escaped YAML or JSON text. A command writing content to a file sets the corresponding inline content field to `null`.

| Command | `data` on success or warning |
|---|---|
| `bundle FILE...` | `{ sources: Source[], document: object|null, format: "json"|"yaml", output: WrittenFile|null, warnings: Error[] }` |
| `convert [SPEC-FILE]` | `{ source: Source, sourceFormat: "asyncapi"|"openapi", sourceVersion: string|null, targetFormat: "asyncapi", targetVersion: string, perspective: "client"|"server", document: object|null, output: WrittenFile|null, warnings: Error[] }` |
| `diff OLD NEW` | `{ old: Source, new: Source, type: "breaking"|"non-breaking"|"unclassified"|"all", format: "json"|"yaml"|"md", changes: object|array|null, counts: { breaking: number, nonBreaking: number, unclassified: number }, output: WrittenFile|null, warnings: Error[] }` |
| `format [SPEC-FILE]` | `{ source: Source, sourceFormat: "json"|"yaml", targetFormat: "json"|"yaml"|"yml", document: object|null, output: WrittenFile|null, warnings: Error[] }` |
| `optimize [SPEC-FILE]` | `{ source: Source, optimized: boolean, applied: string[], ignored: string[], report: Report[], document: object|null, output: WrittenFile|null, warnings: Error[] }` |
| `pretty SPEC-FILE` | `{ source: Source, format: "json"|"yaml", output: WrittenFile, warnings: Error[] }` |
| `validate [SPEC-FILE]` | `{ source: Source, valid: boolean, score: number|null, failSeverity: "error"|"warn"|"info"|"hint", diagnostics: Diagnostic[], summary: Summary, output: WrittenFile|null, warnings: Error[] }` |
| `generate client LANGUAGE [ASYNCAPI]` | `{ source: Source, language: string, template: string, outputDirectory: string, generatedFiles: string[], logs: string[], watching: boolean, warnings: Error[] }` |
| `generate fromTemplate [ASYNCAPI] [TEMPLATE]` | `{ source: Source, template: string, outputDirectory: string, generatedFiles: string[], logs: string[], watching: boolean, warnings: Error[] }` |
| `generate models LANGUAGE FILE` | `{ source: Source, language: string, outputDirectory: string|null, models: { name: string, content: string|null, path: string|null }[], diagnostics: Diagnostic[], warnings: Error[] }` |
| `new file` | `{ path: string, format: "json"|"yaml"|"yml", example: string|null, studioStarted: boolean, warnings: Error[] }` |
| `new template` | `{ path: string, name: string, template: string, createdFiles: string[], warnings: Error[] }` |
| `config analytics` | `{ enabled: boolean, changed: boolean, configPath: string, warnings: Error[] }` |
| `config auth add PATTERN TOKEN` | `{ pattern: string, authType: string, tokenSource: "literal"|"environment", headers: object, configPath: string, warnings: Error[] }` |
| `config versions` | `{ cli: { name: string, version: string }, node: string, platform: string, packages: { name: string, version: string }[], repository: string, warnings: Error[] }` |
| `studio install` | `{ path: string, installed: boolean, warnings: Error[] }` |
| `config context init [PATH]` | `{ path: string, created: boolean, warnings: Error[] }` |
| `config context add NAME PATH` | `{ name: string, path: string, current: boolean, contextFile: string, warnings: Error[] }` |
| `config context edit NAME PATH` | `{ name: string, previousPath: string|null, path: string, contextFile: string, warnings: Error[] }` |
| `config context remove NAME` | `{ name: string, path: string, wasCurrent: boolean, contextFile: string, warnings: Error[] }` |
| `config context list` | `{ contexts: { name: string, path: string, current: boolean }[], contextFile: string, warnings: Error[] }` |
| `config context use NAME` | `{ name: string, path: string, contextFile: string, warnings: Error[] }` |
| `config context current` | `{ context: { name: string, path: string }|null, contextFile: string, warnings: Error[] }` |
| `start api` | `{ mode: "development"|"production"|"test", host: string|null, port: number, url: string, pid: number, warnings: Error[] }` |
| `start studio [SPEC-FILE]` | `{ source: Source|null, host: string|null, port: number, url: string, pid: number, editable: true, warnings: Error[] }` |
| `start preview SPEC-FILE` | `{ source: Source, host: string|null, port: number, url: string, pid: number, editable: false, watchedFiles: string[], warnings: Error[] }` |
| Topic commands `config`, `config context`, `generate`, `new`, `start` | `{ topic: string, help: string, warnings: Error[] }` |

`autocomplete`, root help, and root version should use `{ command, shell, instructions }`, `{ topic, help }`, and `{ name, version }` respectively if plugin output interception is implemented.

### Watch and server events

The first NDJSON envelope reports readiness. Subsequent envelopes use `data.event`:

| Event | Additional data |
|---|---|
| `watch.started` | `{ watchedFiles: string[] }` |
| `file.added` | `{ path: string }` |
| `file.changed` | `{ path: string }` |
| `file.deleted` | `{ path: string }` |
| `command.completed` | The normal command-specific result fields. |
| `command.failed` | `data: null`, `status: "error"`, and populated `errors`. |
| `server.started` | `{ url: string, host: string|null, port: number, pid: number }` |
| `server.stopped` | `{ reason: "requested"|"signal"|"error" }` |

File changes that fail validation or regeneration emit an error envelope for that event but do not terminate watch mode unless recovery is impossible. The process exit code reflects the final terminating event.

## Exit Code Registry

Numeric exit codes classify the failure. Symbolic codes identify the exact condition. Multiple symbolic codes may intentionally map to one numeric exit code.

### General

| Exit | Symbolic code | Meaning |
|---:|---|---|
| 0 | None | Successful or warning result. |
| 1 | `INTERNAL_ERROR` | Unclassified failure retained only as a final fallback. |

### Validation: 10-19

| Exit | Symbolic codes | Conditions |
|---:|---|---|
| 10 | `ASYNCAPI_DOCUMENT_INVALID`, `DOCUMENT_PARSE_FAILED`, `DOCUMENT_SYNTAX_INVALID` | Invalid AsyncAPI document, unreadable syntax, or parser could not produce a document. |
| 11 | `SCHEMA_VALIDATION_FAILED`, `GOVERNANCE_VALIDATION_FAILED` | Schema or ruleset diagnostics meet `--fail-severity`. |
| 12 | `REFERENCE_RESOLUTION_FAILED`, `REMOTE_REFERENCE_INVALID` | Local or remote `$ref` cannot be resolved or parsed. |
| 13 | `DOCUMENT_FORMAT_UNSUPPORTED`, `DOCUMENT_ALREADY_IN_TARGET_FORMAT` | Input serialization is unsupported or no format conversion is possible. |
| 14 | `DOCUMENT_VERSION_UNSUPPORTED`, `CONVERSION_DOWNGRADE_UNSUPPORTED`, `DIFF_VERSION_MISMATCH` | Unsupported or incompatible AsyncAPI versions. |
| 15 | `DIAGNOSTICS_FORMAT_INVALID`, `DIAGNOSTICS_EXTENSION_MISMATCH` | Diagnostics formatter or destination extension is invalid. |
| 16 | `DIFF_OVERRIDE_INVALID` | Diff override content is not valid JSON or has an invalid shape. |
| 17 | `BREAKING_CHANGES_DETECTED` | Diff found breaking changes and `--no-error` was not used. |

Exit 10 is the requested general invalid-document code. Exit 11 is specifically validation-policy/schema failure, while exit 12 remains reference resolution even when the parser currently exposes it as an `invalid-ref` diagnostic.

### Generation: 20-29

| Exit | Symbolic codes | Conditions |
|---:|---|---|
| 20 | `TEMPLATE_NOT_FOUND` | Generator or project template cannot be located. |
| 21 | `GENERATION_FAILED`, `MODEL_GENERATION_FAILED`, `TEMPLATE_COPY_FAILED` | Generation process failed after inputs were accepted. |
| 22 | `GENERATION_LANGUAGE_UNSUPPORTED` | Requested client or model language is unsupported. |
| 23 | `TEMPLATE_DOCUMENT_VERSION_UNSUPPORTED` | Template is incompatible with the document version. |
| 24 | `GENERATOR_PARAMETER_INVALID`, `GENERATOR_HOOK_INVALID`, `GENERATOR_BASE_URL_MAPPING_INVALID` | Generator-specific option syntax is invalid. |
| 25 | `GENERATION_OUTPUT_UNSAFE` | Output would overwrite protected files or a dirty repository. |
| 26 | `GENERATOR_REGISTRY_INVALID` | Registry URL or registry response is invalid. Authentication and connectivity use network codes. |
| 27 | `GENERATED_REFERENCE_READ_FAILED` | A locally mapped generation reference cannot be read. |

### File operations: 30-39

| Exit | Symbolic codes | Conditions |
|---:|---|---|
| 30 | `FILE_NOT_FOUND`, `SPEC_FILE_NOT_FOUND`, `OVERRIDE_FILE_NOT_FOUND` | Required file does not exist. |
| 31 | `FILE_PERMISSION_DENIED` | Read, write, mkdir, or access failed with `EACCES` or `EPERM`. |
| 32 | `FILE_ALREADY_EXISTS`, `DIRECTORY_ALREADY_EXISTS`, `CONTEXT_ALREADY_EXISTS` | Destination exists and overwrite was not allowed. |
| 33 | `FILE_EXTENSION_UNSUPPORTED` | Input or output extension is unsupported. |
| 34 | `FILE_READ_FAILED` | Existing local file could not be read for a reason other than permission. |
| 35 | `FILE_WRITE_FAILED`, `DIRECTORY_CREATE_FAILED` | File write or directory creation failed for a reason other than permission/existence. |
| 36 | `FILE_SERIALIZATION_FAILED` | Result could not be serialized as JSON or YAML. |
| 37 | `TEMP_DIRECTORY_FAILED` | Temporary workspace creation or required cleanup failed. |

### Network: 40-49

| Exit | Symbolic codes | Conditions |
|---:|---|---|
| 40 | `CONNECTION_FAILED`, `URL_FETCH_FAILED`, `REGISTRY_UNREACHABLE` | DNS, connection, or generic fetch failure. |
| 41 | `NETWORK_TIMEOUT`, `REGISTRY_TIMEOUT` | Network operation timed out. |
| 42 | `PROXY_ERROR`, `PROXY_CONFIGURATION_INVALID` | Proxy connection or proxy option failure. |
| 43 | `HTTP_RESPONSE_ERROR` | Remote server returned an unusable non-success response. |
| 44 | `REMOTE_REFERENCE_FETCH_FAILED`, `GITHUB_DOWNLOAD_URL_MISSING` | Remote reference retrieval failed after connecting. |
| 45 | `REGISTRY_AUTH_REQUIRED`, `REGISTRY_AUTH_FAILED` | Registry authentication is missing or rejected. |
| 46 | `STUDIO_INSTALL_DOWNLOAD_FAILED` | Studio package installation failed because of network/package registry access. |

### CLI input and configuration: 50-59

| Exit | Symbolic codes | Conditions |
|---:|---|---|
| 50 | `CLI_ARGUMENT_REQUIRED`, `CLI_INPUT_REQUIRED` | Required argument or non-interactive input is missing. |
| 51 | `CLI_FLAG_INVALID`, `CLI_FLAG_VALUE_INVALID`, `CLI_INTEGER_INVALID` | Flag is unknown, malformed, out of range, or has an unsupported value. |
| 52 | `CLI_OPTIONS_CONFLICT` | Mutually exclusive options were supplied together. |
| 53 | `CONTEXT_FILE_NOT_FOUND`, `CONFIG_FILE_NOT_FOUND` | Required context/configuration store is absent. |
| 54 | `CONTEXT_FILE_INVALID`, `CONTEXT_FILE_EMPTY`, `CONFIG_FILE_INVALID` | Configuration cannot be parsed or has the wrong shape. |
| 55 | `CONTEXT_NOT_FOUND` | Named context is absent. |
| 56 | `CURRENT_CONTEXT_NOT_SET` | A current context is required but not selected. |
| 57 | `CONFIG_READ_FAILED` | Configuration read failed for a reason not represented above. |
| 58 | `CONFIG_WRITE_FAILED` | Configuration update failed for a reason not represented above. |
| 59 | `STUDIO_INSTALL_DECLINED` | Required Studio installation was declined or disabled in non-interactive mode. |

### Server and runtime: 60-69

| Exit | Symbolic codes | Conditions |
|---:|---|---|
| 60 | `SERVER_PORT_IN_USE` | Requested listening port is already in use. |
| 61 | `SERVER_START_FAILED` | API, Studio, or Preview server could not start. |
| 62 | `STUDIO_RUNTIME_UNAVAILABLE`, `STUDIO_NOT_INSTALLED` | Studio runtime is unavailable locally. |
| 63 | `PREVIEW_BUNDLE_FAILED` | Preview document or references could not be bundled. |
| 64 | `WATCH_SOURCE_REMOVED`, `WATCH_REGENERATION_FAILED` | Watched source disappeared or regeneration failed irrecoverably. |
| 65 | `WEBSOCKET_PROTOCOL_ERROR` | Required Studio/Preview WebSocket communication failed. |

### Internal and compatibility codes

| Exit | Symbolic codes | Conditions |
|---:|---|---|
| 90 | `DEPENDENCY_ERROR` | An external library failed without a more specific classification. |
| 91 | `INTERNAL_STATE_ERROR` | A supposedly successful service returned missing/inconsistent data. |
| 92 | `INTERNAL_CONFIGURATION_ERROR` | Application bootstrap or internal configuration failed. |
| 127 | `COMMAND_NOT_FOUND` | Preserve the conventional and current unknown-command exit. |
| 130 | `INTERRUPTED` | Process received SIGINT. This is not used for an in-app prompt cancellation. |

An interactive prompt cancelled by the user returns `status: "warning"`, exit `0`, and `data.warnings: [{ "code": "OPERATION_CANCELLED", "message": "Operation cancelled by the user." }]`.

## Command Error Coverage

This matrix lists the expected primary codes for each command. Shared CLI, file, network, configuration, and internal codes can also apply wherever the command uses those facilities.

| Command | Primary symbolic codes |
|---|---|
| `bundle` | `CLI_INPUT_REQUIRED`, `SPEC_FILE_NOT_FOUND`, `REFERENCE_RESOLUTION_FAILED`, `FILE_EXTENSION_UNSUPPORTED`, `FILE_WRITE_FAILED` |
| `convert` | `SPEC_FILE_NOT_FOUND`, `DOCUMENT_PARSE_FAILED`, `DOCUMENT_VERSION_UNSUPPORTED`, `CONVERSION_DOWNGRADE_UNSUPPORTED`, `FILE_WRITE_FAILED` |
| `diff` | `SPEC_FILE_NOT_FOUND`, `DOCUMENT_PARSE_FAILED`, `REFERENCE_RESOLUTION_FAILED`, `DIFF_VERSION_MISMATCH`, `OVERRIDE_FILE_NOT_FOUND`, `DIFF_OVERRIDE_INVALID`, `BREAKING_CHANGES_DETECTED`, `FILE_WRITE_FAILED` |
| `format` | `SPEC_FILE_NOT_FOUND`, `DOCUMENT_FORMAT_UNSUPPORTED`, `DOCUMENT_ALREADY_IN_TARGET_FORMAT`, `FILE_SERIALIZATION_FAILED`, `FILE_WRITE_FAILED` |
| `optimize` | `SPEC_FILE_NOT_FOUND`, `DOCUMENT_SYNTAX_INVALID`, `PROXY_ERROR`, `FILE_WRITE_FAILED` |
| `pretty` | `SPEC_FILE_NOT_FOUND`, `DOCUMENT_FORMAT_UNSUPPORTED`, `FILE_WRITE_FAILED` |
| `validate` | `SPEC_FILE_NOT_FOUND`, `ASYNCAPI_DOCUMENT_INVALID`, `SCHEMA_VALIDATION_FAILED`, `REFERENCE_RESOLUTION_FAILED`, `DIAGNOSTICS_FORMAT_INVALID`, `DIAGNOSTICS_EXTENSION_MISMATCH`, `FILE_WRITE_FAILED` |
| `generate client` | `GENERATION_LANGUAGE_UNSUPPORTED`, `TEMPLATE_NOT_FOUND`, `TEMPLATE_DOCUMENT_VERSION_UNSUPPORTED`, `GENERATION_FAILED`, `GENERATION_OUTPUT_UNSAFE` |
| `generate fromTemplate` | `TEMPLATE_NOT_FOUND`, `TEMPLATE_DOCUMENT_VERSION_UNSUPPORTED`, `GENERATOR_PARAMETER_INVALID`, `GENERATOR_HOOK_INVALID`, `GENERATOR_BASE_URL_MAPPING_INVALID`, `GENERATION_FAILED`, `GENERATION_OUTPUT_UNSAFE` |
| `generate models` | `GENERATION_LANGUAGE_UNSUPPORTED`, `ASYNCAPI_DOCUMENT_INVALID`, `MODEL_GENERATION_FAILED`, `FILE_WRITE_FAILED` |
| `new file` | `FILE_EXTENSION_UNSUPPORTED`, `FILE_ALREADY_EXISTS`, `FILE_PERMISSION_DENIED`, `TEMPLATE_NOT_FOUND`, `FILE_WRITE_FAILED` |
| `new template` | `TEMPLATE_NOT_FOUND`, `DIRECTORY_ALREADY_EXISTS`, `FILE_PERMISSION_DENIED`, `TEMPLATE_COPY_FAILED` |
| `config analytics` | `CONFIG_FILE_NOT_FOUND`, `CONFIG_FILE_INVALID`, `CONFIG_WRITE_FAILED` |
| `config auth add` | `CLI_ARGUMENT_REQUIRED`, `CLI_FLAG_VALUE_INVALID`, `CONFIG_FILE_INVALID`, `CONFIG_WRITE_FAILED` |
| `config context init` | `FILE_PERMISSION_DENIED`, `CONFIG_WRITE_FAILED` |
| `config context add` | `CONTEXT_FILE_NOT_FOUND`, `CONTEXT_FILE_INVALID`, `CONTEXT_ALREADY_EXISTS`, `CONFIG_WRITE_FAILED` |
| `config context edit` | `CONTEXT_FILE_NOT_FOUND`, `CONTEXT_FILE_INVALID`, `CONTEXT_NOT_FOUND`, `CONFIG_WRITE_FAILED` |
| `config context remove` | `CONTEXT_FILE_NOT_FOUND`, `CONTEXT_FILE_INVALID`, `CONTEXT_NOT_FOUND`, `CONFIG_WRITE_FAILED` |
| `config context list` | `CONTEXT_FILE_INVALID`, `CONFIG_READ_FAILED` |
| `config context use` | `CONTEXT_FILE_NOT_FOUND`, `CONTEXT_FILE_INVALID`, `CONTEXT_NOT_FOUND`, `CONFIG_WRITE_FAILED` |
| `config context current` | `CONTEXT_FILE_NOT_FOUND`, `CONTEXT_FILE_INVALID`, `CURRENT_CONTEXT_NOT_SET`, `CONTEXT_NOT_FOUND` |
| `start api` | `CLI_INTEGER_INVALID`, `SERVER_PORT_IN_USE`, `SERVER_START_FAILED` |
| `start studio` | `CLI_INPUT_REQUIRED`, `STUDIO_NOT_INSTALLED`, `STUDIO_INSTALL_DECLINED`, `STUDIO_INSTALL_DOWNLOAD_FAILED`, `SERVER_PORT_IN_USE`, `SERVER_START_FAILED`, `FILE_READ_FAILED`, `FILE_WRITE_FAILED` |
| `start preview` | `SPEC_FILE_NOT_FOUND`, `STUDIO_NOT_INSTALLED`, `STUDIO_INSTALL_DECLINED`, `STUDIO_INSTALL_DOWNLOAD_FAILED`, `PREVIEW_BUNDLE_FAILED`, `SERVER_PORT_IN_USE`, `SERVER_START_FAILED` |

Topic/help commands and `config versions` only use shared CLI/internal failures unless plugin loading or package metadata is unavailable.

## Examples

### Successful validation

```json
{
  "status": "success",
  "message": "The AsyncAPI document is valid.",
  "data": {
    "source": {
      "input": "asyncapi.yaml",
      "kind": "file",
      "resolved": "/workspace/asyncapi.yaml"
    },
    "valid": true,
    "score": 100,
    "failSeverity": "error",
    "diagnostics": [],
    "summary": { "errors": 0, "warnings": 0, "info": 0, "hints": 0 },
    "output": null,
    "warnings": []
  },
  "errors": []
}
```

### Invalid document

Process exit: `11`.

```json
{
  "status": "error",
  "message": "The AsyncAPI document failed validation.",
  "data": {
    "source": {
      "input": "asyncapi.yaml",
      "kind": "file",
      "resolved": "/workspace/asyncapi.yaml"
    },
    "valid": false,
    "score": 72,
    "failSeverity": "error",
    "diagnostics": [
      {
        "code": "asyncapi-info-contact",
        "message": "Info object must have contact object.",
        "severity": "error",
        "path": ["info"],
        "range": null
      }
    ],
    "summary": { "errors": 1, "warnings": 0, "info": 0, "hints": 0 },
    "output": null,
    "warnings": []
  },
  "errors": [
    {
      "code": "SCHEMA_VALIDATION_FAILED",
      "message": "One diagnostic met the configured failure severity."
    }
  ]
}
```

### Missing file

Process exit: `30`.

```json
{
  "status": "error",
  "message": "The AsyncAPI document could not be loaded.",
  "data": null,
  "errors": [
    {
      "code": "SPEC_FILE_NOT_FOUND",
      "message": "File /workspace/missing.yaml does not exist."
    }
  ]
}
```

### Breaking changes allowed

Process exit: `0` with `diff --no-error`.

```json
{
  "status": "warning",
  "message": "The diff completed and found breaking changes.",
  "data": {
    "old": { "input": "old.yaml", "kind": "file", "resolved": "/workspace/old.yaml" },
    "new": { "input": "new.yaml", "kind": "file", "resolved": "/workspace/new.yaml" },
    "type": "all",
    "format": "json",
    "changes": [],
    "counts": { "breaking": 1, "nonBreaking": 0, "unclassified": 0 },
    "output": null,
    "warnings": [
      {
        "code": "BREAKING_CHANGES_DETECTED",
        "message": "Breaking changes were detected but --no-error was used."
      }
    ]
  },
  "errors": []
}
```

## Implementation Requirements

The following rules are necessary for the contract to be reliable:

1. Use one central output adapter and one error-to-code mapper. Commands must not construct unrelated JSON envelopes or choose numeric exits independently.
2. Preserve native error causes long enough to distinguish `ENOENT`, `EACCES`, `EPERM`, `EEXIST`, timeout, proxy, DNS, and HTTP response failures.
3. Keep validation diagnostics in `data.diagnostics`. Do not duplicate every diagnostic in `errors`; add one primary classification error when validation fails command policy.
4. Make `--json` non-interactive and colorless. Prompts, spinners, metrics messages, generator logs, deprecation notices, and update checks cannot write to stdout.
5. Normalize every command termination through the common base command. Avoid direct `process.exit()`, `process.exitCode`, and command-local hard-coded exit values.
6. Validate flag relationships, including proxy host/port pairs, analytics option conflicts, ports and ranges, and required bundle input.
7. Test each numeric exit and symbolic code. Snapshot representative envelopes and assert stdout contains exactly one JSON value for finite commands.
8. Treat output schemas and symbolic codes as a public API. Add fields compatibly; remove or rename them only in a major release.

## Compatibility Notes

- Plugin-owned `autocomplete`, root help, and root version output is not wrapped yet. Unknown commands run with `--json` emit a `COMMAND_NOT_FOUND` envelope and exit `127` without prompting.
- Diff and Bundler adapters recognize the package codes agreed for their future workspace migrations. Until those packages expose typed errors, unknown internal failures use `DEPENDENCY_ERROR`.
- Server commands emit `server.started` readiness events. On SIGINT the CLI emits a `server.stopped` envelope with `INTERRUPTED` and exits `130`. Requested shutdown via `/close` still exits `0` without an event.
- `WEBSOCKET_PROTOCOL_ERROR` is registered but not emitted yet; malformed Studio WebSocket messages are logged and ignored because they are not fatal.
- Third-party code that writes directly to process streams cannot always be intercepted, although known command progress, prompts, and spinners are suppressed in JSON mode.
- `--diagnostics-format=json` structures diagnostics only; it is not a substitute for command-level `--json`.

## Confirmed Decisions

1. Structured output is enabled with the global `--json` flag.
2. Numeric exit codes apply in human and JSON modes.
3. Workspace package errors remain package-owned and are translated by the CLI.
4. Watch and server commands use NDJSON lifecycle envelopes.
5. Plugin-owned `autocomplete`, root help, and root version remain compatibility exceptions.
