import ReactFocusLock from "react-focus-lock";
import { RiCloseLine } from "@remixicon/react";

interface ModalProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const BaseClasses =
  "-translate-x-[50%] -translate-y-[50%] border border-border fixed top-[50%] left-[50%] z-32 rounded-[12px] bg-white max-w-[calc(100vw-30px)] sm:max-w-[640px] w-full";

export const Modal = ({ children, onClick }: ModalProps) => {
  return (
    <ReactFocusLock>
      <div className="fixed inset-0 z-30 bg-black opacity-6" onClick={onClick} />
      <div className={BaseClasses} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="relative px-[50px] py-[55px]">
          <button className="absolute top-7 right-6" aria-label="모달 닫기 버튼" onClick={onClick}>
            <RiCloseLine size={30} />
          </button>
          <div>{children}</div>
        </div>
      </div>
    </ReactFocusLock>
  );
};
