interface RateLimit {
  limit: number;
  cost: number;
  remaining: number;
  resetAt: string;
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface Reactions {
  totalCount: number;
}

interface Author {
  login: string;
}

interface Repository {
  name: string;
}

interface Label {
  name: string;
  color: string;
}

interface Assignees {
  totalCount: number;
}

interface TimelineItems {
  updatedAt: string;
}

interface Comments {
  totalCount: number;
  pageInfo?: PageInfo;
  nodes: {
    reactions: Reactions;
  }[];
}

interface Reviews {
  totalCount: number;
  nodes?: {
    lastEditedAt: string;
    comments: {
      totalCount: number;
    };
  }[];
}

export interface PullRequestById {
  node: {
    __typename: string;
    assignees: Assignees;
    timelineItems: TimelineItems;
    author: Author;
    id: string;
    title: string;
    resourcePath: string;
    repository: Repository;
    reactions: Reactions;
    reviews: Reviews;
    comments: Comments;
    labels: {
      nodes: Label[];
    };
  };
}

export interface IssueById {
  node: {
    __typename: string;
    assignees: Assignees;
    timelineItems: TimelineItems;
    author: Author;
    id: string;
    repository: Repository;
    labels: {
      nodes: Label[];
    };
    title: string;
    resourcePath: string;
    reactions: Reactions;
    comments: Comments;
    reviews: Reviews;
  };
}

export interface GoodFirstIssues {
  __typename: string;
  assignees: Assignees;
  author: Author;
  id: string;
  title: string;
  resourcePath: string;
  repository: Repository;
  labels: {
    nodes: Label[];
  };
}

export interface HotDiscussionsIssuesNode {
  __typename: string;
  assignees: Assignees;
  timelineItems: TimelineItems;
  author: Author;
  id: string;
  title: string;
  resourcePath: string;
  repository: Repository;
  labels: {
    nodes: Label[];
  };
  reactions: Reactions;
  comments: Comments;
  reviews: Reviews;
}

export interface HotDiscussionsPullRequestsNode {
  __typename: string;
  assignees: Assignees;
  timelineItems: TimelineItems;
  author: Author;
  id: string;
  title: string;
  resourcePath: string;
  repository: Repository;
  labels: {
    nodes: Label[];
  };
  reactions: Reactions;
  reviews: Reviews;
  comments: Comments;
}
export interface Discussion {
  search: {
    pageInfo: PageInfo;
    nodes: HotDiscussionsPullRequestsNode[];
  };
  rateLimit: RateLimit;
}

export interface ProcessedDiscussion {
  id: string;
  isPR: boolean;
  isAssigned: boolean;
  title: string;
  author: string;
  resourcePath: string;
  repo: string;
  labels: Label[];
  score: number;
}

export interface MappedIssue {
  id: string;
  title: string;
  isAssigned: boolean;
  resourcePath: string;
  repo: string;
  author: string;
  area: string;
  labels: Label[];
}
