import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS + TailwindCSS Starter Boilerplate | Khung Dự Án Mẫu",
  description: "Khung dự án NextJS App Router và TailwindCSS chuẩn dành cho lập trình viên React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 pt-24 pb-12 flex flex-col">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
