"use client";

import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputType = React.HTMLInputTypeAttribute;

type InputProps = {
  label: string;
  id: string;
  type?: InputType;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  maxWidth?: string;
  disabled?: boolean;
  isRequired?: boolean;
  isVerified?: boolean;
};

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
  isRequired = false,
  isVerified = false,
}: InputProps) {
  return (
    <div className="relative flex w-full flex-col text-base">
      <label htmlFor={id} className="text-text mb-1.25 font-medium">
        {label} {isRequired && <span className="text-danger">*</span>}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...(register ?? {})}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : isVerified ? `${id}-verified` : undefined}
        required={isRequired}
        className={clsx(
          "border-border placeholder:text-subtle h-11.25 rounded-[10px] border px-2.5 transition-all duration-150 ease-in-out outline-none",
          disabled
            ? "text-text-secondary bg-[#EEEEEE]"
            : "hover:border-main focus:border-main text-text active:border-main focus:border-2"
        )}
      />

      {error && (
        <div id={`${id}-error`} className="text-danger mt-2.5 text-sm">
          {error.message}
        </div>
      )}

      {!error && isVerified && (
        <div id={`${id}-verified`} className="text-main-500 mt-2.5 text-sm">
          인증 완료!
        </div>
      )}
    </div>
  );
}
