import { Option } from '@/components/customCategorySelect/CustomCategorySelect';
import { User } from './User';

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  author: User['name'];
  createdAt: string;
  categories: Option[];
}
