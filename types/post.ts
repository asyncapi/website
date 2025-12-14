import type caseStudies from '../config/case-studies.json';
import type posts from '../config/posts.json';

export type IPosts = typeof posts;

export type IDocs = IPosts['docs'];
export type IDoc = IDocs[number];

export type IBlog = IPosts['blog'];
export type IBlogPost = IBlog[number];

export type IAbout = IPosts['about'];
export type IAboutPost = IAbout[number];

export type IPost = IDoc & IBlogPost & IAboutPost;

export type IDocsTree = IPosts['docsTree'];

export type ICaseStudies = typeof caseStudies;
export type ICaseStudyFromJSON = ICaseStudies[number];

export interface CompanyInfo {
  name: string;
  description: string;

  customers?: string;
  revenue?: string;

  industry: string;
  website: string;
  logo: string;

  contact: {
    name: string;
    link: string;
  }[];
}

export interface TechnicalInfo {
  languages?: string[];
  frameworks?: string[];
  protocols?: string[];

  brokers?: string;

  testing: string;
  architecture: string;
  codegen: string;
}

export interface SchemaInfo {
  description?: string;
  storage: string;
  registry: string;
  versioning: string;
  validation: string;
}

export interface AsyncAPIInfo {
  usecase: string;

  versions?: string[];

  storage: string;
  editing: string;
  documentation: string;

  maintainers?: string;

  audience?: {
    internal: boolean;
    external: boolean;
  };

  extensions?: string;
  bindings?: string;
  tools?: string;

  fullExample: string;
}

export interface ICaseStudy {
  id: string;

  company: CompanyInfo;

  challenges: string;
  solution: string;
  additionalResources?: string;

  technical: TechnicalInfo;
  schemas: SchemaInfo;
  asyncapi: AsyncAPIInfo;
}
