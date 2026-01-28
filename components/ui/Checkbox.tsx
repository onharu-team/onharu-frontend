"use client";

import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { RiCheckLine } from "@remixicon/react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input type="checkbox" className="peer hidden" {...props} />
      <span
        className={clsx(
          "flex h-4 w-4 items-center justify-center rounded border",
          "peer-checked:bg-main peer-checked:border-main",
          "border-border bg-white",
          className
        )}
      >
        <RiCheckLine color="white" size={14} />
      </span>
      {label}
    </label>
  );
}
