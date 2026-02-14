---
title: 'Debugging & Testing Guide'
weight: 60
---

# Debugging & Testing Guide

This guide provides step-by-step instructions for debugging and testing the AsyncAPI CLI. Whether you're fixing a bug, adding a new feature, or understanding existing code, this document will help you navigate the debugging process effectively.

## Table of Contents

- [Project Structure Overview](#project-structure-overview)
- [Setting Up Your Environment](#setting-up-your-environment)
- [Debugging CLI Commands](#debugging-cli-commands)
- [Debugging the API Server](#debugging-the-api-server)
- [Debugging Services](#debugging-services)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Common Issues & Solutions](#common-issues--solutions)
- [Debugging Tools & Tips](#debugging-tools--tips)

---

## Project Structure Overview

Understanding the codebase structure is essential for effective debugging:

```
src/
├── apps/
│   ├── api/           # REST API server (Express.js)
│   │   ├── controllers/   # API endpoint handlers
│   │   ├── middlewares/   # Request/response middleware
│   │   └── exceptions/    # API error types
│   └── cli/           # CLI application (oclif)
│       ├── commands/      # CLI command implementations
│       └── internal/      # Shared CLI utilities, flags, base classes
├── domains/
│   ├── models/        # Domain models (SpecificationFile, Context, etc.)
│   └── services/      # Business logic services
├── errors/            # Custom error classes
├── utils/             # Utility functions
└── interfaces/        # TypeScript interfaces

test/
├── fixtures/          # Test data files (AsyncAPI specs, etc.)
├── helpers/           # Test utilities
├── integration/       # Integration tests for CLI commands
└── unit/              # Unit tests for services and controllers
    ├── controllers/   # API controller tests
    ├── services/      # Service layer tests
    └── utils/         # Utility function tests
```

---

## Setting Up Your Environment

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Set Up Environment Variables for Debugging

Create a `.env` file or export variables:

```bash
# Enable development mode (verbose logging)
export NODE_ENV=development

# Disable analytics during testing
export TEST=1

# Set custom context file for testing
export CUSTOM_CONTEXT_FILENAME="test.asyncapi-cli"
export CUSTOM_CONTEXT_FILE_LOCATION=""
```

---

## Debugging CLI Commands

### Method 1: Using `bin/run` (Development Mode)

The `bin/run` script runs the CLI in development mode with TypeScript directly:

```bash
# Run any command with debugging
./bin/run validate ./path/to/asyncapi.yml

# With verbose output
DEBUG=* ./bin/run validate ./path/to/asyncapi.yml
```

### Method 2: Using Node.js Inspector

```bash
# Start with Node inspector
node --inspect-brk ./bin/run validate ./path/to/asyncapi.yml

# Then open Chrome DevTools at: chrome://inspect
```

### Method 3: VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug CLI Command",
      "program": "${workspaceFolder}/bin/run",
      "args": ["validate", "./test/fixtures/specification.yml"],
      "env": {
        "NODE_ENV": "development",
        "TEST": "1"
      },
      "sourceMaps": true,
      "outFiles": ["${workspaceFolder}/lib/**/*.js"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": [
        "--require", "ts-node/register",
        "--require", "tsconfig-paths/register",
        "--timeout", "100000",
        "${file}"
      ],
      "env": {
        "NODE_ENV": "development",
        "TEST": "1",
        "CUSTOM_CONTEXT_FILENAME": "test.asyncapi-cli"
      },
      "sourceMaps": true
    }
  ]
}
```

### Method 4: Adding Console Logs

For quick debugging, add logs in command files:

```typescript
// In src/apps/cli/commands/validate.ts
async run() {
  const { args, flags } = await this.parse(Validate);
  
  // Debug: Log parsed arguments
  console.log('DEBUG - Args:', JSON.stringify(args, null, 2));
  console.log('DEBUG - Flags:', JSON.stringify(flags, null, 2));
  
  // ... rest of the command
}
```

---

## Debugging the API Server

### Starting the API in Development Mode

```bash
# Start with hot-reload
npm run api:dev

# Or manually with debugging
NODE_ENV=development DEBUG=* node ./lib/apps/api/server.js
```

### Testing API Endpoints

```bash
# Validate endpoint
curl -X POST http://localhost:3000/v1/validate \
  -H "Content-Type: application/json" \
  -d '{"asyncapi": "asyncapi: 3.1.0\ninfo:\n  title: Test\n  version: 1.0.0\nchannels: {}"}'

# Parse endpoint
curl -X POST http://localhost:3000/v1/parse \
  -H "Content-Type: application/json" \
  -d '{"asyncapi": "..."}'
```

### Debugging API Controllers

Add middleware logging:

```typescript
// In src/apps/api/middlewares/logger.middleware.ts
// Logs are automatically enabled in development mode
```

---

## Debugging Services

### ValidationService

The `ValidationService` handles document validation. To debug:

```typescript
// Test the service directly
import { ValidationService } from '@services/validation.service';
import { load } from '@models/SpecificationFile';

async function debugValidation() {
  const service = new ValidationService();
  const specFile = await load('./path/to/spec.yml');
  
  const result = await service.validateDocument(specFile, {
    'fail-severity': 'error',
    'log-diagnostics': true,
  });
  
  console.log('Validation Result:', JSON.stringify(result, null, 2));
}
```

### ConversionService

```typescript
import { ConversionService } from '@services/convert.service';
import { load } from '@models/SpecificationFile';

async function debugConversion() {
  const service = new ConversionService();
  const specFile = await load('./path/to/spec.yml');
  
  const result = await service.convertDocument(specFile, {
    format: 'asyncapi',
    'target-version': '3.0.0',
    perspective: 'server',
  });
  
  console.log('Conversion Result:', JSON.stringify(result, null, 2));
}
```

### GeneratorService

```typescript
import { GeneratorService } from '@services/generator.service';

async function debugGenerator() {
  const service = new GeneratorService();
  // Add your debugging logic
}
```

---

## Writing Tests

### Test File Naming Convention

- Unit tests: `test/unit/<category>/<name>.test.ts`
- Integration tests: `test/integration/<command>.test.ts`

### Unit Test Structure

```typescript
// test/unit/services/my-service.test.ts
import { expect } from 'chai';
import { MyService } from '../../../src/domains/services/my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    service = new MyService();
  });

  describe('methodName', () => {
    it('should do something when given valid input', async () => {
      // Arrange
      const input = { /* test data */ };
      
      // Act
      const result = await service.methodName(input);
      
      // Assert
      expect(result.success).to.be.true;
      expect(result.data).to.exist;
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      const invalidInput = null;
      
      // Act
      const result = await service.methodName(invalidInput);
      
      // Assert
      expect(result.success).to.be.false;
      expect(result.error).to.include('error message');
    });
  });
});
```

### Integration Test Structure (CLI Commands)

```typescript
// test/integration/mycommand.test.ts
import { expect, test } from '@oclif/test';
import path from 'path';

