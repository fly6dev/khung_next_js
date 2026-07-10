import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

// Hàm fetch dữ liệu trực tiếp trên Server Component
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6", {
    // Next.js tự động caching và revalidate dữ liệu
    next: { revalidate: 60 } // Revalidate sau mỗi 60 giây
  });

  if (!res.ok) {
    throw new Error("Lỗi khi tải danh sách bài viết");
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "32px" }}>
        <span className="badge badge-server" style={{ marginBottom: "8px" }}>Server Component</span>
        <h1 style={{ fontSize: "2.5rem" }}>Danh sách Bài viết (Server-Side)</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
          Trang này tải dữ liệu hoàn toàn trên Server trước khi trả HTML về cho Client. F12 kiểm tra sẽ thấy không có code JS fetch dữ liệu nào chạy dưới Browser!
        </p>
      </div>

      <div className="grid">
        {posts.map((post) => (
          <div key={post.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 className="card-title" style={{ fontSize: "1.15rem", textTransform: "capitalize" }}>
                {post.title}
              </h3>
              <p className="card-desc" style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontSize: "0.9rem"
              }}>
                {post.body}
              </p>
            </div>
            
            <Link 
              href={`/posts/${post.id}`} 
              className="btn btn-secondary" 
              style={{ width: "100%", marginTop: "16px", padding: "8px 12px", fontSize: "0.85rem" }}
            >
              Chi tiết bài viết &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
