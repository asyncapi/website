## Build Newsroom Videos Script

### Summary

The `Build newsroom videos` script is a Node.js module that interacts with the YouTube Data API to fetch the latest videos from the AsyncAPI YouTube channel and writes them to a specified JSON file. The script uses the YouTube API v3 to search for completed videos from the AsyncAPI channel, sorting them by date and limiting the results to the 5 most recent videos. 
The script is designed to be run as a standalone process or included as a module in other scripts.

### Overview

- **Purpose**: Fetch recent videos from the AsyncAPI YouTube channel and save them to a JSON file for display in the newsroom section of the website.
- **Language**: TypeScript
- **Dependencies**:
  - `fs` for file operations
  - `googleapis` type definitions for YouTube API response types
  - `node-fetch-2` for making HTTP requests
  - `path` and `url` for file path manipulations
  - A custom logger utility for logging information

### Key Components

1. **Authentication**:
  - Requires `YOUTUBE_TOKEN` environment variable for API access.
  - YouTube Data API v3 key-based authentication.

2. **Fetching Videos**:
  - Uses the YouTube search endpoint to fetch videos.
  - Configured to get completed videos from the AsyncAPI channel (ID: UCIz9zGwDLbrYQcDKVXdOstQ).
  - Sorts by date and limits to 5 most recent videos.

3. **Data Processing**:
  - Validates the structure of the API response.
  - Extracts relevant video details including thumbnail URL, title, description, and video ID.
  - Formats the data as a JSON string.

4. **Error Handling**:
  - Validates the presence of the required environment variable.
  - Checks HTTP response status.
  - Validates data structure from the YouTube API.
  - Wraps all errors with descriptive messages.

5. **Output**:
  - Writes the processed video data to a specified JSON file.
  - Logs the fetched videos using a custom logger.
  - Returns the JSON string of video data.

### Development Setup

1. **Prerequisites**:
  - Node.js and npm installed
  - TypeScript installed globally or as a dev dependency
  - Access to a YouTube Data API project

2. **Create Credentials**:
  - Create a YouTube Data API key in the Google Cloud Console.
  - Follow the instructions in the [YouTube Data API documentation](https://developers.google.com/youtube/v3/getting-started) to create a project and obtain an API key.
  - Ensure the API key has access to the YouTube Data API v3.

3. **Environment Configuration**:
  - Create a `.env` file in the project root with the following variables:
  ```
    YOUTUBE_TOKEN='{your-youtube-api-key}'
  ```
  - Alternatively, set these variables in your shell environment.

4. **Installing Dependencies**:
  ```bash
    npm install
  ```
5. **Running the Script**:
  - Ensure the environment variables are set.
  - Execute the script using:
  ```bash
    tsx scripts/build-newsroom-videos.ts
  ```

### Usage

- **Environment Variables**:
  - `YOUTUBE_TOKEN`: YouTube Data API key for authentication.

- **Execution**:
  - When run directly, the script writes to `../config/newsroom_videos.json`.
  - It can be imported and used as a module with a custom write path.

### Example Command

To run the script manually, ensure the YOUTUBE_TOKEN environment variable is set and execute:

```bash
tsx scripts/build-newsroom-videos.ts
```

### Example Output

The output will be a JSON file containing the latest videos from the AsyncAPI YouTube channel, structured as follows:

```json
[
  {
    "thumbnail": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
    "title": "Video Title",
    "description": "Video Description",
    "videoId": "VIDEO_ID"
  },
  ...
]
```

### Notes

- Ensure that the YouTube Data API is enabled for the project associated with the provided API key.
- The script is designed to be run in a Node.js environment with TypeScript support.
- The output file path can be customized by passing a different path to the `writePath` parameter when importing the module.
