"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

export default function Dashboard() {
  const [count, setCount] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newContent, setNewContent] = useState("");

  // Dùng useEffect lấy dữ liệu từ localStorage
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
        <h1 className="text-3xl font-extrabold text-white">Interactive Dashboard (Client-Side)</h1>
        <p className="text-slate-400 mt-2">
          Trang này được khai báo <code>&quot;use client&quot;</code> ở đầu file, cho phép bạn sử dụng toàn bộ React hooks, bắt sự kiện và truy cập APIs trình duyệt (như <code>localStorage</code>).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Counter Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Bộ đếm React State</h3>
            <p className="text-slate-400 text-sm">Click nút bên dưới để tăng giá trị đếm. State được quản lý cục bộ giống như React thuần.</p>
            <div className="text-5xl font-extrabold text-indigo-500 text-center my-8">
              {count}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all" onClick={() => setCount(count + 1)}>
              Tăng +1
            </button>
            <button className="px-4 py-2.5 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">Gửi Bình luận mới</h3>
          <p className="text-slate-400 text-sm mb-4">Bình luận sẽ được lưu ngay vào <code>localStorage</code> của bạn.</p>
          
          <form onSubmit={handleAddComment} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tên của bạn</label>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors" 
                placeholder="Nhập tên..." 
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nội dung</label>
              <textarea 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-y" 
                placeholder="Nhập ý kiến..." 
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full py-2.5 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/10">
              Gửi bình luận
            </button>
          </form>
        </div>
      </div>

      {/* Comments List Section */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Danh sách Bình luận ({comments.length})</h2>
          {comments.length > 0 && (
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 transition-all" onClick={handleClear}>
              Xóa tất cả
            </button>
          )}
        </div>

        {comments.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-xl">
            Chưa có bình luận nào. Hãy gửi bình luận đầu tiên phía trên!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <div key={comment.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <strong className="text-emerald-400 text-sm">{comment.author}</strong>
                  <span className="text-slate-500">{comment.time}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
