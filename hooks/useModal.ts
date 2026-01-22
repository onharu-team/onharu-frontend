import { useState } from "react";

function useModal() {
  const [open, setOpen] = useState<boolean>(true);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return { open, handleOpenModal, handleCloseModal };
}

export default useModal;
