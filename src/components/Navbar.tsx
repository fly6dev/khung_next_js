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
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          NextJS Boilerplate <span className="logo-badge">App Router</span>
        </Link>
        <ul className="nav-links">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
