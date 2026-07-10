import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Danh sách Bài viết | NextJS Demo Blog",
  description: "Danh sách bài viết mẫu được render hoàn toàn từ server (Server-Side Rendering).",
};

interface Post {
  id: number;
  title: string;
  body: string;
}

// Hàm fetch dữ liệu trực tiếp trên Server Component
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6", {
    next: { revalidate: 60 } // Caching revalidate sau mỗi 60 giây
  });

  if (!res.ok) {
    throw new Error("Lỗi khi tải danh sách bài viết");
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/50 inline-block mb-3">
          Server Component
        </span>
        <h1 className="text-3xl font-extrabold text-white">Danh sách Bài viết (Server-Side Fetching)</h1>
        <p className="text-slate-400 mt-2">
          Trang này tải dữ liệu hoàn toàn trên Server trước khi trả HTML về cho Client. F12 kiểm tra sẽ thấy không có code JS fetch dữ liệu nào chạy dưới Browser!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 capitalize line-clamp-1">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {post.body}
              </p>
            </div>
            
            <Link 
              href={`/posts/${post.id}`} 
              className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              Chi tiết bài viết &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
