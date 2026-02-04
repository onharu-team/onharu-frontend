"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Select, { SelectOption } from "@/components/ui/Select";
import Textarea from "@/components/ui/TextArea";

interface StoreOption {
  id: number;
  name: string;
}

interface Props {
  stores: StoreOption[];
}

export default function ReviewWriteForm({ stores }: Props) {
  const [selectedStore, setSelectedStore] = useState<number | "">("");
  const [content, setContent] = useState("");

  const isValid = selectedStore !== "" && content.trim().length > 0;

  const storeOptions: SelectOption[] = stores.map(store => ({
    label: store.name,
    value: store.id,
  }));

  const handleSubmit = () => {
    if (!isValid) return;

    const payload = {
      storeId: Number(selectedStore),
      content: content.trim(),
    };

    console.log("리뷰", payload);
  };

  return (
    <div className="mb-8 flex flex-col gap-2">
      <div className="sm:text-md text-base">매장 선택</div>

      <Select
        value={selectedStore}
        options={storeOptions}
        onChange={val => setSelectedStore(Number(val))}
        placeholder="매장을 선택해 주세요"
        className="mt-2 max-w-[320px]"
      />

      <div className="flex flex-col gap-2">
        <div className="sm:text-md text-base">사장님께 쓰는 편지</div>

        <Textarea
          className="w-full"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder={`진심을 담은 편지로 감사 인사를 전달해보세요!\n실명은 공개되지 않으며, 닉네임으로 전달됩니다.`}
          maxLength={500}
          showCount
        />
      </div>

      <div className="flex justify-center">
        <Button
          varient="default"
          width="md"
          height="md"
          fontSize="md"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          전달하기
        </Button>
      </div>
    </div>
  );
}
