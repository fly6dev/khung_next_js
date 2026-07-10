import { NextResponse } from "next/server";

export async function GET() {
  // Demo API response
  const data = {
    message: "Xin chào từ Next.js API Route!",
    timestamp: new Date().toISOString(),
    author: "NextJS Starter Boilerplate",
    features: [
      "Tích hợp sẵn trong App Router",
      "Không cần chạy server phụ độc lập",
      "Hỗ trợ Edge runtime và Serverless functions"
    ]
  };

  return NextResponse.json(data);
}
