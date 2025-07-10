interface RateLimit {
  limit: number;
  cost: number;
  remaining: number;
  resetAt: string;
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
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

interface BasicIssueOrPR {
  __typename: string;
  id: string;
  title: string;
  author: Author;
  assignees: Assignees;
  resourcePath: string;
  repository: Repository;
  labels: {
    nodes: Label[];
  } | null;
}

export interface PullRequestById {
  node: {
    reactions: Reactions;
    reviews: Reviews;
    timelineItems: TimelineItems;
    comments: Comments;
  } & BasicIssueOrPR;
}

export interface IssueById {
  node: {
    timelineItems: TimelineItems;
    reactions: Reactions;
    comments: Comments;
    reviews: Reviews;
  } & BasicIssueOrPR;
}

export interface GoodFirstIssues extends BasicIssueOrPR {}

export interface HotDiscussionsIssuesNode extends BasicIssueOrPR {
  timelineItems: TimelineItems;
  reactions: Reactions;
  comments: Comments;
  reviews: Reviews;
}

export interface HotDiscussionsPullRequestsNode extends BasicIssueOrPR {
  timelineItems: TimelineItems;
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
  title: string;
  author: string;
  isPR: boolean;
  isAssigned: boolean;
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
