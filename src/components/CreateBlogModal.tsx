import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBlog } from "../api/blogs";

export default function CreateBlogModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      title: formData.get("title") as string,
      category: [formData.get("category") as string],
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      coverImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
      date: new Date().toISOString(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">Create New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="title" placeholder="Blog Title" required />
          <Input name="category" placeholder="Category (e.g. TECH, FINANCE)" required />
          <Input name="description" placeholder="Short Summary" required />
          <Textarea name="content" placeholder="Full Content" rows={5} required />
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Publishing..." : "Publish Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}