import useModal from "@/hooks/ui/useModal";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type TermsDetailButtonProps = {
  title: string;
  children: React.ReactNode;
};

export default function TermsDetailButton({ title, children }: TermsDetailButtonProps) {
  const { open, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <button type="button" onClick={handleOpenModal} className="text-text-secondary text-sm">
        자세히 보기
      </button>

      {open && (
        <Modal onClick={handleCloseModal}>
          <h3
            id="modal-title"
            className="text-md f-gmks text-center leading-tight font-bold md:text-2xl"
          >
            {title}
          </h3>

          <div className="scrollbar-thin mt-3.5 mb-6.25 max-h-[60vh] overflow-y-auto rounded-[10px] border p-3 text-sm break-keep sm:mt-7 sm:mb-12.5 sm:p-6">
            {children}
          </div>

          <Button varient="default" width="lg" height="md" fontSize="md" onClick={handleCloseModal}>
            확인
          </Button>
        </Modal>
      )}
    </>
  );
}
