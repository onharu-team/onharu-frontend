"use client";

import { SignupFormValues } from "@/app/signup/types";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import DocumentUploadField from "@/components/feature/DocumentUploadField";

interface Props {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
  onFilesChange: (files: File[]) => void;
}

export const DocumentUploadSection = ({ register, errors, watch, onFilesChange }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="sm:text-md mb-1.25 text-base font-medium sm:mb-2.5">
        증명서류 <span className="text-danger ml-1">*</span>
      </div>
      <DocumentUploadField
        register={register}
        errors={errors}
        watch={watch}
        onFilesChange={onFilesChange}
        maxNum={1}
      />
    </div>
  );
};
