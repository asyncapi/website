export interface RateLimit {
  limit: number;
  cost: number;
  remaining: number;
  resetAt: string;
}

export interface Assignee {
  totalCount: number;
}

export interface TimelineItem {
  updatedAt: string;
}

export interface Author {
  login: string;
}

export interface Repository {
  name: string;
}

export interface Reaction {
  totalCount: number;
}

export interface Review {
  lastEditedAt?: string;
  comments: {
    totalCount: number;
  };
}

export interface Label {
  name: string;
  color: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface CommentNode {
  reactions: Reaction;
}

export interface Comments {
  totalCount: number;
  pageInfo: PageInfo;
  nodes: CommentNode[];
}

export interface Issue {
  assignees: Assignee[];
  timelineItems: TimelineItem[];
  author: Author;
  id: string;
  repository: Repository;
  labels?: Label[];
  title: string;
  resourcePath: string;
  reactions: Reaction;
  comments: Comments;
}

export interface PullRequest extends Issue {
  reviews: {
    totalCount: number;
    nodes: Review[];
  };
}

export interface SearchResultNode {
  __typename: "Issue" | "PullRequest";
  id: string;
  assignees: Assignee[];
  author: Author;
  repository: Repository;
  labels?: Label[];
  title: string;
  resourcePath: string;
}

export interface SearchResult {
  pageInfo: PageInfo;
  nodes: SearchResultNode[];
}

export interface QueryResponse<T> {
  node?: T;
  rateLimit: RateLimit;
  search?: SearchResult;
}