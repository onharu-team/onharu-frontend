"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteReview } from "@/lib/api/reviews";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/ui/useModal";

interface Props {
  reviewId: number;
}

export default function DeleteReviewButton({ reviewId }: Props) {
  const router = useRouter();

  const { open, handleOpenModal, handleCloseModal } = useModal();

  const { mutate } = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      handleCloseModal();
      router.refresh();
    },
  });

  const handleConfirm = () => {
    mutate();
  };

  return (
    <>
      <Button varient="dark" width="lg" height="sm" fontSize="sm" onClick={handleOpenModal}>
        삭제
      </Button>

      {open && (
        <Modal onClick={handleCloseModal}>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <h3 className="text-md f-gmks mb-4.25 text-center leading-tight font-bold break-keep sm:mb-8.75 md:text-2xl">
              작성하신 리뷰를 삭제하시겠어요?
            </h3>

            <div className="flex w-full gap-2">
              <Button
                varient="light"
                width="lg"
                height="md"
                fontSize="sm"
                onClick={handleCloseModal}
              >
                취소
              </Button>

              <Button
                varient="default"
                width="lg"
                height="md"
                fontSize="sm"
                onClick={handleConfirm}
              >
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
