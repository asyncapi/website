export interface Event {
  title: string;
  calLink: string;
  url: string;
  banner: string;
  date: string;
}

export interface Contribution {
  title: string;
  link: string;
  type: string;
  date: {
    month?: string;
    year: number;
  };
};

export interface Ambassador {
  name: string;
  img: string;
  bio: string;
  title: string;
  github: string;
  twitter: string;
  linkedin: string;
  company: string;
  contributions: Contribution[];
  country?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  avatarUrl?: string;
  isTscMember?: boolean;
  isBoardMember?: boolean;
  isBoardChair?: boolean;
};

export interface Tsc {
  name: string;
  avatarUrl?: string;
  isTscMember: boolean;
  availableForHire?: boolean;
  github: string;
  linkedin?: string;
  slack?: string;
  twitter?: string;
  company?: string;
  repos: any;
  githubID: number
  isBoardMember?: boolean;
  isBoardChair?: boolean;
};
