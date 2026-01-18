import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./api/blogs";
import BlogCard from "./components/BlogCard";
import BlogDetail from "./components/BlogDetail";
import CreateBlogModal from "./components/CreateBlogModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: blogs, isLoading } = useQuery({ queryKey: ["blogs"], queryFn: getBlogs });

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tighter text-indigo-600">CA MONK BLOG</h1>
        <CreateBlogModal />
      </nav>

      <main className="container mx-auto flex flex-col md:flex-row flex-1 px-6 py-8 gap-8">
        {/* Left List */}
        <aside className="w-full md:w-[380px] flex flex-col">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 px-2">Latest Articles</h3>
          <ScrollArea className="h-[calc(100vh-250px)] pr-4">
            {isLoading ? <p>Loading articles...</p> : 
              blogs?.map(blog => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  onClick={setSelectedId} 
                  isActive={selectedId === blog.id} 
                />
              ))
            }
          </ScrollArea>
        </aside>

        {/* Right Detail */}
        <section className="flex-1 bg-white rounded-2xl border shadow-sm overflow-hidden">
          {selectedId ? <BlogDetail id={selectedId} /> : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-20 text-center">
              <p className="text-5xl mb-4">📖</p>
              <p className="text-lg">Select an article to read the full content</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-white font-bold mb-4">CA MONK</h4>
            <p className="text-sm">Empowering finance professionals worldwide.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="text-sm space-y-2">
              <li>Home</li>
              <li>Practice</li>
              <li>Jobs</li>
            </ul>
          </div>
          <div className="text-sm">
            <p>© 2024 CA Monk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}