const validSpec = path.resolve(__dirname, '../fixtures/specification.yml');
const invalidSpec = path.resolve(__dirname, '../fixtures/specification-invalid.yml');

describe('mycommand', () => {
  describe('with valid input', () => {
    test
      .stdout()
      .command(['mycommand', validSpec])
      .it('should succeed with valid specification', (ctx) => {
        expect(ctx.stdout).to.contain('Success');
      });
  });

  describe('with invalid input', () => {
    test
      .stderr()
      .command(['mycommand', invalidSpec])
      .exit(1)
      .it('should fail with invalid specification', (ctx) => {
        expect(ctx.stderr).to.contain('Error');
      });
  });

  describe('with flags', () => {
    test
      .stdout()
      .command(['mycommand', validSpec, '--output', 'result.json'])
      .it('should handle output flag', (ctx) => {
        expect(ctx.stdout).to.contain('saved');
      });
  });
});
```

### API Controller Test Structure

```typescript
// test/unit/controllers/my.controller.test.ts
import request from 'supertest';
import { App } from '../../../src/apps/api/app';
import { MyController } from '../../../src/apps/api/controllers/my.controller';

describe('MyController', () => {
  let app: App;

  beforeEach(async () => {
    app = new App([new MyController()]);
    await app.init();
  });

  describe('[POST] /v1/myendpoint', () => {
    it('should return 200 with valid input', async () => {
      return request(app.getServer())
        .post('/v1/myendpoint')
        .send({ data: 'valid' })
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.property('result');
        });
    });

    it('should return 422 with invalid input', async () => {
      return request(app.getServer())
        .post('/v1/myendpoint')
        .send({})
        .expect(422);
    });
  });
});
```

### Using Test Fixtures

```typescript
import path from 'path';
import { load } from '@models/SpecificationFile';

