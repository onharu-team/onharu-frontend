"use client";

import { Button } from "@/components/ui/Button";
import { CancelModalType, ReservationStatus } from "../types";
import useModal from "@/hooks/ui/useModal";
import ReservationModal from "./ReservationModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  role: "child" | "owner";
  status: ReservationStatus;
  reservationId: number;
  reservationDate: string;
}

// 취소 가능 여부 계산
function getCancelModalType(
  role: "child" | "owner",
  reservationDate: string
): "cancelChild" | "cancelOwner" | "cancelNotAllowed" {
  if (role === "child") {
    const today = new Date();
    const parts = reservationDate.match(/(\d+)년 (\d+)월 (\d+)일/);
    if (!parts) return "cancelNotAllowed";

    const resDate = new Date(
      parseInt(parts[1], 10),
      parseInt(parts[2], 10) - 1,
      parseInt(parts[3], 10)
    );

    const diff = resDate.getTime() - today.getTime();
    return diff < 24 * 60 * 60 * 1000 ? "cancelNotAllowed" : "cancelChild";
  }

  return "cancelOwner";
}

export default function ReservationActionButtons({
  role,
  status,
  reservationId,
  reservationDate,
}: Props) {
  const [modalType, setModalType] = useState<CancelModalType>();

  const router = useRouter();

  const { open, handleOpenModal, handleCloseModal } = useModal();

  // 예약 상태 업데이트
  const updateReservationStatus = async (newStatus: ReservationStatus, reason?: string) => {
    try {
      console.log(reservationId, newStatus, reason);

      handleCloseModal();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setModalType(getCancelModalType(role, reservationDate));
    handleOpenModal();
  };

  const handleConfirmClick = (reason?: string) => {
    if (modalType === "cancelChild" || modalType === "cancelOwner") {
      updateReservationStatus("CANCELED", reason);
    }
  };

  const handleImmediateAction = (type: "CONFIRMED" | "SHARE_DONE") => {
    updateReservationStatus(type);
  };

  return (
    <>
      {role === "child" && status === "COMPLETED" && (
        <Button
          varient="default"
          width="lg"
          height="sm"
          fontSize="sm"
          onClick={() => router.push("/mypage/activity/reviews")}
        >
          감사 리뷰 작성
        </Button>
      )}

      {role === "child" && (status === "CONFIRMED" || status === "PENDING") && (
        <Button varient="dark" width="lg" height="sm" fontSize="sm" onClick={handleCancelClick}>
          예약 취소
        </Button>
      )}

      {role === "owner" && status === "CONFIRMED" && (
        <>
          <Button
            varient="default"
            width="lg"
            height="sm"
            fontSize="sm"
            onClick={() => handleImmediateAction("SHARE_DONE")}
          >
            나눔 완료
          </Button>
          <Button varient="dark" width="lg" height="sm" fontSize="sm" onClick={handleCancelClick}>
            예약 취소
          </Button>
        </>
      )}

      {role === "owner" && status === "PENDING" && (
        <>
          <Button
            varient="default"
            width="lg"
            height="sm"
            fontSize="sm"
            onClick={() => handleImmediateAction("CONFIRMED")}
          >
            예약 확정
          </Button>
          <Button varient="dark" width="lg" height="sm" fontSize="sm" onClick={handleCancelClick}>
            예약 취소
          </Button>
        </>
      )}

      {modalType && (
        <ReservationModal
          open={open}
          modalType={modalType}
          onClose={handleCloseModal}
          onConfirm={handleConfirmClick}
        />
      )}
    </>
  );
}
