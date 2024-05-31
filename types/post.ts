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
export type ICaseStudy = ICaseStudies[number];
