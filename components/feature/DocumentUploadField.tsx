"use client";

import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { RiCameraLine, RiDeleteBinLine } from "@remixicon/react";
import Image from "next/image";
import { SignupFormValues } from "@/app/signup/types";

type InitialFile = {
  name: string;
  url: string;
};

type DocumentUploadFieldProps = {
  register?: UseFormRegister<SignupFormValues>;
  errors?: FieldErrors<SignupFormValues>;
  watch?: UseFormWatch<SignupFormValues>;
  onFilesChange?: (files: File[]) => void;
  initialFiles?: InitialFile[];
};

export default function DocumentUploadField({
  register,
  errors,
  watch,
  onFilesChange,
  initialFiles = [],
}: DocumentUploadFieldProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [customError, setCustomError] = useState<string>("");
  const [existingFiles, setExistingFiles] = useState<InitialFile[]>(initialFiles);

  const MAX_NUM = 10;

  const watchedFiles = watch?.("document") || [];
  const displayFiles = watchedFiles.length
    ? Array.from(watchedFiles).slice(0, MAX_NUM)
    : [...existingFiles.map((f): InitialFile | File => f), ...files];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const totalCount = existingFiles.length + files.length + selectedFiles.length;

    let newFiles: File[];
    if (totalCount > MAX_NUM) {
      setCustomError("최대 10장까지만 업로드 가능합니다.");
      const allowed = MAX_NUM - existingFiles.length - files.length;
      newFiles = [...files, ...selectedFiles.slice(0, allowed)];
    } else {
      newFiles = [...files, ...selectedFiles];
      setCustomError("");
    }

    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    if (index < existingFiles.length) {
      // 기존 파일 삭제
      const updatedExisting = existingFiles.filter((_, i) => i !== index);
      setExistingFiles(updatedExisting);
    } else {
      // 새로 추가한 파일 삭제
      const adjustedIndex = index - existingFiles.length;
      const updatedFiles = files.filter((_, i) => i !== adjustedIndex);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    }
    setCustomError("");
  };

  return (
    <div className="flex flex-col">
      <input
        id="document"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        multiple
        className="hidden"
        {...(register ? register("document", { required: "증명서류는 필수입니다." }) : {})}
        onChange={handleFileChange}
      />

      <label
        htmlFor="document"
        className="border-border text-text-secondary flex h-22.5 w-22.5 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border bg-white px-4 py-3 text-[14px] hover:bg-gray-50"
      >
        <RiCameraLine size={30} color="rgba(117,117,117,1)" />
        업로드
      </label>

      {errors?.document && <p className="text-danger mt-1 text-sm">{errors.document.message}</p>}
      {customError && <p className="text-danger mt-1 text-sm">{customError}</p>}

      {displayFiles.length > 0 && (
        <div className="scrollbar-hide mt-2 flex flex-nowrap gap-2 overflow-x-auto">
          {displayFiles.map((file: InitialFile | File, index) => (
            <div key={index} className="relative h-25 w-25 shrink-0 rounded-[10px] border">
              {"url" in file ? (
                <Image
                  src={file.url}
                  alt={file.name}
                  width={100}
                  height={100}
                  className="h-full w-full rounded-[10px] object-cover"
                />
              ) : file.type?.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={100}
                  height={100}
                  className="h-full w-full rounded-[10px] object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-600">
                  {file.name}
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute top-1 right-1 rounded-full bg-white p-1 shadow"
              >
                <RiDeleteBinLine size={16} color="red" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
