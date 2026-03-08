"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import Textarea from "@/components/ui/TextArea";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { writeReview } from "@/lib/api/reviews";

interface Props {
  open: boolean;
  onClose: () => void;
  storeId: number;
  storeName: string;
  reservationId: number;
}

export default function ReviewWriteModal({
  open,
  onClose,
  storeId,
  storeName,
  reservationId,
}: Props) {
  const [content, setContent] = useState("");

  const isValid = content.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;

    const payload = {
      reservationId,
      content: content.trim(),
    };

    try {
      const res = await writeReview(storeId, payload);

      console.log("리뷰 등록 성공", res.success);

      onClose();
    } catch (error) {
      console.error("리뷰 작성 실패", error);
    }
  };

  if (!open) return null;

  return (
    <Modal onClick={onClose}>
      <div className="flex w-full max-w-130 flex-col gap-3 sm:gap-6">
        <h3 className="text-md f-gmks mb-4.25 text-center leading-tight font-bold break-keep sm:mb-8.75 md:text-2xl">
          감사리뷰 작성
        </h3>

        <div className="flex flex-col gap-2 sm:gap-5">
          <Input label="매장명" id="storeName" value={storeName} disabled />

          <label className="sm:text-md text-base">
            사장님께 쓰는 편지
            <Textarea
              className="mt-3 w-full sm:mt-6"
              name="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`진심을 담은 편지로 감사 인사를 전달해보세요!\n실명은 공개되지 않으며, 닉네임으로 전달됩니다.`}
              maxLength={500}
              showCount
            />
          </label>

          <div className="mt-5.5 flex justify-center gap-2 sm:mt-7.5 sm:gap-5">
            <Button varient="light" width="lg" height="md" fontSize="md" onClick={onClose}>
              작성 취소
            </Button>

            <Button
              varient="default"
              width="lg"
              height="md"
              fontSize="md"
              onClick={handleSubmit}
              disabled={!isValid}
            >
              전달하기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
