import { Discussion } from './Discussion';
import GitHubRepository from './GithubReposity';
import { WebClient } from '@slack/web-api';
import axios from 'axios';
import querystring from 'querystring';
import { HandlerEvent, HandlerContext } from '@netlify/functions';

const client = new WebClient(process.env.SLACK_TOKEN);
let githubReposity: GitHubRepository;
let discussion: Discussion;

const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod != 'POST' || !event.body) {
    return {
      statusCode: 400,
    };
  }
  const payload = JSON.parse(
    querystring.parse(event.body || '{}')?.payload as string
  );
  if (payload.type === 'message_action') {
    discussion = new Discussion(
      payload.message.ts,
      payload.channel.id,
      payload.response_url
    );
    await discussion.parseReplies().catch((err) => {
      await axios.post(discussion.responseUrl, {
        text: err.message,
      }).catch(console.error);
      console.error(err);
    });
    showPrompt(payload.trigger_id);
  } else if (payload.type === 'dialog_submission') {
    if (!discussion) return;
    discussion.setTitle(payload.submission.title);
    discussion.setCategory(payload.submission.category);

    const discussionUrl = await githubReposity.createDiscussion(discussion);
    if (url) {
      discussion.postMessage(
        'this discussion has been preserved here: ' + url
      );
    }
  }
  return {
    statusCode: 200,
  };
};

export { handler };

async function showPrompt(trigger_id: string) {
  if (!githubReposity) {
    githubReposity = await GitHubRepository.getInstance(
      process.env.REPO_OWNER!,
      process.env.REPO_NAME!
    );
  }
  client.dialog.open({
    dialog: {
      callback_id: 'ryde-46e2b0',
      title: 'Save to GitHub',
      submit_label: 'Save',
      notify_on_cancel: false,
      state: 'Limo',
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
    trigger_id,
  });
}
function toTitleCase(title: string) {
  return title
    .split(' ')
    .map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}
