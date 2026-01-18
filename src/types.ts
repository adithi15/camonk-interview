export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

// Correct syntax for NewBlog
export type NewBlog = Omit<Blog, 'id'>;