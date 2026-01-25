"use client";
import { useState } from "react";

export const StoreAddress = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false);
  const copyText = address;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
      //실패 로직은 추후 toast로 알릴지 결정 부탁
    }
  };

  return (
    <div className="flex items-center gap-1">
      <p className="text-text line-clamp-1 text-xs md:text-sm">{address}</p>
      <button className="shrink-0 text-xs text-blue-600 md:text-sm" onClick={handleCopy}>
        {copied ? "복사완료" : "복사"}
      </button>
    </div>
  );
};
