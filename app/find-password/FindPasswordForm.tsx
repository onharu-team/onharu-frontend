"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";
import { FormField } from "@/components/form-fields/FormField";
import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/ui/useModal";
import { resetPassword } from "@/lib/api/auth";
import { Toast } from "@/components/feature/toast/Toast";
import { useRouter } from "next/navigation";

type FindPasswordFormValues = {
  name: string;
  email: string;
  phone: string;
};

export default function FindPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValues>({ mode: "onSubmit" });

  const { open, handleOpenModal, handleCloseModal } = useModal();

  const onSubmit = async (data: FindPasswordFormValues) => {
    try {
      await resetPassword({
        name: data.name,
        loginId: data.email,
        phone: data.phone,
      });

      handleOpenModal();
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "status" in e) {
        const error = e as { status: number; message?: string };

        if (error?.status === 404) {
          // 가입된 정보가 없을 때
          Toast("error", "가입된 정보가 없습니다.", "이름, 이메일, 번호를 다시 확인해주세요.");
        } else {
          Toast("error", "비밀번호 찾기에 실패했습니다.", "잠시 후 다시 시도해주세요.");
        }
      }
    }
  };

  const handleConfirm = () => {
    handleCloseModal();
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 이름 */}
      <FormField<FindPasswordFormValues>
        name="name"
        config={FIELD_CONFIG.name}
        register={register}
        errors={errors}
      />

      {/* 이메일 */}
      <FormField<FindPasswordFormValues>
        name="email"
        config={FIELD_CONFIG.email}
        register={register}
        errors={errors}
      />

      {/* 연락처  */}
      <FormField<FindPasswordFormValues>
        name="phone"
        config={FIELD_CONFIG.phone}
        register={register}
        errors={errors}
      />

      <div className="mt-2.5 sm:mt-7.5">
        <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
          비밀번호 찾기
        </Button>
      </div>

      {open && (
        <Modal onClick={handleCloseModal}>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <h3 className="text-md f-gmks mb-4.25 text-center leading-tight font-bold sm:mb-8.75 md:text-2xl">
              임시 비밀번호가 발급되었습니다.
            </h3>
            <p className="mb-5 text-center font-medium break-keep sm:mb-10 sm:text-lg">
              이메일에서 확인 후 로그인해주세요.
            </p>
            <Button varient="default" width="lg" height="md" fontSize="md" onClick={handleConfirm}>
              확인
            </Button>
          </div>
        </Modal>
      )}
    </form>
  );
}
