"use client";

import Link from "next/link";
import React from "react";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { supabase } from "../_libs/supabase";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    await router.replace("/");
  };

  const { session, isLoading } = useSupabaseSession();

  return (
    <header className="bg-gray-800 text-white p-6 font-bold flex justify-between items-center">
      <Link href="/" className="hover:opacity-75 transition-opacity">
        ホーム
      </Link>
      {!isLoading && (
        <div>
          {session ? (
            <>
              <Link href="/dashboard" className="ml-4 hover:opacity-75 transition-opacity">
                管理画面
              </Link>
              <button onClick={handleLogout} className="ml-4 hover:opacity-75 transition-opacity">ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact" className="ml-4 hover:opacity-75 transition-opacity">
                お問い合わせ
              </Link>
              <Link href="/login" className="ml-4 hover:opacity-75 transition-opacity">
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
