import type { Metadata } from "next";
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

// Hàm tối ưu hóa SEO động: Tự động chạy trên server để sinh Meta Tags (Title, Description, OG)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const post = await getPost(resolvedParams.id);
    return {
      title: `${post.title.toUpperCase()} | NextJS Demo Blog`,
      description: post.body.slice(0, 150) + "...",
      openGraph: {
        title: post.title,
        description: post.body.slice(0, 150) + "...",
        type: "article",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/posts/${post.id}`,
      },
    };
  } catch (error) {
    return {
      title: "Bài viết không tìm thấy | NextJS Demo Blog",
      description: "Chi tiết bài viết không tồn tại hoặc có lỗi xảy ra.",
    };
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  return (
    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards] max-w-2xl mx-auto w-full">
      <Link href="/posts" className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm inline-flex items-center gap-1 mb-6">
        &larr; Quay lại danh sách bài viết
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10">
        <div className="flex gap-2 mb-4">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-900/50">
            Server Page
          </span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
            ID: {post.id}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6 capitalize leading-tight">
          {post.title}
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          {post.body}
        </p>

        <div className="border-t border-slate-800 pt-6 flex justify-between items-center text-sm text-slate-500">
          <span>Tác giả ID: {post.userId}</span>
          <span>Được fetch trực tiếp bởi App Router Dynamic Segment</span>
        </div>
      </div>
    </div>
  );
}
