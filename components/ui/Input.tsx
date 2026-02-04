"use client";

import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputType = React.HTMLInputTypeAttribute;

interface InputProps {
  label?: string;
  id: string;
  type?: InputType;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
  isRequired?: boolean;
  isVerified?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
  value,
  onChange,
}: InputProps) {
  const hasError = Boolean(error);

  const showVerified = !hasError && isVerified;

  const describedBy = hasError ? `${id}-error` : showVerified ? `${id}-verified` : undefined;

  const inputProps = register ? register : { onChange };

  return (
    <div className="relative flex w-full flex-col">
      {label && (
        <label
          htmlFor={id}
          className="text-text sm:text-md mb-1.25 text-base font-medium sm:mb-2.5"
        >
          {label} {isRequired && <span className="text-danger">*</span>}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={isRequired}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        {...inputProps}
        className={clsx(
          "border-border placeholder:text-subtle h-11.25 rounded-[10px] border px-2.5 text-sm transition-all duration-150 ease-in-out outline-none sm:text-base",
          disabled
            ? "text-text-secondary bg-[#EEEEEE]"
            : "hover:border-main focus:border-main text-text active:border-main bg-white focus:border-2"
        )}
      />

      {error && hasError && (
        <div id={`${id}-error`} className="text-danger mt-2.5 text-xs sm:text-sm">
          {error.message}
        </div>
      )}

      {showVerified && (
        <div id={`${id}-verified`} className="text-main-500 mt-2.5 text-xs sm:text-sm">
          인증 완료!
        </div>
      )}
    </div>
  );
}
