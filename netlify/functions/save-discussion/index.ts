import { Repository } from './Reposity';
import querystring from 'querystring';
import { HandlerEvent } from '@netlify/functions';
import { Slack } from './Slack';

enum REQUEST_TYPE {
  MESSAGE_ACTION = 'message_action',
  DIALOG_SUBMISSION = 'dialog_submission',
}
const REPO_OWNER = process.env.DISCUSSION_TARGET_REPO_OWNER;
const REPO_NAME = process.env.DISCUSSION_TARGET_REPO_NAME;

// Function to handle the main request handling logic.
const handler = async (event: HandlerEvent) => {
  // since slack always sends Only POST methods along with a body, we can ignore all other requests.
  if (event.httpMethod != 'POST' || !event.body) {
    return { statusCode: 400 };
  }

  // Slack encodes the body in application/x-www-form-urlencoded
  const payload = JSON.parse(
    querystring.parse(event.body || '{}')?.payload as string
  );

  // When the `Save Discussion` option selected in slack.
  if (payload.type === REQUEST_TYPE.MESSAGE_ACTION) {
    handleMessageAction(payload);
    //When the user submits the dialog.
  } else if (payload.type === REQUEST_TYPE.DIALOG_SUBMISSION) {
    handleDialogSubmission(payload);
  }
  return { statusCode: 200 };
};

async function handleMessageAction(payload: any) {
  const discussionTS = payload.message.ts;
  const channelId = payload.channel.id;
  const threadTS = await Slack.getThreadTS(discussionTS, channelId);
  console.log(payload);

  if (!threadTS) {
    const errorMessage =
      'Unable to save this discussion since it has no replies.';
    Slack.sendResponse(payload.response_url, errorMessage);
    return;
  }

  const discussionCategories = await Repository.getDiscussionCategories(
    REPO_OWNER!,
    REPO_NAME!
  );
  const state = `${channelId} ${threadTS}`;
  Slack.openSaveDialog(state, discussionCategories, payload.trigger_id);
}
async function handleDialogSubmission(payload: any) {
  const dialogState = payload.state.split(' ');
  const channelId = dialogState[0];
  const threadTS = dialogState[1];
  const discussion = await Slack.getSlackDiscussion(channelId, threadTS);
  const categoryId = payload.submission.category;
  if (!discussion) return;
  discussion.title = payload.submission.title;
  const repositoryId = await Repository.getRepositoryId(
    process.env.DISCUSSION_TARGET_REPO_OWNER!,
    process.env.DISCUSSION_TARGET_REPO_NAME!
  );
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
  console.log(payload);
  const message = `Thanks to <@${payload.user.id}>, this discussion has been preserved here: ${discussionURL}`;
  Slack.postReplyInThread(message, channelId, threadTS);
}

export { handler };
