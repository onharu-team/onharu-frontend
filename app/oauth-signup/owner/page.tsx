"use client";

import BusinessNumberField from "@/app/signup/components/fields/BusinessNumberField";
import { SignupFormValues } from "@/app/signup/types";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";
import { FormField } from "@/components/form-fields/FormField";
import FormLayout from "@/components/layout/FormLayout";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupKakaoOwner } from "@/lib/api/auth";
import { SignupSuccessModal } from "@/app/signup/components/SignupSuccessModal";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/feature/toast/Toast";

export default function OauthOwnerSignupPage() {
  const [isBusinessVerified, setIsBusinessVerified] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    getValues,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  // 회원가입 처리
  const handleSignup = async (data: SignupFormValues) => {
    if (!isBusinessVerified) {
      setError("businessNumber", {
        type: "manual",
        message: "사업자번호 인증을 진행해주세요.",
      });
      return;
    }

    try {
      const response = await signupKakaoOwner({
        name: data.storeName!,
        businessNumber: data.businessNumber!,
      });

      if (response.success) {
        setIsOpenModal(true);
      } else {
        console.error("회원가입 실패:", response.message);
        Toast(
          "error",
          "회원가입에 실패했습니다.",
          response.message || "잠시 후 다시 시도해주세요."
        );
      }
    } catch (err) {
      console.error("회원가입 에러:", err);
      Toast("error", "회원가입에 실패했습니다.", "잠시 후 다시 시도해주세요.");
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    router.push("/login");
  };

  return (
    <div className="wrapper flex min-h-screen items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="매장 회원가입">
          <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-5">
            {/* 매장명 */}
            <FormField<SignupFormValues>
              name="storeName"
              config={FIELD_CONFIG.storeName}
              register={register}
              errors={errors}
            />

            {/* 사업자등록번호 */}
            <BusinessNumberField
              register={register}
              errors={errors}
              trigger={trigger}
              setError={setError}
              getValues={getValues}
              isBusinessVerified={isBusinessVerified}
              setIsBusinessVerified={setIsBusinessVerified}
            />

            {/* 회원가입 버튼 */}
            <div className="mt-2.5 sm:mt-7.5">
              <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
                회원가입
              </Button>
            </div>
          </form>

          {/* 성공 모달 */}
          <SignupSuccessModal isOpen={isOpenModal} onClose={handleCloseModal} />
        </FormLayout>
      </div>
    </div>
  );
}
