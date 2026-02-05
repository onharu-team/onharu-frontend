import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RiCheckLine } from "@remixicon/react";
import clsx from "clsx";
import TermsDetailButton from "./TermsDetailButton";
import { SignupFormValues } from "@/app/signup/types";

type TermsItemProps = {
  name: keyof Pick<SignupFormValues, "agreeTerms" | "agreePrivacy">;
  label: string;
  detailTitle: string;
  detailContent: React.ReactNode;
  error?: FieldErrors<SignupFormValues>[keyof Pick<
    SignupFormValues,
    "agreeTerms" | "agreePrivacy"
  >];
  register: UseFormRegister<SignupFormValues>;
};

export default function TermsItem({
  name,
  label,
  detailTitle,
  detailContent,
  error,
  register,
}: TermsItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="flex flex-1 cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...register(name, { required: `${detailTitle}에 동의해야 합니다.` })}
            className="peer hidden"
          />
          <span
            className={clsx(
              "flex h-4 w-4 items-center justify-center rounded border",
              "peer-checked:bg-main peer-checked:border-main",
              "border-[#E0E0E0] bg-white"
            )}
          >
            <RiCheckLine color="rgba(255,255,255,1)" size={14} />
          </span>
          {label}
        </label>

        <div className="shrink-0">
          <TermsDetailButton title={detailTitle}>{detailContent}</TermsDetailButton>
        </div>
      </div>

      {error && <p className="text-danger text-sm">{error.message}</p>}
    </div>
  );
}
