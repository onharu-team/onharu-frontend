import { useEffect, useState } from "react";

function useModal() {
  const [open, setOpen] = useState<boolean>(true);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDownClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDownClose);

    return () => {
      window.removeEventListener("keydown", handleKeyDownClose);
    };
  }, [open]);

  return { open, handleOpenModal, handleCloseModal };
}

export default useModal;
