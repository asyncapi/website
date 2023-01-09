import { Discussion } from './Discussion';
import GitHubRepository from './GithubReposity';
import { WebClient } from '@slack/web-api';
import axios from 'axios';
import querystring from 'querystring';
import { HandlerEvent, HandlerContext } from '@netlify/functions';

const client = new WebClient(process.env.SLACK_TOKEN);
let githubReposity: GitHubRepository;

const handler = async (event: HandlerEvent) => {
  if (event.httpMethod != 'POST' || !event.body) {
    return {
      statusCode: 400,
    };
  }
  const payload = JSON.parse(
    querystring.parse(event.body || '{}')?.payload as string
  );
  if (payload.type === 'message_action') {

    showPrompt(payload);
  } else if (payload.type === 'dialog_submission') {
    // can't use await here since slack needs a response within 3 seconds and this operation can take more than three seconds to complete.
    parseDiscussion(payload).then(async (discussion) => {
      discussion.setTitle(payload.submission.title);
      discussion.setCategory(payload.submission.category);
      const discussionUrl = await githubReposity.createDiscussion(discussion);
      if (discussionUrl) {
        discussion.postMessage(
          'this discussion has been preserved here: ' + discussionUrl
        );
      }
    }).catch((err) => {
      console.error(err);
    });
  }
  return {
    statusCode: 200,
  };
};

export { handler };
async function parseDiscussion(payload: any): Promise<Discussion> {
  const discussion = new Discussion(
    payload.state.split(' ')[1],
    payload.state.split(' ')[0],
    payload.response_url
  );

  await discussion.parseReplies().catch(async (err) => {
    await axios.post(discussion.responseUrl, {
      text: err.message,
    }).catch(console.error);
    console.error(err);
  });

  return discussion;
}
async function showPrompt(payload: any) {
    githubReposity = await GitHubRepository.getInstance(
      process.env.REPO_OWNER!,
      process.env.REPO_NAME!
    );
  client.dialog.open({
    dialog: {
      callback_id: 'ryde-46e2b0',
      title: 'Save to GitHub',
      submit_label: 'Save',
      notify_on_cancel: false,
      state: `${payload.channel.id} ${payload.message.ts}`, // The state of the dialog is used to preserve the discussion details between calls.
      elements: [
        {
          type: 'text',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'select',
          options: Object.entries(githubReposity.discussionCategories).map(
            ([category, id]) => {
              return { label: toTitleCase(category), value: id as string };
            }
          ),
          label: 'Category',
          name: 'category',
        },
      ],
    },
    trigger_id: payload.trigger_id,
  }).catch(console.error);
}
function toTitleCase(title: string) {
  return title
    .split(' ')
    .map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}
