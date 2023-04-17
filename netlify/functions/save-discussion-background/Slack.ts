import { WebClient } from '@slack/web-api';
import axios from 'axios';
import { Discussion, DiscussionCategory, Reply } from './index.d';

export namespace Slack {
  const slackClient = new WebClient(process.env.SLACK_TOKEN);
  const CHECK_MARK_REACTION = 'white_check_mark';
  const AVATAR_URL = 'https://avatars.githubusercontent.com/u/61865014';

  /**
   * Opens a dialog in Slack asking for a title and a category.
   * @param state You can supply a string and get it back when the dialog is submitted.
   * @param discussionCategories A list of GitHub discussions that a repository has.
   * @param triggerId trigger_id of your action. you can parse it from the payload of any Slack action.
   */
  export async function openSaveDialog(
    state: string,
    discussionCategories: DiscussionCategory[],
    triggerId: string
  ) {
    slackClient.dialog
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
  }

  /**
   * Shows a message in the slack channel that is only visible to the user that triggered the action.
   * @param responseUrl response_url of the action that triggers the endpoint.
   * @param message The message that you want to post.
   */
  export async function sendResponse(responseUrl: string, message: string) {
    try {
      await axios.post(responseUrl, {
        text: message,
      });
    } catch (err) {
      err.message = `Unable to send a response to: ${responseUrl}`;
      console.error(err);
    }
  }

  /**
   * Parse the thread timestamp.
   * @param discussionTS ts(timestamp) of the discussion.
   * @param channelId the ID of the channel which contains the message.
   * @returns {string} the timestamp of the discussion thread.
   */
  export async function getThreadTS(discussionTS: string, channelId: string) {
    try {
      const conversationHistoryOptions = {
        channel: channelId,
        latest: discussionTS,
        limit: 1,
        inclusive: true,
      };
      const { messages } = await slackClient.conversations.history(
        conversationHistoryOptions
      );
      if (!messages) {
        throw new Error(
          `conversation with ts: ${discussionTS} doesn't exist in channel: ${channelId}.`
        );
      }
      return messages[0].thread_ts;
    } catch (err) {
      err.message =
        'Unable to preserve this conversation. It is possible that I am not a memeber of this channel, you can invite me to this channel by using the command `/invite @Chan`.';
      throw err;
    }
  }

  export async function getSlackDiscussion(
    channelId: string,
    threadTS: string
  ): Promise<Discussion | undefined> {
    const { messages } = await slackClient.conversations.replies({
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
    const replies = parseReplies(messages.slice(1));
    const { permalink } = await slackClient.chat.getPermalink({
      channel: channelId,
      message_ts: threadTS,
    });
    return { body, replies, slackURL: permalink };
  }

  function parseReplies(messages: any): Reply[] {
    return messages.map((message) => ({
      body: message.text,
      isAnswer: isAnswer(message),
    }));
  }
  /**
   *
   * @param message the message object that has been received from Slack.
   * @returns Whether the message has the :white_check_mark: reaction.
   */

  function isAnswer(message): boolean {
    if (message.reactions) {
      return (
        message.reactions.filter(
          (reaction) => reaction.name === CHECK_MARK_REACTION
        ).length > 0
      );
    }
    return false;
  }

  /**
   * sends a reply to a slack thread.
   * @param message the reply body.
   * @param channelId the ID of the channel.
   * @param threadTS the timestamp of the thread.
   */
  export async function postReplyInThread(
    message: string,
    channelId: string,
    threadTS: string
  ) {
    try {
      slackClient.chat.postMessage({
        channel: channelId,
        text: message,
        as_user: true,
        thread_ts: threadTS,
        icon_url: AVATAR_URL,
      });
    } catch (err) {
      console.error(
        'Something went wrong while trying to post a reply to the discussion'
      );
      console.error(err);
    }
  }
}
