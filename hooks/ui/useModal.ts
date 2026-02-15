import { useEffect, useState } from "react";

function useModal() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handlePopState = () => {
    handleCloseModal();
  };

  const handleKeyDownClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDownClose);
    window.history.pushState({ modal: true }, "");
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleKeyDownClose);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  return { open, handleOpenModal, handleCloseModal };
}

export default useModal;
