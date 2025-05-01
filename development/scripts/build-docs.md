## Documentation Navigation Build Script

### Overview

The `build-docs.ts` script is responsible for generating and managing the documentation navigation system. It creates a hierarchical tree structure from flat navigation items and adds navigation controls (previous/next buttons) to documentation pages for seamless user navigation.

### Key Functions
Following are the key functions of the `build-docs.tx` file:
1. **`buildNavTree()`**: Transforms flat navigation items into a hierarchical tree structure with:
    - Root sections
    - Subsections
    - Document pages
    - Proper ordering by weight

2. **`convertDocPosts()`**: Recursively flattens the navigation tree into a sequential array of all document posts.

3. **`addDocButtons()`**: Adds navigation controls (previous/next page) to each document page based on their position in the navigation sequence.

### Workflow
Following is the sequence of workflow of the `build-docs.tx` file:
1. Build a hierarchical navigation tree from flat items using `buildNavTree()`
    - Sort items by section type and weight
    - Create root sections, subsections, and document pages
    - Handle special cases like specification references

2. Convert the tree to a sequential array with `convertDocPosts()`
    - Recursively traverse the tree structure
    - Create a flat array of all document pages in navigation order

3. Add navigation controls with `addDocButtons()`
    - Add previous/next page links to each document
    - Handle special cases for root sections and section dividers

### Data Structures

The script works with several key data structures:

**`NavTree`:** 
Represents a hierarchical navigation structure where:
- Keys are section identifiers
- Values are `NavTreeItem` objects containing items and their children

**`NavTreeItem`:**
Contains a document item and its children (which can be either a recursive children object or an array of details).

**`Details`:**
Represents document metadata, including:
- `title`: Document title
- `weight`: Used for sorting
- `isRootSection`: Flag for top-level sections
- `isSection`: Flag for section headers
- `rootSectionId`: Identifier for the root section
- `sectionId`: Identifier for subsections
- `slug`: URL path to the document
- `parent`: Identifier for parent section

**`NavigationPage`:**
Simple structure containing navigation link information:
- `title`: Page title
- `href`: URL link

### Special Features
- Special handling for the welcome page at `/docs`
- Reference/specification section with automatic linking to latest specification version
- Weight-based sorting for proper ordering of sections and documents
- Root sections and subsections are marked differently than content pages
- Handles navigation between document sections with smart previous/next links
- Error handling with detailed error messages

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
    - No environment variables are required for this script.
    - Execute the script using:
      ```bash
      tsx scripts/build-docs.ts
      ```

### Output
The output will be a JSON file containing the hierarchical navigation structure and an array of document pages with their respective navigation controls. The file will be saved in the specified path (e.g., `../config/posts.json`).

### Environment Variables

No environment variables are required for this script.

### Usage Context

This script is part of a documentation website generation pipeline. It's designed to:

1. Parse raw documentation items
2. Create an organized navigation structure
3. Add user-friendly navigation controls
4. Support hierarchical documentation with sections and subsections
