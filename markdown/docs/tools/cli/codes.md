---
title: 'CLI Exit Codes'
weight: 51
---

# CLI Exit Codes

This is the canonical registry for AsyncAPI CLI symbolic and numeric exit codes. Numeric exits belong to the CLI; workspace libraries expose their own package-specific codes and never terminate the process.

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

## Workspace Package Mappings

Package codes are translated at the CLI boundary. These mappings are structural so they work before and after Diff and Bundler move into this monorepo.

| Package code | CLI code | Exit |
|---|---|---:|
| `OPTIMIZER_INPUT_INVALID` | `DOCUMENT_SYNTAX_INVALID` | 10 |
| `OPTIMIZER_DOCUMENT_PARSE_FAILED` | `DOCUMENT_PARSE_FAILED` | 10 |
| `OPTIMIZER_SERIALIZATION_FAILED` | `FILE_SERIALIZATION_FAILED` | 36 |
| `OPTIMIZER_REPORT_NOT_GENERATED` | `INTERNAL_STATE_ERROR` | 91 |
| `DIFF_VERSION_MISMATCH` | `DIFF_VERSION_MISMATCH` | 14 |
| `DIFF_OVERRIDE_INVALID` | `DIFF_OVERRIDE_INVALID` | 16 |
| `DIFF_COMPARISON_FAILED` | `DEPENDENCY_ERROR` | 90 |
| `BUNDLER_INPUT_INVALID` | `DOCUMENT_PARSE_FAILED` | 10 |
| `BUNDLER_DOCUMENT_PARSE_FAILED` | `DOCUMENT_PARSE_FAILED` | 10 |
| `BUNDLER_VERSION_MISMATCH` | `DOCUMENT_VERSION_UNSUPPORTED` | 14 |
| `BUNDLER_REFERENCE_RESOLUTION_FAILED` | `REFERENCE_RESOLUTION_FAILED` | 12 |
| `BUNDLER_FAILED` | `DEPENDENCY_ERROR` | 90 |


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
