import { Card } from "@/components/ui/card";
import { Blog } from "../types";

interface Props {
  blog: Blog;
  onClick: (id: number) => void;
  isActive: boolean;
}

export default function BlogCard({ blog, onClick, isActive }: Props) {
  return (
    <Card 
      onClick={() => onClick(blog.id)}
      className={`p-4 mb-4 cursor-pointer transition-all hover:shadow-md border-l-4 ${
        isActive ? "border-l-indigo-600 bg-indigo-50/30" : "border-l-transparent"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
          {blog.category[0]}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase font-medium">
          {new Date(blog.date).toLocaleDateString()}
        </span>
      </div>
      <h4 className="font-bold text-sm mb-2 line-clamp-2 leading-tight">
        {blog.title}
      </h4>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {blog.description}
      </p>
    </Card>
  );
}