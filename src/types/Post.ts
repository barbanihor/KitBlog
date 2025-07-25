import { User } from './User';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User['name'];
  createdAt: string;
}
