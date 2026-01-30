"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import useModal from "@/hooks/useModal";
import FormPageLayout from "../components/FormPageLayout";
import { useState } from "react";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export default function PasswordFormPage() {
  const [serverError, setServerError] = useState("");

  const router = useRouter();
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>();

  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data: PasswordFormData) => {
    setServerError("");

    if (data.currentPassword !== "1234") {
      setServerError("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 새 비밀번호 저장

    handleOpenModal();

    reset({
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    });
  };

  return (
    <FormPageLayout
      title={
        <>
          <p>개인정보 보호를 위해 비밀번호를 변경하고</p>
          <p>계정을 안전하게 관리해 주세요.</p>
        </>
      }
      onCancel={() => router.push("/mypage")}
      onSubmit={handleSubmit(onSubmit)}
      modalOpen={open}
      modalMessage="비밀번호가 성공적으로 수정되었습니다."
      onModalConfirm={handleCloseModal}
    >
      <Input
        label="현재 비밀번호"
        id="currentPassword"
        type="password"
        placeholder="현재 비밀번호를 입력해 주세요."
        isRequired
        register={register("currentPassword", {
          required: "현재 비밀번호는 필수입니다.",
        })}
        error={
          errors.currentPassword ||
          (serverError ? { type: "server", message: serverError } : undefined)
        }
      />

      <Input
        label="변경 비밀번호"
        id="newPassword"
        type="password"
        placeholder="새 비밀번호를 입력해 주세요."
        isRequired
        register={register("newPassword", {
          required: "새 비밀번호는 필수입니다.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message: "대,소문자 포함 8자 이상 입력해주세요.",
          },
        })}
        error={errors.newPassword}
      />

      <Input
        label="변경 비밀번호 재확인"
        id="passwordConfirm"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해 주세요."
        isRequired
        register={register("passwordConfirm", {
          required: "비밀번호 확인은 필수입니다.",
          validate: value => value === newPasswordValue || "비밀번호가 일치하지 않습니다.",
        })}
        error={errors.passwordConfirm}
      />
    </FormPageLayout>
  );
}
