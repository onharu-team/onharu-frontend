"use client";

import { Button } from "@/components/ui/Button";
import { CancelModalType } from "../types";
import useModal from "@/hooks/ui/useModal";
import ReservationModal from "./ReservationModal";
import { useState } from "react";
import { UserRole } from "@/lib/api/types/auth";
import { ReservationStatus } from "@/lib/api/types/reservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { childReservationCancel } from "@/lib/api/childrens";
import { changeOwnerReservationStatus } from "@/lib/api/owners";
import { Toast } from "@/components/feature/toast/Toast";
import ReviewWriteModal from "./ReviewWriteModal";

interface Props {
  role: UserRole;
  status: ReservationStatus;
  reservationId: number;
  reservationDate: string;
  storeName: string;
  storeId: number;
}

// 취소 가능 여부 계산
function getCancelModalType(
  role: "CHILD" | "OWNER",
  reservationAt: string
): "cancelChild" | "cancelOwner" | "cancelNotAllowed" {
  if (role === "CHILD") {
    const resDate = new Date(reservationAt);
    const diff = resDate.getTime() - Date.now();
    return diff < 24 * 60 * 60 * 1000 ? "cancelNotAllowed" : "cancelChild";
  }

  return "cancelOwner";
}

const ACTION_TOAST: Partial<Record<ReservationStatus, { title: string; description: string }>> = {
  CONFIRMED: {
    title: "예약 확정",
    description: "예약이 확정되었습니다.",
  },
  COMPLETED: {
    title: "나눔 완료",
    description: "나눔이 완료 처리되었습니다.",
  },
  CANCELED: {
    title: "예약 취소",
    description: "예약이 취소되었습니다.",
  },
};

export default function ReservationActionButtons({
  role,
  status,
  reservationId,
  reservationDate,
  storeName,
  storeId,
}: Props) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [modalType, setModalType] = useState<CancelModalType>();

  const { open, handleOpenModal, handleCloseModal } = useModal();

  const queryClient = useQueryClient();

  const isChild = role === "CHILD";
  const isOwner = role === "OWNER";

  const isWaiting = status === "WAITING";
  const isConfirmed = status === "CONFIRMED";
  const isCompleted = status === "COMPLETED";

  // mutations
  const cancelChildMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      childReservationCancel(id, reason),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => changeOwnerReservationStatus(id, "approve"),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      changeOwnerReservationStatus(id, "cancel", { cancelReason: reason }),
  });

  const completeMutation = useMutation({
    mutationFn: (id: string) => changeOwnerReservationStatus(id, "complete"),
  });

  // 예약 상태 업데이트
  const updateReservationStatus = async (newStatus: ReservationStatus, reason?: string) => {
    try {
      const id = String(reservationId);

      // 아동
      if (isChild && newStatus === "CANCELED" && reason) {
        await cancelChildMutation.mutateAsync({ id, reason });
      }

      // 가게
      if (isOwner) {
        if (newStatus === "CONFIRMED") {
          await approveMutation.mutateAsync(id);
        }

        if (newStatus === "CANCELED" && reason) {
          await rejectMutation.mutateAsync({ id, reason });
        }

        if (newStatus === "COMPLETED") {
          await completeMutation.mutateAsync(id);
        }
      }

      const toast = ACTION_TOAST[newStatus];

      if (toast) {
        Toast("info", toast.title, toast.description);
      }

      await queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });

      handleCloseModal();
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

  const handleImmediateAction = (type: "CONFIRMED" | "COMPLETED") => {
    updateReservationStatus(type);
  };

  return (
    <>
      {isChild && isCompleted && (
        <Button
          varient="default"
          width="lg"
          height="sm"
          fontSize="sm"
          onClick={() => setReviewOpen(true)}
        >
          감사 리뷰 작성
        </Button>
      )}
      
      <ReviewWriteModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        storeId={storeId}
        storeName={storeName}
        reservationId={reservationId}
      />

      {isChild && (isConfirmed || isWaiting) && (
        <Button varient="dark" width="lg" height="sm" fontSize="sm" onClick={handleCancelClick}>
          예약 취소
        </Button>
      )}

      {isOwner && isConfirmed && (
        <>
          <Button
            varient="default"
            width="lg"
            height="sm"
            fontSize="sm"
            onClick={() => handleImmediateAction("COMPLETED")}
          >
            나눔 완료
          </Button>

          <Button varient="dark" width="lg" height="sm" fontSize="sm" onClick={handleCancelClick}>
            예약 취소
          </Button>
        </>
      )}

      {isOwner && isWaiting && (
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
