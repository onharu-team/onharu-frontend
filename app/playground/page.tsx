"use client";

import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";

export default function PlayGround() {
  const { open, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <button onClick={handleOpenModal}>modal open</button>
      {open && <Modal onClick={handleCloseModal}>취소하겠나여?</Modal>}
    </>
  );
}
