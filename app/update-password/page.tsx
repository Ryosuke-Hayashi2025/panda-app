"use client";

import { supabase } from "@/app/_libs/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PwUpdateFormData } from "../_types/PwUpdateFormData";
import { AuthInput } from "../_components/AuthInput";

export default function Page() {
  // 既定値を準備
  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  // フォームを初期化
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PwUpdateFormData>({
    defaultValues,
  });

  const router = useRouter();

  // サブミット時の処理
  const onSubmit = async (data: PwUpdateFormData) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) {
      alert("パスワード更新に失敗しました");
    } else {
      alert("パスワードの再設定が完了しました");
      reset();
      router.replace("/login");
    }
  };
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">パスワード再設定</h1>
            <p className="text-center text-xs text-gray-500 mt-2">
              新しいパスワードを設定してください
            </p>
          </div>
          <AuthInput
            label="新しいパスワード"
            type="password"
            id="password"
            placeholder="・・・・・・・・"
            register={register("password", {
              required: "パスワードは必須入力です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上にしてください",
              },
              maxLength: {
                value: 20,
                message: "パスワードは20文字以内にしてください",
              },
              pattern: {
                value: /^[ -~]+$/,
                message: "パスワードは半角文字で入力してください",
              },
            })}
            error={errors.password?.message}
          />
          <AuthInput
            label="新しいパスワード（確認）"
            type="password"
            id="confirmPassword"
            placeholder="・・・・・・・・"
            register={register("confirmPassword", {
              required: "確認用パスワードは必須入力です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上にしてください",
              },
              maxLength: {
                value: 20,
                message: "パスワードは20文字以内にしてください",
              },
              pattern: {
                value: /^[ -~]+$/,
                message: "パスワードは半角文字で入力してください",
              },
              validate: (value) =>
                value === getValues("password") || "パスワードが一致しません",
            })}
            error={errors.confirmPassword?.message}
          />
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "更新中" : "パスワードを更新する"}
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
