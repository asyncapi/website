import { createContext } from 'react';
import { Post } from '@/types/context/GenericPostContext';

const defaultPost: Post = {
  title: '',
  slug: '',
  excerpt: '',
  cover: '',
};

export default createContext<{ post: Post }>({
  post: defaultPost,
});
