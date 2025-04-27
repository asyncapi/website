## Build Pages Script

### Summary

The `Build pages` TypeScript script transforms markdown files into MDX files suitable for a React application. It recursively processes files from a source directory, applies several transformations to make the content compatible with JSX, and outputs the modified files to a target directory.

### Overview

- **Purpose**: Convert markdown content to MDX format for React applications
- **Language**: TypeScript
- **Input**: Markdown files in the `markdown` directory
- **Output**: MDX files in the `pages` directory

### Key Components

1. **Directory Management**:
  - Creates the target directory if it doesn't exist
  - Preserves directory structure from source to target

2. **Content Transformations**:
  - Converts HTML comments (`<!-- -->`) to JSX comments (`{/* */}`)
  - Capitalizes table-related HTML tags (`table`, `tr`, `td`, etc.) to React components
  - Preserves curly braces for JSX expressions
  - Renames `.md` files to `.mdx` extension

### Dependencies
- `fs` for file system operations
- `path` for path manipulations
- `tsx` for running TypeScript files directly

### Development Setup
1. **Prerequisites**:
  - Node.js and npm installed
  - TypeScript installed globally or as a dev dependency
  - Access to the project repository

2. **Installing Dependencies**:
   ```bash
   npm install
   ```
3. **Running the Script**:
    ```bash
    tsx scripts/build-pages.ts
    ```

### Functions

#### `ensureDirectoryExists(directory: PathLike)`
- Checks if a directory exists and creates it if it doesn't

#### `capitalizeJsxTags(content: string): string`
- Transforms HTML tags to capitalized JSX component tags
- Only capitalizes tags specified in the `capitalizeTags` array
- Returns the transformed content string

#### `copyAndRenameFiles(srcDir: string, targetDir: string)`
- Recursively processes all files and directories from source to target
- Applies transformations to file content before writing to target
- Converts markdown files to MDX by changing the extension

### Usage

The script is designed to be run directly:

```bash
tsx scripts/build-pages.ts
```

### Example Output
The output will be MDX files in the `pages` directory, with the same structure as the input markdown files. The content will be transformed to be compatible with React components, including capitalized tags and JSX comments.

### Notes
- Ensure that the `markdown` directory contains valid markdown files before running the script.
- The script uses Node.js and TypeScript, so ensure you have the necessary environment set up.
