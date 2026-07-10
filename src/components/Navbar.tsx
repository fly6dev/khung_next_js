"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Posts (Server Fetch)", href: "/posts" },
    { name: "Dashboard (Client Form)", href: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
          NextJS Boilerplate <span className="text-xs px-2 py-0.5 rounded bg-indigo-600 text-white font-semibold">App Router</span>
        </Link>
        <ul className="flex gap-6 list-none">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-medium text-sm transition-colors relative py-2 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
