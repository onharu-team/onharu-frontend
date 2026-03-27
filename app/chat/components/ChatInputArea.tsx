"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/Button";
// import { RiImageFill } from "@remixicon/react";
import { ImagePreview } from "./ImagePreview";
import { Toast } from "@/components/feature/toast/Toast";

interface ChatInputAreaProps {
  onSendMessage: (content: string) => void;
  isConnected: boolean;
}

export function ChatInputArea({ onSendMessage, isConnected }: ChatInputAreaProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // preview URL 생성
  const previewUrl = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSend = () => {
    if (!message.trim() || !isConnected) return;

    try {
      onSendMessage(message);

      setMessage("");

      setImageFile(null);
    } catch (err) {
      console.error("메시지 전송 실패:", err);
      Toast("error", "메시지 전송 실패", "잠시후에 다시 시도해주세요.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.nativeEvent.isComposing) return;

      e.preventDefault();
      handleSend();
    }
  };

  // 임시 URL을 해제하여 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="border-border px-wrapper flex flex-col justify-between gap-1.75 border-t bg-white py-1.25 sm:gap-3.75 sm:px-7.5 sm:py-2.5">
      {!imageFile ? (
        <textarea
          name="message"
          id="message"
          placeholder="메세지를 입력해 주세요."
          className="h-20 resize-none outline-none disabled:bg-gray-50"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isConnected} 
        />
      ) : (
        <ImagePreview previewUrl={previewUrl!} onRemove={() => setImageFile(null)} />
      )}

      <div className="flex items-center justify-end">
        {/* <label htmlFor="chat-image-upload">
          <div className="bg-border flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md">
            <RiImageFill className="text-main" size={24} />
          </div>
        </label> */}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="chat-image-upload"
          onChange={handleImageChange}
          // disabled={!isConnected}
        />

        <Button
          varient="default"
          width="sm"
          height="sm"
          fontSize="sm"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          전송
        </Button>
      </div>
    </div>
  );
}
