"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { SignupFormValues } from "@/app/signup/types";
import TermsField from "../components/fields/TermsField";
import BusinessNumberField from "../components/fields/BusinessNumberField";
import { OwnerSignupFields } from "./components/OwnerSignupFields";
import { SignupSuccessModal } from "../components/SignupSuccessModal";
import { useRouter } from "next/navigation";
import { useSignupOwner } from "@/hooks/useSignupOwner";
import { Toast } from "@/components/feature/toast/Toast";

export default function OwnerSignupForm() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate: signupMutate, isPending: isSignupPending } = useSignupOwner();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    trigger,
    clearErrors,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const onSubmit = (data: SignupFormValues) => {
    if (!isCodeSent) {
      setError("email", { type: "manual", message: "이메일 인증을 진행해주세요." });
      return;
    }

    if (!isEmailVerified) {
      setError("authCode", { type: "manual", message: "인증 확인을 완료해 주세요." });
      return;
    }

    signupMutate(
      { formData: data },
      {
        onSuccess: () => {
          setIsOpenModal(true);
        },
        onError: error => {
          if (error?.status === 409) {
            setIsEmailVerified(false);
            setIsCodeSent(false);
            clearErrors(["authCode"]);
            setError("email", { type: "manual", message: "이미 등록된 이메일입니다." });
          } else {
            Toast("error", "회원가입에 실패했습니다.", "잠시 후 다시 시도해주세요.");
          }
        },
      }
    );
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    router.push("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <OwnerSignupFields
          register={register}
          errors={errors}
          watch={watch}
          trigger={trigger}
          setError={setError}
          clearErrors={clearErrors}
          isCodeSent={isCodeSent}
          setIsCodeSent={setIsCodeSent}
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
        />

        {/* 사업자등록번호 */}
        <BusinessNumberField register={register} errors={errors} trigger={trigger} />

        {/* 이용 약관 */}
        <TermsField register={register} errors={errors} />

        <div className="mt-2.5 sm:mt-7.5">
          <Button
            type="submit"
            varient="default"
            width="lg"
            height="md"
            fontSize="md"
            disabled={isSignupPending}
          >
            회원가입
          </Button>
        </div>
      </form>

      <SignupSuccessModal isOpen={isOpenModal} onClose={handleCloseModal} />
    </div>
  );
}
