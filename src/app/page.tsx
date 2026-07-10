import Link from "next/link";

export default function Home() {
  return (
    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
      {/* Hero Section */}
      <section className="text-center py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Khung Dự Án Next.js &amp; Tailwind CSS
        </h1>
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          Một boilerplate đầy đủ, tối ưu hóa cấu trúc App Router và cấu hình sẵn Tailwind CSS, được thiết kế đặc biệt dành riêng cho lập trình viên từ React chuyển sang Next.js.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/posts" className="px-6 py-3 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5">
            Xem Ví dụ Server Fetch
          </Link>
          <Link href="/dashboard" className="px-6 py-3 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:-translate-y-0.5">
            Xem Ví dụ Client Form
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <h2 className="text-2xl font-bold mt-10 mb-8 text-center text-white">
        Các Tính năng Có trong Boilerplate Này
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Card 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/50">
                Server Component
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Trang Danh sách Posts</h3>
            <p className="text-slate-400 text-sm mb-4">
              Nằm tại <code>/posts</code>. Minh họa cách fetch dữ liệu trực tiếp trên Server cực kì an toàn và nhanh chóng mà không cần <code>useEffect</code>.
            </p>
          </div>
          <Link href="/posts" className="text-indigo-400 font-semibold text-sm hover:text-indigo-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Khám phá ngay &rarr;
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900/50">
                Client Component
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Interactive Dashboard</h3>
            <p className="text-slate-400 text-sm mb-4">
              Nằm tại <code>/dashboard</code>. Minh họa cách dùng React hooks quen thuộc như <code>useState</code>, <code>useEffect</code> với chỉ thị <code>&quot;use client&quot;</code>.
            </p>
          </div>
          <Link href="/dashboard" className="text-emerald-400 font-semibold text-sm hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Khám phá ngay &rarr;
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-900/50">
                Route Handler
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">API Backend Tích Hợp</h3>
            <p className="text-slate-400 text-sm mb-4">
              Nằm tại <code>/api/hello</code>. Bạn có thể xây dựng các endpoint API trực tiếp trong Next.js mà không cần chạy một server Node.js riêng biệt.
            </p>
          </div>
          <a href="/api/hello" target="_blank" className="text-amber-400 font-semibold text-sm hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Gọi thử API &rarr;
          </a>
        </div>
      </div>

      {/* Guide Section */}
      <section className="mt-16 p-8 bg-slate-900 border border-slate-800 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Bắt đầu Phát triển Như thế nào?</h3>
        <ol className="list-decimal pl-5 text-slate-400 space-y-3">
          <li>
            <strong>Clone hoặc tải code về:</strong> Cây thư mục này đã được tối ưu hóa sẵn, bạn chỉ việc lập trình tiếp.
          </li>
          <li>
            <strong>Cài đặt thư viện:</strong> Chạy lệnh <code className="text-indigo-400 px-1 py-0.5 rounded bg-slate-950 font-mono text-sm">npm install</code> trong terminal.
          </li>
          <li>
            <strong>Chạy môi trường phát triển:</strong> Chạy lệnh <code className="text-indigo-400 px-1 py-0.5 rounded bg-slate-950 font-mono text-sm">npm run dev</code> để khởi chạy localhost:3000.
          </li>
          <li>
            <strong>Viết trang mới bằng Tailwind:</strong> Tạo thư mục mới trong <code>src/app/</code> và thêm file <code>page.tsx</code>. Sử dụng các class của Tailwind CSS giống như bạn vẫn làm trong React!
          </li>
        </ol>
      </section>
    </div>
  );
}
