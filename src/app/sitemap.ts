import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Tự động lấy domain từ file .env (.env.local ở dev, .env ở production)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Bạn có thể fetch dữ liệu động từ API hoặc Database để tạo sitemap tự động
  // Ví dụ: Lấy danh sách posts để đưa vào sitemap
  let postUrls: any[] = [];
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    if (res.ok) {
      const posts = await res.json();
      postUrls = posts.map((post: any) => ({
        url: `${baseUrl}/posts/${post.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Lỗi khi fetch sitemap posts", error);
  }

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...postUrls];
}
