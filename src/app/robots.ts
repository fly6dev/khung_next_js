import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"], // Không cho crawlers quét thư mục API hoặc code Next.js
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
