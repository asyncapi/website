import { fetchGraphql } from './helpers';
import { Discussion, DiscussionCategory, Reply } from './index.d';

export namespace Repository {
  /**
   * Parse the discussion categories that a repository has.
   * @param {string} repoName - The name of the repository.
   * @param {string} repoOwner - Organization/User that owns the repo.
   * @return {Promise<DiscussionCategory[]>} An array containing all of the discussion categories that the repo has.
   */
  export async function getDiscussionCategories(
    repoOwner: string,
    repoName: string
  ): Promise<DiscussionCategory[]> {
    const query = `query { 
      repository(owner: "${repoOwner}", name: "${repoName}"){
        id
        discussionCategories(first: 10) {
          nodes {
            name
            id
          }
        }
      }
    }`;
    const { repository } = await fetchGraphql(query);
    return repository.discussionCategories.nodes;
  }

  export async function getRepositoryId(
    owner: string,
    name: string
  ): Promise<string> {
    const query = `query { 
      repository(owner: "${owner}", name: "${name}"){
        id
        discussionCategories(first: 10) {
          nodes {
            name
            id
          }
        }
      }
    }`;

    const { repository } = await fetchGraphql(query);
    return repository.id as string;
  }

  /**
   * Create a new discussion in this repository.
   * @param {Discussion} discussion - Discussion that has been parsed from the Slack API.
   * @param {string} repositoryId - ID of the repository that you want the discussion to be created in.
   * @param {string} categoryId - Discussion category Id.
   *
   */
  export async function createDiscussion(
    discussion: Discussion,
    repositoryId: string,
    categoryId: string,
    slackURL: string
  ) {
    const body = `${discussion.body}

---
_This discussion has been created from a [slack discussion](${slackURL}). Please [open an issue](https://github.com/asyncapi/website/issues) if something is wrong here :)_
    `;
    const query = `
      mutation {
        createDiscussion(
          input: {
            repositoryId: "${repositoryId}"
            title: "${discussion.title}"
            body: "${body}"
            categoryId: "${categoryId}"
          }
        ) {
          discussion {
            id
            url
          }
        }
      }
    `;
    const { createDiscussion } = await fetchGraphql(query);
    const discussionId = createDiscussion.discussion.id;
    const discussionURL = createDiscussion.discussion.url;
    return { discussionId, discussionURL };
  }

  export async function createDicussionReply(
    gitHubDiscussionId: string,
    reply: Reply
  ): Promise<string> {
    const query = `
      mutation {
        addDiscussionComment(
          input: {
            discussionId: "${gitHubDiscussionId}"
            body: "${reply.body}"
          }
          ) {
            comment {
              id
            }
          }
        }
    `;
    const { addDiscussionComment } = await fetchGraphql(query);
    return addDiscussionComment.comment.id;
  }

  /**
   * Mark a comment as answer in GitHub discussion.
   * @param {string} commentId - Id of the comment that you want to be marked as answer.
   */
  export async function markAnswer(commentId: string) {
    console.log('marking the answer...');
    fetchGraphql(
      `
      mutation {
        markDiscussionCommentAsAnswer(input: {id: "${commentId}" }) {
          discussion {
            id
          }
        }
      }
      `
    ).catch((err) => {
      // do nothing since the type of discussion does not accept answers.
    });
  }
}
