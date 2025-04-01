export interface Author {
  login: string;
}

export interface Repository {
  name: string;
}

export interface Assignees {
  totalCount: number;
}

export interface Reactions {
  totalCount: number;
}

export interface PageInfo {
  hasNextPage: boolean;
}

export interface CommentNode {
  reactions: Reactions;
}

export interface Comments {
  totalCount: number;
  nodes: CommentNode[];
  pageInfo: PageInfo;
}

export interface Label {
  name: string;
}

export interface Labels {
  nodes: Label[];
}

export interface TimelineItems {
  updatedAt: string;
}

export interface Discussion {
  id: string;
  __typename: string;
  title: string;
  author: Author;
  resourcePath: string;
  repository: Repository;
  assignees: Assignees;
  reactions: Reactions;
  comments: Comments;
  labels: Labels;
  timelineItems: TimelineItems;
}

export interface FullDiscussionDetails {
  node: Discussion;
}

export interface RateLimit {
  cost: number;
  limit: number;
  remaining: number;
  resetAt: string;
}

export interface MockRateLimitResponse {
  search: {
    nodes: Discussion[];
    pageInfo: PageInfo;
  };
  rateLimit: RateLimit;
}

export interface Issue {
  id: string;
  title: string;
  assignees: Assignees;
  resourcePath: string;
  repository: Repository;
  author: Author;
  labels: Labels;
}
