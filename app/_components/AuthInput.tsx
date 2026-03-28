// サインアップ画面とログイン画面の共通input

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
};

export const AuthInput: React.FC<Props> = ({
  label,
  type,
  id,
  placeholder,
  register,
  error,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        {...register}
      />
      <div className="text-red-500 text-sm min-h-[20px]">{error}</div>
    </div>
  );
};
