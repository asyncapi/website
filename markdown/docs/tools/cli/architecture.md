---
title: 'CLI Architecture'
weight: 40
---

The AsyncAPI CLI uses oclif (Open CLI Framework) as its core framework, which enables developers to build powerful and scalable command-line applications.

**Structure of the AsyncAPI CLI**: The CLI is primarily divided into two components: commands and the core part.

1. **Command Component**: The commands include all the necessary functionalities that help developers interact with features like creating new AsyncAPI projects, validating AsyncAPI files, formatting AsyncAPI files, and more.  
2. **Core Component**: The core part of the CLI contains various utilities that facilitate the efficient creation of new commands.

---

### Detailed Explanation of Key Directories in the CLI

#### `src/commands/`
- **Purpose:** Implements the CLI commands available to the user.
- **Subdirectories:**
  - `config/`: Stores configuration-related files for commands.
  - `generate/`: Generates typed models or other artifacts like clients, applications, or documentation using AsyncAPI Generator templates.
    - **Files:**
      - `fromTemplate.ts`: Contains logic for generating files using templates.
      - `models.ts`: Defines the models used during generation.
  - `new/`: Create a new AsyncAPI project, specification files, or templates for clients and applications.
    - **Files:**
      - `file.ts`: Handles file creation logic.
      - `glee.ts`: Related to Glee, a tool for event-driven microservices.
      - `template.ts`: Manages templates for new projects.
  - `start/`: Implements starting functionalities like launching a local server or studio.
    - **Files:**
      - `studio.ts`: Integrates with the AsyncAPI Studio.

- **Standalone Files:**
  - `bundle.ts`: Bundles one or multiple AsyncAPI documents and their references together.
  - `convert.ts`: Converts AsyncAPI documents from older to newer versions or transforms OpenAPI/Postman-collection documents into AsyncAPI.
  - `diff.ts`: Compares two AsyncAPI documents.
  - `format.ts`: Converts AsyncAPI documents from any format to YAML, YML, or JSON.
  - `optimize.ts`: Optimizes AsyncAPI documents for performance.
  - `pretty.ts`: Beautifies the AsyncAPI spec file (indentation, styling) in place or outputs the formatted spec to a new file.
  - `validate.ts`: Validates AsyncAPI documents for correctness.

---

#### `src/core/`
- **Purpose:** Provides foundational components and utilities for the CLI.
- **Subdirectories:**
  - `errors/`: Centralized error definitions.
  - `flags/`: Defines CLI flags and their behavior.
  - `hooks/`: Event hooks used for customization.
  - `models/`: Core data models used across the application.
  - `utils/`: Utility functions for common operations.

- **Standalone Files:**
  - `base.ts`: Base class or logic for CLI commands.
  - `global.d.ts`: Global TypeScript definitions.
  - `globals.ts`: Stores global variables and configurations.
  - `parser.ts`: Parses AsyncAPI documents.

---

#### `test/`
- **Purpose:** Implements the test suite for the CLI.
- **Subdirectories:**
  - `fixtures/`: Contains mock data or files for testing.
  - `hooks/`: Tests related to hooks.
  - `integration/`: Integration tests to verify end-to-end functionality.
  - `system/`: System-level tests.
  - `unit/`: Unit tests for individual modules or functions.

---

### Use Cases

1. **Generate AsyncAPI Artifacts:**
   - Use the `generate` command to create client/server code, documentation, or other artifacts based on AsyncAPI templates.

2. **Create New Projects:**
   - The `new` command helps users scaffold new AsyncAPI projects with predefined templates.

3. **Validate AsyncAPI Documents:**
   - The `validate` command ensures AsyncAPI documents conform to the specification.

4. **Optimize and Format Documents:**
   - The `optimize` and `pretty` commands provide tools for improving document readability and performance.

5. **Compare Documents:**
   - The `diff` command enables comparison between two AsyncAPI documents to track changes.

6. **Integration with AsyncAPI Studio:**
   - The `start` command integrates with the AsyncAPI Studio for editing and visualizing documents.

7. **Convert Between Formats:**
   - The `convert` command supports converting AsyncAPI documents between formats like YAML and JSON.

---

This structure ensures the CLI is modular, scalable, and easy to maintain. Let me know if you need further clarification or additional details!