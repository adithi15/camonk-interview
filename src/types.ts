export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export type NewBlog = O Standardize omit<Blog, 'id'>;