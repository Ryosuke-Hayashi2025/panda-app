"use client";

import { supabase } from "@/app/_libs/supabase";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { PwResetFormData } from "../_types/PwResetFormData";
import { AuthInput } from "../_components/AuthInput";

export default function Page() {
  // 既定値を準備
  const defaultValues = {
    email: "",
  };

  // フォームを初期化
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PwResetFormData>({
    defaultValues,
  });

  // サブミット時の処理
  const onSubmit = async (data: PwResetFormData) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/update-password`,
    });
    if (error) {
      alert("送信に失敗しました");
    } else {
      alert("パスワード再設定用のメールを送信しました。メールをご確認ください！");
      reset();
    }
  };
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full ">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">パスワード再設定</h1>
            <p className="text-center text-xs text-gray-500 mt-2">
              登録メールアドレスに再設定用のリンクを送信します
            </p>
          </div>
          <AuthInput
            label="メールアドレス"
            type="email"
            id="email"
            placeholder="name@company.com"
            disabled={isSubmitting}
            register={register("email", {
              required: "メールアドレスは必須入力です",
              maxLength: {
                value: 50,
                message: "メールアドレスは50文字以内にしてください",
              },
              pattern: {
                value: /^[\w\-.]+@[\w\-.]+\.[a-zA-Z]{2,}$/,
                message: "メールアドレスの形式が不正です",
              },
            })}
            error={errors.email?.message}
          />
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中" : "メールを送信する"}
          </button>
          <p className="text-center text-sm text-gray-500">
            <Link
              href="/login"
              className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-600"
            >
              ログインに戻る
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
