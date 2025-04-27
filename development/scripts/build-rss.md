## Build RSS Script

### Summary

The `Build RSS` script is a TypeScript module that generates RSS feeds for different types of blog posts on a website. The script reads blog post data from a configuration file, processes it according to the RSS 2.0 specification, and writes the resulting XML feed to the public directory. The script handles sorting posts by date, validating required fields, sanitizing HTML content, and including media attachments with appropriate MIME types.

### Overview

- **Purpose**: Generate RSS feed XML files for blog posts and other content types
- **Language**: TypeScript
- **Dependencies**: 
  - `fs/promises` for file operations
  - `jgexml/json2xml` for converting JSON to XML format
  - Custom type definitions for blog posts and RSS feed structures

### Key Components

1. **Data Retrieval**:
   - Imports post data from the configuration file using `getAllPosts()` function
   - Filters posts by type and ensures they have valid dates

2. **Content Processing**:
   - Sorts posts by featured status and publication date (newest first)
   - Sanitizes HTML entities in post excerpts using the `clean()` function
   - Validates that all posts have required fields (title, slug, excerpt, date)

3. **RSS Feed Generation**:
   - Constructs an RSS feed object with channel metadata
   - Creates RSS items for each post, including title, description, link, etc.
   - Handles media attachments with appropriate MIME types

4. **Output**:
   - Converts the RSS feed object to XML using the `json2xml` library
   - Writes the XML to a file in the public directory

5. **Error Handling**:
   - Validates post data and throws descriptive errors for missing fields
   - Wraps operations in try/catch blocks to handle exceptions

### Development Setup

1. **Prerequisites**:
   - Node.js and npm installed
   - TypeScript installed globally or as a dev dependency
   - Project with blog post data in the expected format

2. **Installing Dependencies**:
   ```bash
   npm install jgexml
   ```

3. **Type Definitions**:
   - Ensure the following type definitions are available in your project:
     - `Details` and `Result` from `@/types/scripts/build-posts-list`
     - `BlogPostTypes`, `RSS`, and `RSSItemType` from `@/types/scripts/build-rss`

4. **Data Structure**:
   - Ensure your `config/posts.json` file follows the expected format with post data organized by type

5. **Running the Script**:
   - Execute the script using:
     ```bash
     tsx scripts/build-rss.ts
     ```

### Usage

- **Function Parameters**:
  - `type`: The category of blog posts to include (e.g., 'blog', 'news')
  - `rssTitle`: The title for the RSS feed
  - `desc`: A description for the RSS feed
  - `outputPath`: The path where the RSS feed XML file will be saved

- **Example Implementation**:
  ```typescript
  import { rssFeed } from './scripts/build-rss';

  async function generateFeeds() {
    await rssFeed(
      'blog',
      'AsyncAPI Blog',
      'Latest posts from the AsyncAPI blog',
      'rss/blog.xml'
    );

    await rssFeed(
      'news',
      'AsyncAPI News',
      'Latest news and announcements from AsyncAPI',
      'rss/news.xml'
    );
  }

  generateFeeds();

- The base URL is currently hardcoded as `https://www.asyncapi.com` and should be updated if deployed to a different domain
- RSS items include tracking parameters (`?utm_source=rss`) for analytics purposes
- The script assumes the existence of a `public` directory where output files will be written
- Cover images are included as enclosures with appropriate MIME types based on the file extension
