export type DiscussionCategory = {
  name: string;
  id: string;
};

export type Discussion = {
  title?: string;
  body?: string;
  replies?: Reply[];
};

export type Reply = {
  body?: string;
  isAnswer?: boolean;
};
