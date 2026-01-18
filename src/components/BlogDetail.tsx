import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetail({ id }: { id: number }) {
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });

  if (isLoading) return <DetailSkeleton />;
  if (error || !blog) return <div className="p-8 text-red-500">Error loading blog content.</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="w-full h-72 overflow-hidden">
        <img src={blog.coverImage} className="w-full h-full object-cover" alt={blog.title} />
      </div>
      <div className="p-10 max-w-3xl mx-auto">
        <div className="flex gap-2 mb-4">
          {blog.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-[10px] bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
              {cat}
            </Badge>
          ))}
        </div>
         <h1 className="font-serif text-4xl font-bold tracking-tight">
        {blog.title}
      </h1>
        <div className="font-serif text-lg leading-relaxed text-slate-700 mt-6">
        {blog.content}
      </div>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}