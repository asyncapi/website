---
title: Code Examples
description: This style guide provides guidelines for writing, formatting, and styling code examples in AsyncAPI documentation. 
weight: 30
---


# Code Examples Guidelines
Following these guidelines ensures that all code examples are easy to understand, well-structured, and consistent.

## 1. General Guidelines 
The general guidelines to follow are clarity and brevity.

**Clarity:** Ensure that the code is easy to read and understand.

**Brevity:** Use only the code necessary to illustrate the concept being explained. Avoid irrelevant or redundant lines.

## 2. Code Comments
All code examples should include comments to explain each step or significant line of code. This helps readers understand what the code is doing without needing to interpret it on their own.

### Comment Guidelines:
1. **Explain Each Step:** Provide comments for all important lines or sections. Avoid overly verbose comments.
   
   Example (JavaScript):
   ```javascript
   // Import the AsyncAPI client library
   const client = require('asyncapi-client');
   
   // Connect to the specified server
   client.connect('ws://example.com', () => {
      console.log('Connected to server');
    });
    
    // Subscribe to a topic and log received messages
    client.subscribe('example-topic', (message) => {
        console.log('Received message:', message);
    });
    ```

2. **Use Inline Comments Where Appropriate:** For shorter lines of code, use inline comments to explain without breaking the flow of the code.
   
   Example:
   ```javascript
   const topic = 'example-topic'; // Topic to subscribe to
   ```

3. **Avoid Redundancy:** Do not restate what is obvious from the code.
   
   Bad Example:
   ```javascript
   // Assigns 'example-topic' to the variable
   const topic = 'example-topic';
   ```
   Good Example:
   ```javascript
   // Define the topic to be used for subscription
   const topic = 'example-topic';
   ```

## 3. Code Block Formatting

To ensure consistency and readability across all documentation:

1. **Code Block Syntax Highlighting:** Always use syntax highlighting for the relevant language. Specify the language explicitly when creating code blocks.
   
   Example (Markdown):
   ```
   ```javascript
   // JavaScript code example here
   ```

2. **Consistent Indentation:** Use 2 or 4 spaces for indentation (depending on the common convention for the language). Never mix tabs and spaces.

3. **Line Length:** Keep lines within 80-100 characters to avoid horizontal scrolling.

4. **Readable Naming Conventions:** Use descriptive variable and function names in examples (e.g., connectToServer instead of c2s).

5. Use [Prettier](https://prettier.io/) or its VSCode extension for consistent code formatting.


## 4. Color and Syntax Styling

To improve readability, apply appropriate colors and formatting to code examples in the documentation:

**Keyword Highlighting:** Use distinct colors for keywords, strings, comments, and variables.

**String Colors:** Display strings in a color that contrasts well with the background.

**Comment Styling:** Display comments in a lighter color or italic font to differentiate them from the code.

**Error Handling:** Use bold or red text for important error-related messages or examples.

Example (Color Formatting Guidelines):

- **Keywords (e.g., const, function, if):** Blue or bold text

- **Strings:** Green or orange

- **Comments:** Gray or italicized

## 5. Accessibility Considerations for UI Code

When writing code that creates user interfaces, ensure to follow accessibility best practices to make the UI inclusive and easily accessible for all users.

1. **Provide Alternative Text for Images:** When displaying images through code, include meaningful alt text to describe their purpose.
   
   Example (HTML):
   ```html
   <img src="status-icon.png" alt="Status: Connected">
   ```

2. **Use ARIA Attributes When Necessary:** If the UI element lacks native accessibility, add ARIA attributes to improve screen reader support.
   
   Example (Button with ARIA Label):
   
   ```html
   <button aria-label="Close modal">X</button>
   ```

3. **Ensure Keyboard Accessibility:** Any interactive UI elements should be navigable using the keyboard.
    
    Example (JavaScript to Focus an Element):
    
    ```javascript 
    document.getElementById('inputField').focus();
    ```

4. **Maintain Sufficient Color Contrast:** When defining styles, ensure adequate contrast between text and background to enhance readability.
    
    Example (CSS for High Contrast):
    
    ```css
    .error-message {
        color: #D8000C;
        background-color: #FFD2D2;
    }
    ```
  
## 6. Testing Code Examples

All code examples should be tested to ensure they are functional and accurate. Broken or incorrect code examples can confuse readers and damage trust in the documentation.

1. **Run All Examples:** Before publishing, verify that the examples run without errors.

2. **Version Consistency:** Ensure that examples are compatible with the documented AsyncAPI version.

## General Best Practices
- Write clean, concise, and reusable code.

- Follow naming conventions that improve clarity and maintainability.

- Use meaningful variable and function names.

- Run the examples to ensure they run without errors.