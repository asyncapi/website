const { writeFileSync } = require("fs");
const { resolve } = require("path");
const { graphql } = require("@octokit/graphql");
require("dotenv").config({
  path: resolve(process.cwd(), ".env.local"),
});

async function start() {
  try {
    const eventIssues = await graphql(
      `
        query eventIssues($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            issues(labels: ["meeting"], states: [OPEN], first: 10) {
              nodes {
                title
                url
              }
            }
          }
        }
      `,
      {
        owner: "asyncapi",
        repo: "community",
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const result = eventIssues.repository.issues.nodes.map((meeting) => {
      const [title, dateAndTime] = meeting.title.split(",");
      const dateAndTimeArray = dateAndTime.split(" ");
      return {
        title,
        url: meeting.url,
        date: new Date(
          `${dateAndTimeArray[4]} ${dateAndTimeArray[5]}, ${
            dateAndTimeArray[6]
          } ${dateAndTimeArray[1].slice(0, 1)}:00 ${dateAndTimeArray[1].slice(
            1,
            3
          )} ${dateAndTimeArray[2]}`
        ),
      };
    });
    console.log(result);
    writeFileSync(
      resolve(__dirname, "..", "meetings.json"),
      JSON.stringify(result, null, "  ")
    );
  } catch (e) {
    console.error(e);
    writeFileSync(resolve(__dirname, "..", "meetings.json"), "{}");
  }
}

start();
