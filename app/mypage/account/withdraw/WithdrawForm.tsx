"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import useModal from "@/hooks/ui/useModal";
import FormPageLayout from "../components/FormPageLayout";
import { useState } from "react";
import { RiAlertFill } from "@remixicon/react";
import { useValidatePassword } from "@/hooks/useValidatePw";
import { useWithdraw } from "@/hooks/useWithdraw";
import { useLogout } from "@/hooks/useLogout";
import { useAuthProfile } from "@/hooks/useAuth";

interface PasswordConfirmForm {
  password: string;
}

export default function WithdrawFormPage() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const { data: profileData } = useAuthProfile();
  const { mutate: validatePassword } = useValidatePassword();
  const { mutate: withdraw } = useWithdraw();
  const { mutate: logout } = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordConfirmForm>();

  const handleModalConfirm = () => {
    handleCloseModal();
    reset();
    logout();
    router.push("/");
  };

  const onSubmitPassword = (data: PasswordConfirmForm) => {
    setServerError("");

    validatePassword(
      { password: data.password },
      {
        onSuccess: () => {
          handleWithdrawConfirm();
        },
        onError: () => {
          setServerError("비밀번호가 일치하지 않습니다.");
        },
      }
    );
  };

  const handleWithdrawConfirm = () => {
    withdraw(undefined, {
      onSuccess: () => {
        handleOpenModal();
      },
      onError: () => {
        setServerError("탈퇴 처리 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <FormPageLayout
      title={
        <div className="flex flex-col items-center">
          <RiAlertFill size={48} color="rgba(220,31,31,1)" />
          <p>회원 탈퇴 시 계정 정보는 삭제되어</p>
          <p>복구가 불가능합니다.</p>
        </div>
      }
      onCancel={() => router.push("/mypage")}
      onSubmit={handleSubmit(onSubmitPassword)}
      modalOpen={open}
      modalMessage="회원탈퇴가 완료되었습니다."
      onModalConfirm={handleModalConfirm}
    >
      <Input label="이메일" id="email" placeholder={profileData?.loginId} disabled />

      <Input
        label="비밀번호"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        isRequired
        register={register("password", { required: "비밀번호는 필수입니다." })}
        error={
          errors.password || (serverError ? { type: "server", message: serverError } : undefined)
        }
      />
    </FormPageLayout>
  );
}
