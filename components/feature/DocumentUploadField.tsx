import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { RiCameraLine } from "@remixicon/react";
import { SignupFormValues } from "@/app/signup/data/signup";

type DocumentUploadFieldProps = {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
};

export default function DocumentUploadField({ register, errors, watch }: DocumentUploadFieldProps) {
  const selectedFile = watch("document")?.[0];

  return (
    <div className="flex flex-col">
      <label className="text-text mb-1.25 font-medium">
        증명서류<span className="text-danger ml-1">*</span>
      </label>

      <input
        id="document"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        {...register("document", {
          required: "증명서류는 필수입니다.",
        })}
      />

      <label
        htmlFor="document"
        className="border-border text-text-secondary flex h-22.5 w-22.5 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border bg-white px-4 py-3 text-[14px] hover:bg-gray-50"
      >
        <RiCameraLine size={30} color="rgba(117,117,117,1)" />
        업로드
      </label>

      {errors.document && <p className="text-danger mt-1 text-sm">{errors.document.message}</p>}

      {selectedFile && (
        <p className="mt-2 text-sm text-gray-500">선택된 파일: {selectedFile.name}</p>
      )}
    </div>
  );
}
