"use client";

import { supabase } from "@/app/_libs/supabase";
import Link from "next/link";
import { useForm, FieldErrors } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

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
  } = useForm<FormData>({
    defaultValues,
  });

  // サブミット時の処理
  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // 送信するとメールアドレスの検証メールが送られ、そのメール内に載せる登録完了ページ用のURLを指定
        // 後で本番URLに変更する必要あり
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });
    if (error) {
      alert("登録に失敗しました");
    } else {
      alert("入力内容を受け付けました。メールをご確認ください！");
      reset();
    }
  };
  const onError = (err: FieldErrors<FormData>) => {
    console.log(err);
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">アカウントを作成する</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4 w-full "
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              {...register("email", {
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
            />
            <div className="text-red-500 text-sm min-h-[20px]">
              {errors.email?.message}
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="・・・・・・・・"
              {...register("password", {
                required: "パスワードは必須入力です",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上にしてください",
                },
                maxLength: {
                  value: 20,
                  message: "パスワードは20文字以内にしてください",
                },
              })}
            />
            <div className="text-red-500 text-sm min-h-[20px]">
              {errors.password?.message}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isSubmitting}
            >
              アカウントを作成する
            </button>
          </div>
        </form>
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
