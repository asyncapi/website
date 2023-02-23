export type DiscussionCategory = {
  name: string;
  id: string;
};

export type Discussion = {
  title?: string;
  body?: string;
  replies?: Reply[];
  slackURL?: string;
};

export type Reply = {
  body?: string;
  isAnswer?: boolean;
};
