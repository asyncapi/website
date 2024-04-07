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
};
