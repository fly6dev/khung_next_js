"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

export default function Dashboard() {
  // 1. Quản lý State giống hệt React thuần
  const [count, setCount] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newContent, setNewContent] = useState("");

  // 2. Dùng useEffect để lấy dữ liệu từ localStorage (chỉ chạy dưới Browser)
  useEffect(() => {
    const saved = localStorage.getItem("nextjs_demo_comments");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi parse JSON", e);
      }
    } else {
      // Mock dữ liệu ban đầu
      const initialComments: Comment[] = [
        {
          id: 1,
          author: "Nguyễn Văn A",
          content: "Dự án mẫu này chạy mượt quá, CSS thuần viết rất đẹp!",
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

    // Clear form
    setNewAuthor("");
    setNewContent("");
  };

  const handleClear = () => {
    setComments([]);
    localStorage.removeItem("nextjs_demo_comments");
  };

  return (
    <div className="animate-fade-in" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
      {/* Page Header */}
      <div>
        <span className="badge badge-client" style={{ marginBottom: "8px" }}>Client Component</span>
        <h1 style={{ fontSize: "2.5rem" }}>Interactive Dashboard (Client-Side)</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
          Trang này được khai báo <code>&quot;use client&quot;</code> ở đầu file, cho phép bạn sử dụng toàn bộ React hooks, bắt sự kiện và truy cập APIs trình duyệt (như <code>localStorage</code>).
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        
        {/* Counter Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 className="card-title">Bộ đếm React State</h3>
            <p className="card-desc">Click nút bên dưới để tăng giá trị đếm. State được quản lý cục bộ.</p>
            <div style={{ fontSize: "3rem", fontWeight: "800", textAlign: "center", margin: "24px 0", color: "var(--accent-primary)" }}>
              {count}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setCount(count + 1)}>Tăng +1</button>
            <button className="btn btn-secondary" onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>

        {/* Form Card */}
        <div className="card">
          <h3 className="card-title">Gửi Bình luận mới</h3>
          <p className="card-desc">Bình luận sẽ được lưu ngay vào <code>localStorage</code> của bạn.</p>
          
          <form onSubmit={handleAddComment}>
            <div className="form-group">
              <label className="form-label">Tên của bạn</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Nhập tên..." 
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nội dung</label>
              <textarea 
                className="form-input" 
                placeholder="Nhập ý kiến..." 
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
                style={{ resize: "vertical" }}
              />
            </div>
            <button type="submit" className="btn btn-accent" style={{ width: "100%" }}>Gửi bình luận</button>
          </form>
        </div>

      </div>

      {/* Comments List Section */}
      <div style={{ marginTop: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.5rem" }}>Danh sách Bình luận ({comments.length})</h2>
          {comments.length > 0 && (
            <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }} onClick={handleClear}>
              Xóa tất cả
            </button>
          )}
        </div>

        {comments.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            Chưa có bình luận nào. Hãy gửi bình luận đầu tiên phía trên!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ padding: "16px 20px", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem" }}>
                  <strong style={{ color: "var(--accent-primary)" }}>{comment.author}</strong>
                  <span style={{ color: "var(--text-muted)" }}>{comment.time}</span>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
