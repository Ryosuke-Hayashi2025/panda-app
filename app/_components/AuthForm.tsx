// サインアップ画面とログイン画面の共通フォーム

import React from "react";
import { AuthInput } from "./AuthInput";
import { AuthFormData } from "../_types/AuthFormData";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  mode: "signup" | "login";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  register: UseFormRegister<AuthFormData>;
  errors: FieldErrors<AuthFormData>;
};

export const AuthForm: React.FC<Props> = ({
  mode,
  onSubmit,
  isSubmitting,
  register,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full ">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          {mode === "signup" ? "アカウントを作成する" : "ログインする"}
        </h1>
      </div>
      <AuthInput
        label="メールアドレス"
        type="email"
        id="email"
        placeholder="name@company.com"
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
      <AuthInput
        label="パスワード"
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
        })}
        error={errors.password?.message}
      />
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isSubmitting}
      >
        {mode === "signup"
          ? isSubmitting
            ? "作成中"
            : "アカウントを作成する"
          : isSubmitting
            ? "ログイン中"
            : "ログイン"}
      </button>
    </form>
  );
};
