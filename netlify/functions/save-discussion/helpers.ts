import { graphql } from '@octokit/graphql';

export function toTitleCase(title: string): string {
  return title
    .split(' ')
    .map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}

/**
 * The purpose of this function is to prepare the query for a graphql call.
 *
 * @param query the graphql query.
 * @returns {GraphQlResponse} the GitHub response object.
 */
export function fetchGraphql(query: string): Promise<any> {
  const parameters = {
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  };

  return graphql(query, parameters);
}
