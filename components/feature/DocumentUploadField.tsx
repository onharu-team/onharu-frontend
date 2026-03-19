"use client";

import { useEffect, useState } from "react";
import { RiCameraLine, RiDeleteBinLine } from "@remixicon/react";
import Image from "next/image";

export type DisplayFile = {
  id?: string | number;
  name: string;
  url: string;
  file?: File;
  isExisting: boolean;
};

type DocumentUploadFieldProps = {
  onFilesChange: (files: DisplayFile[]) => void;
  initialFiles?: { id?: string | number; name?: string; url: string }[];
  maxNum?: number;
  error?: string;
};

// 초기 데이터 변환
const convertInitialFiles = (
  files: { id?: string | number; name?: string; url: string }[]
): DisplayFile[] =>
  files.map(f => ({
    ...f,
    name: f.name || "existing-file",
    isExisting: true,
  }));

// 신규 파일 생성
const createDisplayFile = (file: File): DisplayFile => {
  const trimmedName = file.name.replace(/\s+/g, "");

  return {
    name: trimmedName,
    url: URL.createObjectURL(file),
    file: new File([file], trimmedName, { type: file.type }),
    isExisting: false,
  };
};

export default function DocumentUploadField({
  onFilesChange,
  initialFiles = [],
  maxNum = 10,
  error,
}: DocumentUploadFieldProps) {
  const [allFiles, setAllFiles] = useState<DisplayFile[]>(() => convertInitialFiles(initialFiles));

  const [internalError, setInternalError] = useState("");

  // 파일 추가
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files).map(createDisplayFile);

    setAllFiles(prev => {
      const totalCount = prev.length + selectedFiles.length;

      if (totalCount > maxNum) {
        setInternalError(`최대 ${maxNum}장까지만 업로드 가능합니다.`);

        const allowedCount = maxNum - prev.length;
        if (allowedCount <= 0) return prev;

        return [...prev, ...selectedFiles.slice(0, allowedCount)];
      }

      setInternalError("");
      return [...prev, ...selectedFiles];
    });

    e.target.value = "";
  };

  // 파일 삭제
  const handleRemoveFile = (index: number) => {
    setAllFiles(prev => {
      const target = prev[index];

      if (!target.isExisting) {
        URL.revokeObjectURL(target.url);
      }

      return prev.filter((_, i) => i !== index);
    });

    setInternalError("");
  };

  // 부모에 변경 전달
  useEffect(() => {
    onFilesChange(allFiles);
  }, [allFiles, onFilesChange]);

  // 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      allFiles.forEach(file => {
        if (!file.isExisting) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [allFiles]);

  const displayError = error || internalError;

  return (
    <div className="flex flex-col">
      <input
        id="document-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <label
        htmlFor="document-upload"
        className="border-border text-text-secondary flex h-22.5 w-22.5 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border bg-white px-4 py-3 text-[14px] transition-colors hover:bg-gray-50"
      >
        <RiCameraLine size={30} color="rgba(117,117,117,1)" />
        <span className="mt-1">업로드</span>
        <span className="text-[10px] opacity-60">
          ({allFiles.length}/{maxNum})
        </span>
      </label>

      {displayError && <p className="mt-1 text-sm text-red-500">{displayError}</p>}

      <div className="scrollbar-hide mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-2">
        {allFiles.map((file, index) => (
          <div
            key={`${file.isExisting ? "old" : "new"}-${file.name}-${index}`}
            className="relative h-25 w-25 shrink-0 rounded-[10px] border bg-gray-50"
          >
            <Image
              src={file.url}
              alt={file.name}
              fill
              sizes="100px"
              className="rounded-[10px] object-cover"
            />

            <button
              type="button"
              onClick={() => handleRemoveFile(index)}
              className="absolute top-1 right-1 rounded-full bg-white/80 p-1 shadow-sm transition-colors hover:bg-white"
              title="삭제"
            >
              <RiDeleteBinLine size={16} color="red" />
            </button>

            <div className="absolute bottom-1 left-1 rounded-md bg-black/50 px-1.5 text-[10px] text-white">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
