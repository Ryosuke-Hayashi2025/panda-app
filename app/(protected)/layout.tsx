"use client";

import Link from "next/link";
import { useRouteGuard } from "../_hooks/useRouteGuard";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Header } from "../_components/Header";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  useRouteGuard();

  const pathname = usePathname();
  const isSelected = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <>
      {/* ヘッダー */}
      <Header />
      {/* サイドバー */}
      <aside className="fixed bg-gray-100 w-70 left-0 bottom-0 top-18">
        <Link
          href="/dashboard"
          className={`p-4 block hover:bg-blue-100 ${
            isSelected("/dashboard") && "bg-blue-100"
          }`}
        >
          配当金
        </Link>
        <Link
          href="/stocks"
          className={`p-4 block hover:bg-blue-100 ${
            isSelected("/stocks") && "bg-blue-100"
          }`}
        >
          保有銘柄
        </Link>
        <Link
          href="/members"
          className={`p-4 block hover:bg-blue-100 ${
            isSelected("/members") && "bg-blue-100"
          }`}
        >
          メンバー
        </Link>
        <Link
          href="/histories"
          className={`p-4 block hover:bg-blue-100 ${
            isSelected("/histories") && "bg-blue-100"
          }`}
        >
          過去実績
        </Link>
      </aside>
      {/* メインエリア */}
      <div className="ml-70 p-4">{children}</div>
    </>
  );
}
