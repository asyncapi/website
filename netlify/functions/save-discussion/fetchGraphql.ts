import { graphql } from '@octokit/graphql';
export default function fetchGraphql(query: string): Promise<any> {
  const parameters = {
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  };

  return graphql(query, parameters);
}
