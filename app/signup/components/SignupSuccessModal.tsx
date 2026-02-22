"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupSuccessModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <div className="flex flex-col gap-2 text-center sm:gap-5">
        <p className="f-gmks text-md leading-tight font-bold sm:text-2xl">
          회원가입이 완료되었습니다!
        </p>
        <p className="sm:text-md text-text-secondary">로그인 후 서비스를 이용해 보세요.</p>

        <div className="mt-7 flex justify-center gap-3 sm:mt-7.5">
          <Button varient="default" width="lg" height="md" fontSize="md" onClick={onClose}>
            로그인 바로가기
          </Button>
        </div>
      </div>
    </Modal>
  );
};
