import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://khung-next-js.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"], // Không cho crawlers quét thư mục API hoặc code Next.js
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
