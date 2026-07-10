"use client";

import { useState, useEffect } from "react";
import { useCounterStore } from "@/store/useCounterStore";
import { useQuery } from "@tanstack/react-query";

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

// Hàm fetch data dùng cho TanStack Query
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
  if (!res.ok) throw new Error("Không thể tải danh sách users");
  return res.json();
};

export default function Dashboard() {
  // 1. Quản lý State cục bộ giống hệt React thuần
  const [comments, setComments] = useState<Comment[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newContent, setNewContent] = useState("");

  // 2. Sử dụng Zustand Store (Global State)
  const { count: globalCount, increment, decrement, reset } = useCounterStore();

  // 3. Sử dụng TanStack Query (React Query) để fetch dữ liệu
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Local Storage Sync cho bình luận
  useEffect(() => {
    const saved = localStorage.getItem("nextjs_demo_comments");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi parse JSON", e);
      }
    } else {
      const initialComments: Comment[] = [
        {
          id: 1,
          author: "Nguyễn Văn A",
          content: "Khung dự án React + Next.js + Tailwind CSS này rất xịn!",
          time: new Date().toLocaleTimeString()
        }
      ];
      setComments(initialComments);
      localStorage.setItem("nextjs_demo_comments", JSON.stringify(initialComments));
    }
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: newAuthor,
      content: newContent,
      time: new Date().toLocaleTimeString()
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("nextjs_demo_comments", JSON.stringify(updated));

    setNewAuthor("");
    setNewContent("");
  };

  const handleClear = () => {
    setComments([]);
    localStorage.removeItem("nextjs_demo_comments");
  };

  return (
    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards] flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900/50 inline-block mb-3">
          Client Component
        </span>
        <h1 className="text-3xl font-extrabold text-white">Interactive Dashboard (Zustand &amp; TanStack Query)</h1>
        <p className="text-slate-400 mt-2">
          Trang này minh họa cách sử dụng các thư viện quản lý state và fetch data phổ biến của React ngay trong Next.js.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Zustand Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-900/50">
              Zustand Store
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-2">Global Counter State</h3>
            <p className="text-slate-400 text-sm">State này được chia sẻ toàn cục và không bị mất đi khi bạn chuyển trang.</p>
            <div className="text-4xl font-extrabold text-indigo-500 text-center my-6">
              {globalCount}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all" onClick={increment}>
              Tăng +1
            </button>
            <button className="py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold border border-slate-700 transition-all" onClick={decrement}>
              Giảm -1
            </button>
            <button className="py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold border border-slate-700 transition-all" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        {/* TanStack Query Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-900/50">
              TanStack Query
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-2">Danh sách Users (API)</h3>
            <p className="text-slate-400 text-xs mb-3">Sử dụng <code>useQuery</code> để fetch client-side từ JSONPlaceholder.</p>

            {isLoading && <p className="text-slate-500 text-sm italic">Đang tải dữ liệu...</p>}
            {error && <p className="text-rose-500 text-sm">Lỗi: {(error as Error).message}</p>}
            
            {users && (
              <ul className="text-sm text-slate-300 space-y-2">
                {users.map(u => (
                  <li key={u.id} className="border-b border-slate-800 pb-1 last:border-0">
                    <strong className="text-white">{u.name}</strong> - <span className="text-xs text-slate-500">{u.company.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span className="text-xs text-slate-500 mt-4 italic">Tự động cache và sync dữ liệu</span>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900/50">
            React Local State
          </span>
          <h3 className="text-lg font-bold text-white mt-3 mb-2">Gửi bình luận mới</h3>
          
          <form onSubmit={handleAddComment} className="flex flex-col gap-3 mt-3">
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="Tên của bạn..." 
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required
            />
            <textarea 
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none" 
              placeholder="Nhập ý kiến..." 
              rows={2}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            />
            <button type="submit" className="w-full py-2 rounded text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all">
              Gửi bình luận
            </button>
          </form>
        </div>
      </div>

      {/* Comments List Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Danh sách Bình luận ({comments.length})</h2>
          {comments.length > 0 && (
            <button className="px-3 py-1 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 transition-all" onClick={handleClear}>
              Xóa tất cả
            </button>
          )}
        </div>

        {comments.length === 0 ? (
          <div className="py-8 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-xl text-sm">
            Chưa có bình luận nào. Hãy gửi bình luận đầu tiên phía trên!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-sm">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <strong className="text-emerald-400">{comment.author}</strong>
                  <span className="text-slate-500">{comment.time}</span>
                </div>
                <p className="text-slate-300">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
