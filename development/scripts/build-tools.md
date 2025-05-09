## Build Tools Script Documentation

### Overview

The `build-tools.ts` script is responsible for generating a consolidated tools data file by combining two data sources:

1. **Automated tools data** - Extracted from GitHub repositories
2. **Manual tools data** - Predefined in the project configuration

The script fetches, processes, and merges these data sources into a unified tools dataset and tags list.

### Workflow

1. Fetch tool data from GitHub repositories using the `getData()` function
2. Convert the raw GitHub data into a standardized tools format with `convertTools()`
3. Save the automated tools data to a JSON file
4. Load the manual tools configuration from a predefined JSON file
5. Combine both data sources using `combineTools()`, generating:
  - A complete tools dataset
  - A list of all available tags

### File Structure

The script generates the following files in the `config` directory:

- `tools-automated.json` - Tools data automatically extracted from GitHub
- `tools-manual.json` - (Read only) Manual tool configurations
- `tools.json` - The final combined tools data
- `all-tags.json` - All unique tags from the tools data

### Key Functions
- `getData()`: Fetches tool data from GitHub repositories
- `convertTools()`: Converts raw GitHub data into a standardized format
- `combineTools()`: Merges automated and manual tools data into a single dataset
- `writeFile()`: Writes the final tools data to JSON files

### Dependencies
- `fs` for file system operations
- `path` for path manipulations
- `dotenv` for environment variable management
- `axios` for HTTP requests

### Development Setup
1. **Prerequisites**:
   - Node.js and npm installed
   - TypeScript installed globally or as a dev dependency
   - Access to the project repository
   - GitHub API token for authentication

2. **Installing Dependencies**:
   ```bash
   npm install
   ```

3. **Create Credentials**:
  - Create a GitHub personal access token with the necessary scopes to access the repositories.
  - You can follow the instructions in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create a token.
  - Ensure the token has access to the repositories you want to fetch data from.

4. **Environment Configuration**
  - Create a `.env` file in the project root with the following variables:
    ```bash
    GITHUB_TOKEN='{your-github-token}'
    ```
  - Alternatively, set these variables in your shell environment.
  
5. **Running the Script**:
   - Ensure the environment variables are set.
   - Execute the script using:
     ```bash
     tsx scripts/build-tools.ts
     ```

### Environment Variables
- `GITHUB_TOKEN`: GitHub API token for authentication

### Usage
- The script is designed to be run directly:
  ```bash
  tsx scripts/build-tools.ts
  ```
- It can also be imported and used as a module in other scripts or applications.
- The script is intended to be run in a Node.js environment with TypeScript support.
- Ensure that the necessary environment variables are set for GitHub API access.

### Example Output
The output will be JSON files in the `config` directory, containing the combined tools data and all unique tags. The structure of the output files will be as follows:
 - `tools.json`: An array of tool objects, each containing details such as name, description, tags, and source.
 - `all-tags.json`: An array of unique tags extracted from the tools data.
 - `tools-automated.json`: An array of tool objects with details fetched from GitHub.

### Notes
- Ensure that the GitHub API token has the necessary permissions to access the repositories.
- The script is designed to be run in a Node.js environment with TypeScript support.
- The script may take some time to run, depending on the number of repositories and the amount of data being processed.
- The script is intended to be run periodically to keep the tools data up to date.
- The script may be extended in the future to include additional features or data sources.
