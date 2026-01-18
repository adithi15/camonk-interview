import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/api/blogs";
import BlogCard from "./BlogCard";

export default function BlogList({ onSelect, activeId }: { onSelect: (id: number) => void, activeId: number | null }) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <p className="p-4">Loading blogs...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading blogs</p>;

  return (
    <div className="space-y-2">
      {blogs?.map((blog) => (
        <BlogCard 
          key={blog.id} 
          blog={blog} 
          onClick={() => onSelect(blog.id)} 
          isActive={activeId === blog.id}
        />
      ))}
    </div>
  );
}