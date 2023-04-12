import { WebClient } from '@slack/web-api';
import axios from 'axios';
import { graphql } from '@octokit/graphql';

// Constants
const REQUEST_TYPE = {
  MESSAGE_ACTION: 'message_action',
  DIALOG_SUBMISSION: 'dialog_submission',
};
const REPO_OWNER = process.env.DISCUSSION_TARGET_REPO_OWNER;
const REPO_NAME = process.env.DISCUSSION_TARGET_REPO_NAME;

// Repository Object
const Repository = {
  /**
   * Parse the discussion categories that a repository has.
   * @param {string} repoName - The name of the repository.
   * @param {string} repoOwner - Organization/User that owns the repo.
   * @return {Promise<DiscussionCategory[]>} An array containing all of the discussion categories that the repo has.
   */
  async getDiscussionCategories(repoOwner, repoName) {
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
  },

  async getRepositoryId(owner, name) {
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
    return repository.id;
  },

  /**
   * Create a new discussion in this repository.
   * @param {Discussion} discussion - Discussion that has been parsed from the Slack API.
   * @param {string} repositoryId - ID of the repository that you want the discussion to be created in.
   * @param {string} categoryId - Discussion category Id.
   *
   */
  async createDiscussion(discussion, repositoryId, categoryId, slackURL) {
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
  },

  async createDicussionReply(gitHubDiscussionId, reply) {
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
  },

  /**
   * Mark a comment as answer in GitHub discussion.
   * @param {string} commentId - Id of the comment that you want to be marked as answer.
   */
  async markAnswer(commentId) {
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
  },
};

// Slack Object
const Slack = {
  slackClient: new WebClient(process.env.SLACK_TOKEN),
  CHECK_MARK_REACTION: 'white_check_mark',
  AVATAR_URL: 'https://avatars.githubusercontent.com/u/61865014',

  /**
   * Opens a dialog in Slack asking for a title and a category.
   * @param state You can supply a string and get it back when the dialog is submitted.
   * @param discussionCategories A list of GitHub discussions that a repository has.
   * @param triggerId trigger_id of your action. you can parse it from the payload of any Slack action.
   */
  async openSaveDialog(state, discussionCategories, triggerId) {
    this.slackClient.dialog
      .open({
        dialog: {
          callback_id: 'ryde-46e2b0',
          title: 'Save to GitHub',
          submit_label: 'Save',
          notify_on_cancel: false,
          state: state, // The state of the dialog is used to preserve the discussion details between calls.
          elements: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'select',
              options: discussionCategories.map((category) => ({
                label: category.name,
                value: category.id,
              })),
              label: 'Category',
              name: 'category',
            },
          ],
        },
        trigger_id: triggerId,
      })
      .catch(console.error);
  },

  /**
   * Shows a message in the slack channel that is only visible to the user that triggered the action.
   * @param responseUrl response_url of the action that triggers the endpoint.
   * @param message The message that you want to post.
   */
  async sendResponse(responseUrl, message) {
    try {
      await axios.post(responseUrl, {
        text: message,
      });
    } catch (err) {
      err.message = `Unable to send a response to: ${responseUrl}`;
      console.error(err);
    }
  },

  async getSlackDiscussion(channelId, threadTS) {
    const { messages } = await this.slackClient.conversations.replies({
      channel: channelId,
      ts: threadTS,
    });
    if (!messages) {
      console.error(
        `Message with thread_ts: ${threadTS} doesn't exist in ${channelId} channel.`
      );
      return;
    }

    const body = messages[0].text;
    const replies = this.parseReplies(messages.slice(1));
    const { permalink } = await this.slackClient.chat.getPermalink({
      channel: channelId,
      message_ts: threadTS,
    });
    return { body, replies, slackURL: permalink };
  },

  parseReplies(messages) {
    return messages.map((message) => ({
      body: message.text,
      isAnswer: this.isAnswer(message),
    }));
  },

  /**
   *
   * @param message the message object that has been received from Slack.
   * @returns Whether the message has the :white_check_mark: reaction.
   */
  isAnswer(message) {
    if (message.reactions) {
      return (
        message.reactions.filter(
          (reaction) => reaction.name === this.CHECK_MARK_REACTION
        ).length > 0
      );
    }
    return false;
  },

  /**
   * sends a reply to a slack thread.
   * @param message the reply body.
   * @param channelId the ID of the channel.
   * @param threadTS the timestamp of the thread.
   */
  async postReplyInThread(message, channelId, threadTS) {
    this.slackClient.chat
      .postMessage({
        channel: channelId,
        text: message,
        as_user: true,
        thread_ts: threadTS,
        icon_url: this.AVATAR_URL,
      })
      .catch(console.error);
  },
};

export default async function (req, res) {
  const payload = JSON.parse(req.body.payload);

  // When the `Save Discussion` option selected in slack.
  if (payload.type === REQUEST_TYPE.MESSAGE_ACTION) {
    handleMessageAction(payload);
    //When the user submits the dialog.
  } else if (payload.type === REQUEST_TYPE.DIALOG_SUBMISSION) {
    handleDialogSubmission(payload);
  }
  res.send();
}

async function handleMessageAction(payload) {
  const channelId = payload.channel.id;
  const threadTS = payload.message.thread_ts;

  if (!threadTS) {
    const errorMessage =
      'Unable to save this discussion since it has no replies.';
    Slack.sendResponse(payload.response_url, errorMessage);
    return;
  }

  const discussionCategories = await Repository.getDiscussionCategories(
    REPO_OWNER,
    REPO_NAME
  );
  const state = `${channelId} ${threadTS}`;
  Slack.openSaveDialog(state, discussionCategories, payload.trigger_id);
}
async function handleDialogSubmission(payload) {
  const dialogState = payload.state.split(' ');
  const channelId = dialogState[0];
  const threadTS = dialogState[1];
  const discussion = await Slack.getSlackDiscussion(channelId, threadTS);
  const categoryId = payload.submission.category;
  if (!discussion) return;
  discussion.title = payload.submission.title;
  const repositoryId = await Repository.getRepositoryId(REPO_OWNER, REPO_NAME);
  const { discussionId, discussionURL } = await Repository.createDiscussion(
    discussion,
    repositoryId,
    categoryId,
    discussion.slackURL || ''
  );
  if (discussion.replies) {
    for (const reply of discussion.replies) {
      const replyId = await Repository.createDicussionReply(
        discussionId,
        reply
      );
      if (reply.isAnswer) {
        Repository.markAnswer(replyId);
      }
    }
  }
  const message = `Thanks to <@${payload.user.id}>, this discussion has been preserved here: ${discussionURL}`;
  Slack.postReplyInThread(message, channelId, threadTS);
}

/**
 * The purpose of this function is to prepare the query for a graphql call.
 *
 * @param query the graphql query.
 * @returns {GraphQlResponse} the GitHub response object.
 */
async function fetchGraphql(query) {
  const parameters = {
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  };

  return graphql(query, parameters);
}

export const config = {
  type: 'experimental-background',
};
