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
  isTscMember?: boolean;
  isBoardMember?: boolean;
  isBoardChair?: boolean;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
};

export interface Tsc {
  name: string;
  isTscMember: boolean;
  availableForHire?: boolean;
  github: string;
  linkedin?: string;
  slack?: string;
  twitter?: string;
  company?: string;
  repos: any;
  isBoardMember?: boolean;
  isBoardChair?: boolean;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
};
