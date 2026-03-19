"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
};

export default function TagInput({ value, onChange, maxTags = 5 }: TagInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleAddTag = (tagToAdd?: string) => {
    const trimmed = (tagToAdd ?? input).trim();
    if (!trimmed) return;

    // 중복 체크 (대소문자 무시)
    if (value.some(tag => tag.toLowerCase() === trimmed.toLowerCase())) {
      setError("이미 추가된 태그입니다.");
      setInput("");
      return;
    }

    if (value.length >= maxTags) {
      setError(`태그는 최대 ${maxTags}개까지 추가할 수 있습니다.`);
      return;
    }

    onChange([...value, trimmed]);
    setInput("");
    setError("");
  };

  const handleRemoveTag = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTimeout(() => {
        handleAddTag();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex gap-2">
        <div className="flex-1">
          <Input
            label="태그"
            id="tag"
            type="text"
            value={input}
            placeholder={`태그를 입력해 주세요. (최대 ${maxTags}개)`}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            isRequired
          />
        </div>

        <div className="flex items-end">
          <Button
            varient="default"
            fontSize="md"
            width="sm"
            height="md"
            type="button"
            onClick={() => handleAddTag()}
          >
            추가
          </Button>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base"
          >
            {tag}
            <button type="button" onClick={() => handleRemoveTag(index)} className="text-red-500">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
