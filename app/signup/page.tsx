"use client";

import { supabase } from "@/app/_libs/supabase";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthFormData } from "../_types/AuthFormData";
import { AuthForm } from "@/app/_components/AuthForm";

export default function Page() {
  // 既定値を準備
  const defaultValues = {
    email: "",
    password: "",
  };
  // フォームを初期化
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormData>({
    defaultValues,
  });

  // サブミット時の処理
  const onSubmit = async (data: AuthFormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // 送信するとメールアドレスの検証メールが送られ、そのメール内に載せる登録完了ページ用のURLを指定
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      },
    });
    if (error) {
      alert("登録に失敗しました");
    } else {
      alert("入力内容を受け付けました。メールをご確認ください！");
      reset();
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-10">
        <AuthForm
          mode="signup"
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          register={register}
          errors={errors}
        />
        <p className="text-center text-sm text-gray-500 mt-6">
          すでにアカウントをお持ちの方は
          <Link
            href="/login"
            className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-600"
          >
            ログインする
          </Link>
        </p>
        <hr className="my-4 border-gray-200" />
        <p className="text-center text-sm text-gray-500">
          <Link
            href="/"
            className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-600"
          >
            ホームに戻る
          </Link>
        </p>
      </div>
    </div>
  );
}
