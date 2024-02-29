import type posts from '../config/posts.json';

export type IPosts = typeof posts;
export type IDocs = IPosts['docs'];
