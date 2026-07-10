import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Fetch 1 post cụ thể theo ID
async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Lỗi khi tải chi tiết bài viết");
  }

  return res.json();
}

export default async function PostDetailPage({ params }: PageProps) {
  // Đối với Next.js 15/16, params là một Promise cần được await trước khi dùng
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/posts" style={{ color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontWeight: "600" }}>
        &larr; Quay lại danh sách bài viết
      </Link>

      <div style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "40px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <span className="badge badge-server">Server Page</span>
          <span className="badge badge-api">ID: {post.id}</span>
        </div>

        <h1 style={{ fontSize: "2rem", textTransform: "capitalize", marginBottom: "20px", lineHeight: "1.3" }}>
          {post.title}
        </h1>

        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "32px" }}>
          {post.body}
        </p>

        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <span>Tác giả ID: {post.userId}</span>
          <span>Được fetch trực tiếp bởi App Router Dynamic Segment</span>
        </div>
      </div>
    </div>
  );
}
