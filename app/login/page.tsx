"use client";

import { supabase } from "@/app/_libs/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  } = useForm<AuthFormData>({
    defaultValues,
  });

  const router = useRouter();

  // サブミット時の処理
  const onSubmit = async (data: AuthFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      alert("ログインに失敗しました");
    } else {
      alert("ログインに成功しました");
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-10">
        <div>
          <AuthForm
            mode="login"
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            register={register}
            errors={errors}
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          パスワードを忘れた方は
          <Link
            href="/reset-password"
            className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-600"
          >
            こちらから
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
