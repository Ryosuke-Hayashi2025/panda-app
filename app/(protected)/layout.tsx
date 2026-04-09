"use client";

import { useRouteGuard } from "../_hooks/useRouteGuard";
import { ReactNode } from "react";
import { SidebarLink } from "./_components/SidebarLink";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  useRouteGuard();

  return (
    <>
      {/* サイドバー */}
      <aside className="fixed bg-gray-100 w-70 left-0 bottom-0 top-18">
        <SidebarLink href="/dashboard" label="配当金" />
        <SidebarLink href="/stocks" label="保有銘柄" />
        <SidebarLink href="/members" label="メンバー" />
        <SidebarLink href="/histories" label="過去実績" />
      </aside>
      {/* メインエリア */}
      <div className="ml-70 p-4">{children}</div>
    </>
  );
}
