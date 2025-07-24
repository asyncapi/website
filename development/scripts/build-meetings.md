## Build meetings script

### Summary

The 'Build meetings' script is a Node.js module that interacts with the Google Calendar API to fetch upcoming meetings and writes the data to a specified file path. It uses the Google APIs client library to authenticate and access calendar events.
The script is designed to be run as a cron job, fetching events within a specified time range and logging the results. The script handles authentication, data fetching, and error management, ensuring that the data structure received from the API is valid before processing.

### Overview

- **Purpose**: Fetch upcoming meetings from Google Calendar and save them to a JSON file.
- **Language**: TypeScript
- **Dependencies**: 
  - `fs` for file operations
  - `googleapis` for interacting with Google Calendar
  - `path` and `url` for file path manipulations
  - A custom logger utility for logging information

### Key Components

1. **Authentication**:
   - Uses `google.auth.GoogleAuth` for OAuth2 authentication.
   - Requires `CALENDAR_SERVICE_ACCOUNT` environment variable for credentials.

2. **Fetching Events**:
   - Fetches events from the Google Calendar API using `calendar.events.list`.
   - Time range is set from 100 days before to 30 days after the current date.

3. **Data Processing**:
   - Validates the structure of the API response.
   - Extracts relevant event details such as title, calendar link, GitHub issue URL, banner, and date.

4. **Error Handling**:
   - Throws errors for authentication failures, invalid data structures, and missing event details.

5. **Output**:
   - Writes the processed event data to a specified JSON file.
   - Logs the fetched events using a custom logger.

### Development Setup

1. **Prerequisites**:
   - Node.js and npm installed
   - TypeScript installed globally or as a dev dependency
   - Access to a Google Calendar API project

2. **Create Credentials**:
   - Create a service account in the Google Cloud Console.
   - You can use this blog post for reference: [Integration with Google Calendar API using Service Account](https://medium.com/iceapple-tech-talks/integration-with-google-calendar-api-using-service-account-1471e6e102c8).

3. **Environment Configuration**:
   - Create a `.env` file in the project root with the following variables:
     ```
     CALENDAR_SERVICE_ACCOUNT='{your-service-account-key}'
     CALENDAR_ID=your-calendar-id
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
     tsx scripts/build-meetings.ts
     ```

### Usage

- **Environment Variables**:
  - `CALENDAR_SERVICE_ACCOUNT`: JSON string of service account credentials.
  - `CALENDAR_ID`: ID of the Google Calendar to fetch events from.

- **Execution**:
  - The script can be executed directly to fetch and write meeting data to `meetings.json` in the `config` directory.
  - It is designed to be run as a cron job at midnight.

### Command

To run the script manually, ensure the environment variables are set and execute:

```bash
tsx scripts/build-meetings.ts
```

### Output
The output will be a JSON file containing an array of upcoming meetings with details such as title, calendar link, GitHub issue URL, banner, and date. The file will be saved in the specified path (e.g., `../config/meetings.json`).

### Notes
- Ensure that the Google Calendar API is enabled for the project associated with the service account.
- The script is designed to be run in a Node.js environment with TypeScript support.