// Load test fixtures
const fixturesPath = path.resolve(__dirname, '../../fixtures');

async function loadTestSpec(filename: string) {
  return load(path.join(fixturesPath, filename));
}

// Usage in tests
describe('MyTest', () => {
  it('should handle v3 spec', async () => {
    const spec = await loadTestSpec('specification-v3.yml');
    // ... test logic
  });
});
```

---

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Only CLI Tests

```bash
npm run cli:test
```

### Run Only Unit Tests

```bash
npm run unit:test
```

### Run a Single Test File

```bash
npm run test:one -- test/integration/validate.test.ts
```

### Run Tests with Coverage

```bash
npm run cli:test
# Coverage report is generated in ./coverage/
```

### Run Tests in Watch Mode (Development)

```bash
# Using nodemon for file watching
npm run dev

# Then run tests manually when needed
npm run unit:test
```

---

## Common Issues & Solutions

### Issue 1: "Cannot find module '@utils/proxy'"

**Cause:** TypeScript path aliases not resolved.

**Solution:**
```bash
# Rebuild the project
npm run build
```

### Issue 2: Permission Denied Errors

**Cause:** Files created by root or different user.

**Solution:**
```bash
# Fix permissions
sudo chown -R $(whoami) ./lib ./node_modules ./.nyc_output
```

### Issue 3: Test Context File Conflicts

**Cause:** Tests using the same context file as development.

**Solution:**
```bash
# Set test-specific context file
export CUSTOM_CONTEXT_FILENAME="test.asyncapi-cli"
export CUSTOM_CONTEXT_FILE_LOCATION=""
```

### Issue 4: "ECONNREFUSED" in API Tests

**Cause:** API server not started or wrong port.

**Solution:**
```bash
# Ensure the app is initialized in tests
const app = new App([new MyController()]);
await app.init();  // Don't forget this!
```

### Issue 5: Async Test Timeouts

**Cause:** Default timeout too short for async operations.

**Solution:**
```typescript
// Increase timeout for specific tests
it('should handle slow operation', async function() {
  this.timeout(30000);  // 30 seconds
  // ... test logic
});
```

### Issue 6: ESLint Errors in Tests

**Cause:** Using testing patterns that trigger lint rules.

**Solution:**
```typescript
// Add eslint disable for specific patterns
/* eslint-disable @typescript-eslint/no-unused-expressions */
expect(result).to.be.true;  // Chai assertions
```

---

## Debugging Tools & Tips

### 1. Enable Verbose Logging

```bash
DEBUG=* ./bin/run validate spec.yml
```

### 2. Use Node.js Inspector

```bash
node --inspect-brk ./bin/run validate spec.yml
# Open chrome://inspect in Chrome
```

### 3. Print Stack Traces

```typescript
try {
  // risky operation
} catch (error) {
  console.error('Stack trace:', error.stack);
  throw error;
}
```

### 4. Use TypeScript Source Maps

Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### 5. Debug Parser Output

```typescript
import { Parser } from '@asyncapi/parser';

const parser = new Parser();
const { document, diagnostics } = await parser.parse(specContent);

console.log('Parsed document:', JSON.stringify(document?.json(), null, 2));
console.log('Diagnostics:', JSON.stringify(diagnostics, null, 2));
```

### 6. Inspect Service Results

All services return a `ServiceResult` type:
```typescript
interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Always check both success and data
if (result.success && result.data) {
  console.log('Success:', result.data);
} else {
  console.log('Error:', result.error);
}
```

### 7. Test Commands Interactively

```bash
# Build and run immediately
npm run build && ./bin/run validate ./test/fixtures/specification.yml
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Build project | `npm run build` |
| Run all tests | `npm test` |
| Run CLI tests | `npm run cli:test` |
| Run unit tests | `npm run unit:test` |
| Run single test | `npm run test:one -- <path>` |
| Lint code | `npm run lint` |
| Fix lint issues | `npm run lint:fix` |
| Start API dev server | `npm run api:dev` |
| Debug CLI command | `./bin/run <command> <args>` |
| Debug with inspector | `node --inspect-brk ./bin/run <command>` |

---

## Getting Help

If you're still stuck:

1. Check existing tests for similar functionality
2. Look at the error messages and stack traces
3. Search for similar issues in the [GitHub Issues](https://github.com/asyncapi/cli/issues)
4. Ask in the [AsyncAPI Slack](https://asyncapi.com/slack-invite) `#tooling` channel

