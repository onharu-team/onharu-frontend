"use client";

import { Button } from "@/components/ui/Button";
import { RiArrowLeftSLine } from "@remixicon/react";
import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/ui/useModal";
import { leaveChatRoom } from "@/lib/api/chat";
import { useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/components/feature/toast/Toast";

interface Props {
  chatRoomId: number;
  sender: string;
  onBack: () => void;
  onClose?: () => void;
}

export function ChatHeader({ chatRoomId, sender, onBack, onClose }: Props) {
  const { open, handleOpenModal, handleCloseModal } = useModal();
  const queryClient = useQueryClient();

  const handleConfirmDelete = async () => {
    try {
      await leaveChatRoom(chatRoomId);

      await queryClient.invalidateQueries({
        queryKey: ["chatList"],
      });

      onClose?.();

      handleCloseModal();
    } catch (err) {
      console.error("채팅방 나가기 실패:", err);
      Toast("error", "채팅방 나가기에 실패했습니다.", "잠시후에 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="border-border flex items-center justify-between border-b p-3.75 sm:p-7.5">
        <div className="flex items-center gap-2">
          <RiArrowLeftSLine size={30} onClick={onBack} className="cursor-pointer" />
          <div className="text-md font-semibold sm:text-xl">{sender}</div>
        </div>

        <Button varient="default" width="sm" height="sm" fontSize="sm" onClick={handleOpenModal}>
          나가기
        </Button>
      </div>

      {open && (
        <Modal onClick={handleCloseModal}>
          <div className="flex flex-col gap-2 text-center sm:gap-5">
            <p className="f-gmks text-md leading-tight font-bold sm:text-2xl">
              채팅방을 나가시겠습니까?
            </p>
            <p className="sm:text-md text-text-secondary">나가시면 대화 내용이 모두 삭제됩니다.</p>

            <div className="mt-7 flex justify-center gap-3 sm:mt-7.5">
              <Button
                varient="light"
                width="lg"
                height="md"
                fontSize="md"
                onClick={handleCloseModal}
              >
                취소
              </Button>
              <Button
                varient="default"
                width="lg"
                height="md"
                fontSize="md"
                onClick={handleConfirmDelete}
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
