"use client";

import { SignupFormValues } from "@/app/signup/types";
import { FieldErrors } from "react-hook-form";
import DocumentUploadField, { DisplayFile } from "@/components/feature/DocumentUploadField";

interface Props {
  errors: FieldErrors<SignupFormValues>;
  onFilesChange: (files: DisplayFile[]) => void;
}

export const DocumentUploadSection = ({ errors, onFilesChange }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="sm:text-md mb-1.25 text-base font-medium sm:mb-2.5">
        증명서류 <span className="text-danger ml-1">*</span>
      </div>

      <DocumentUploadField
        onFilesChange={onFilesChange}
        error={errors.document?.message}
        maxNum={1}
      />
    </div>
  );
};
