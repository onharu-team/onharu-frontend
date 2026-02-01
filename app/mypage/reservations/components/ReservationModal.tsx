"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { CancelModalType } from "../types";

interface ReservationModalProps {
  open: boolean;
  modalType: CancelModalType;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
}

interface CancelContentProps {
  title: string;
  description: React.ReactNode;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  onConfirm: () => void;
}

function CancelContent({ title, description, reason, setReason, onConfirm }: CancelContentProps) {
  return (
    <div>
      <h3 className="mb-4 text-center text-2xl font-bold">{title}</h3>

      <Input
        label="취소 사유"
        id="cancel"
        placeholder="취소 사유를 작성해 주세요."
        isRequired
        value={reason}
        onChange={e => setReason(e.target.value)}
      />

      <div className="mt-2 mb-6 text-sm text-gray-600 sm:mb-12">{description}</div>

      <Button
        varient="default"
        width="lg"
        height="md"
        fontSize="md"
        onClick={onConfirm}
        disabled={reason.trim() === ""}
      >
        취소하기
      </Button>
    </div>
  );
}

export default function ReservationModal({
  open,
  modalType,
  onClose,
  onConfirm,
}: ReservationModalProps) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  const renderContent = () => {
    switch (modalType) {
      case "cancelChild":
        return (
          <CancelContent
            title="예약취소 하시겠어요?"
            reason={reason}
            setReason={setReason}
            onConfirm={handleConfirm}
            description={
              <>
                <p>일정 변경으로 예약 취소가 필요한 경우,</p>
                <p>사장님께 취소하는 이유를 알려주시면 도움 됩니다 :{")"}</p>
              </>
            }
          />
        );

      case "cancelOwner":
        return (
          <CancelContent
            title="예약취소(거부) 하시겠어요?"
            reason={reason}
            setReason={setReason}
            onConfirm={handleConfirm}
            description={
              <>
                <p>예약 취소(거부) 시 반드시 사유를 적어주셔야 합니다.</p>
                <p>아이들을 위해 친절하고 자세한 사유 작성 부탁드려요 :{")"}</p>
              </>
            }
          />
        );

      case "cancelNotAllowed":
        return (
          <div>
            <h3 className="mb-4 text-center text-2xl font-bold">
              <p>예약 취소는</p>
              <p>최소 하루 전까지 가능합니다.</p>
            </h3>

            <div className="mt-2 mb-6 flex flex-col items-center text-sm text-gray-600 sm:mb-12">
              <p>부득이하게 매장 이용을 하지 못하는 경우</p>
              <p>전화 연락 혹은 채팅을 통해</p>
              <p>사장님께 알려주세요! :{")"}</p>
            </div>

            <Button varient="default" width="lg" height="md" fontSize="md">
              채팅하기
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return <Modal onClick={onClose}>{renderContent()}</Modal>;
}
