import { WebClient } from '@slack/web-api';

export interface Event {
  channel: string;
  text: string;
  thread_ts: string;
}

interface DiscussionReply {
  body: string;
  isAnswer: boolean;
  ts: string;
}
export class Discussion {
  private _slackClient = new WebClient(process.env.SLACK_TOKEN);
  private _title?: string;
  private _message?: string;
  private _replies: DiscussionReply[] = [];
  private _category?: string;
  private _thread_ts?: string;

  constructor(
    private _ts: string,
    private _channelId: string,
    private _responseUrl: string
  ) {}

  setTitle(title: string) {
    this._title = title;
  }
  get title(): string {
    return this._title ?? '';
  }
  setCategory(category: string) {
    this._category = category;
  }
  get category() {
    return this._category ?? '';
  }
  get responseUrl() {
    return this._responseUrl;
  }
  get message() {
    return this._message || '';
  }
  get replies() {
    return this._replies;
  }
  async parseReplies() {
    let response;
    try {
      response = await this._slackClient.conversations.history({
        channel: this._channelId,
        latest: this._ts,
        limit: 1,
        inclusive: true,
      });
    } catch (err) {
      throw new Error(
        'I am unable to preserve this conversation because I am not a member of this channel. Please invite me to the channel by using the command /invite @Chan.'
      );
    }

    if (!response.messages) return;
    this._message = response.messages[0]?.text;
    if (response.messages) this._thread_ts = response.messages[0].thread_ts;
    if (!this._thread_ts) return;
    const { messages } = await this._slackClient.conversations.replies({
      channel: this._channelId,
      ts: this._thread_ts,
    });
    if (!messages || messages.length === 0) {
      throw new Error(
        'The message that you are trying to preserve does not have any replies, so we cannot preserve it.'
      );
    }
    this._replies = messages.slice(1).map((message: any) => {
      const isAnswer =
        message.reactions &&
        message.reactions.filter(
          (reaction: { name: string }) => reaction.name === 'white_check_mark'
        ).length > 0;

      return { body: message.text, isAnswer, ts: message.ts };
    });
  }

  postMessage(message: string) {
    this._slackClient.chat.postMessage({
      channel: this._channelId,
      text: message,
      as_user: true,
      thread_ts: this._thread_ts,
      icon_url: 'https://avatars.githubusercontent.com/u/61865014',
    });
  }
}
