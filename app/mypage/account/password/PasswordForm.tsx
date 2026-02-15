"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/ui/useModal";
import FormPageLayout from "../components/FormPageLayout";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";
import { FormField } from "@/components/form-fields/FormField";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export default function PasswordFormPage() {
  const router = useRouter();
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm<PasswordFormData>();

  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data: PasswordFormData) => {
    if (data.currentPassword !== "1234") {
      setError("currentPassword", {
        type: "server",
        message: "현재 비밀번호가 일치하지 않습니다.",
      });
      return;
    }

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
      <FormField<PasswordFormData>
        name="currentPassword"
        config={FIELD_CONFIG.currentPassword}
        register={register}
        errors={errors}
      />

      {/* 비밀번호 */}
      <FormField<PasswordFormData>
        name="newPassword"
        config={FIELD_CONFIG.password}
        register={register}
        errors={errors}
      />

      {/* 비밀번호 확인 */}
      <FormField<PasswordFormData>
        name="passwordConfirm"
        config={FIELD_CONFIG.passwordConfirm(newPasswordValue)}
        register={register}
        errors={errors}
      />
    </FormPageLayout>
  );
}
