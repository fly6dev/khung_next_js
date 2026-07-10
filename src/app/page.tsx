import Link from "next/link";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Khung Dự Án Next.js Chuẩn</h1>
        <p className="hero-subtitle">
          Một boilerplate đầy đủ, tối ưu hóa cấu trúc App Router, được thiết kế đặc biệt dành riêng cho lập trình viên từ React chuyển sang Next.js.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/posts" className="btn btn-primary">
            Xem Ví dụ Server Fetch
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            Xem Ví dụ Client Form
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <h2 style={{ fontSize: "1.75rem", marginTop: "40px", textAlign: "center" }}>
        Các Tính năng Có trong Boilerplate Này
      </h2>
      
      <div className="grid">
        {/* Card 1 */}
        <div className="card">
          <div className="card-title">
            <span className="badge badge-server">Server Component</span>
            <span>Trang Danh sách Posts</span>
          </div>
          <p className="card-desc">
            Nằm tại <code>/posts</code>. Minh họa cách fetch dữ liệu trực tiếp trên Server cực kì an toàn và nhanh chóng mà không cần <code>useEffect</code>.
          </p>
          <Link href="/posts" style={{ color: "var(--accent-primary)", fontWeight: "600" }}>
            Khám phá ngay &rarr;
          </Link>
        </div>

        {/* Card 2 */}
        <div className="card">
          <div className="card-title">
            <span className="badge badge-client">Client Component</span>
            <span>Interactive Dashboard</span>
          </div>
          <p className="card-desc">
            Nằm tại <code>/dashboard</code>. Minh họa cách dùng React hooks quen thuộc như <code>useState</code>, <code>useEffect</code> với chỉ thị <code>&quot;use client&quot;</code>.
          </p>
          <Link href="/dashboard" style={{ color: "var(--accent-secondary)", fontWeight: "600" }}>
            Khám phá ngay &rarr;
          </Link>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div className="card-title">
            <span className="badge badge-api">Route Handler</span>
            <span>API Backend Tích Hợp</span>
          </div>
          <p className="card-desc">
            Nằm tại <code>/api/hello</code>. Bạn có thể xây dựng các endpoint API trực tiếp trong Next.js mà không cần chạy một server Node.js riêng biệt.
          </p>
          <a href="/api/hello" target="_blank" style={{ color: "var(--accent-orange)", fontWeight: "600" }}>
            Gọi thử API &rarr;
          </a>
        </div>
      </div>

      {/* Guide Section */}
      <section style={{ marginTop: "60px", padding: "32px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Bắt đầu Phát triển Như thế nào?</h3>
        <ol style={{ marginLeft: "20px", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <li>
            <strong>Clone hoặc tải code về:</strong> Cây thư mục này đã được tối ưu hóa sẵn, bạn chỉ việc lập trình tiếp.
          </li>
          <li>
            <strong>Cài đặt thư viện:</strong> Chạy lệnh <code>npm install</code> trong terminal.
          </li>
          <li>
            <strong>Chạy môi trường phát triển:</strong> Chạy lệnh <code>npm run dev</code> để khởi chạy localhost:3000.
          </li>
          <li>
            <strong>Viết trang mới:</strong> Tạo thư mục mới trong <code>src/app/</code> và thêm file <code>page.tsx</code>. Ví dụ: <code>src/app/lien-he/page.tsx</code> sẽ tạo ra trang <code>/lien-he</code>.
          </li>
        </ol>
      </section>
    </div>
  );
}
