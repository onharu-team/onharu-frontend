"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface FormPageLayoutProps {
  title?: ReactNode;
  children: ReactNode;
  cancelText?: string;
  submitText?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  modalOpen: boolean;
  modalMessage: string;
  onModalConfirm: () => void;
  showActions?: boolean;
}

export default function FormPageLayout({
  title,
  children,
  cancelText = "취소",
  submitText = "확인",
  onCancel = () => {},
  onSubmit = () => {},
  modalOpen,
  modalMessage,
  onModalConfirm,
  showActions = true,
}: FormPageLayoutProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-2 sm:gap-5">
      {/* 상단 안내 문구 */}
      {title && <div className="sm:text-md text-center text-sm font-medium">{title}</div>}

      {/* 폼 영역 */}
      {children}

      {/* 버튼 영역 */}
      {showActions && (
        <div className="mt-5.5 grid grid-cols-2 gap-2 sm:mt-7.5 sm:gap-5">
          <Button onClick={onCancel} varient="light" fontSize="md" width="lg" height="md">
            {cancelText}
          </Button>
          <Button
            type="submit"
            onClick={onSubmit}
            varient="default"
            fontSize="md"
            width="lg"
            height="md"
          >
            {submitText}
          </Button>
        </div>
      )}

      {/* 완료 모달 */}
      {modalOpen && modalMessage && (
        <Modal onClick={onModalConfirm}>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <p className="mb-5 text-center font-medium break-keep sm:mb-10 sm:text-lg">
              {modalMessage}
            </p>
            <Button varient="default" width="lg" height="md" fontSize="sm" onClick={onModalConfirm}>
              확인
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
