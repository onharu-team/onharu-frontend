"use client";

import { SignupSuccessModal } from "@/app/signup/components/SignupSuccessModal";
import { SignupFormValues } from "@/app/signup/types";
import DocumentUploadField from "@/components/feature/DocumentUploadField";
import { Toast } from "@/components/feature/toast/Toast";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";
import { FormField } from "@/components/form-fields/FormField";
import FormLayout from "@/components/layout/FormLayout";
import { Button } from "@/components/ui/Button";
import { useUploadImage } from "@/hooks/useUploadImage";
import { signupKakaoChild } from "@/lib/api/auth";
import { ImageInfo } from "@/lib/api/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OauthChildSignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const [documents, setDocuments] = useState<File[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutateAsync: uploadImage } = useUploadImage();
  const router = useRouter();

  // 이미지 업로드 + 회원가입 처리
  const handleSignup = async (data: SignupFormValues) => {
    if (documents.length === 0) {
      setError("document", { type: "manual", message: "증명서류를 업로드해주세요." });
      return;
    }

    clearErrors("document");

    try {
      // 이미지 업로드
      const uploadedUrl = await uploadImage(documents[0]);
      const images: ImageInfo[] = [
        {
          fileKey: uploadedUrl.split("/onharu-minio/")[1],
          filePath: uploadedUrl,
          displayOrder: "0",
        },
      ];

      // 회원가입 API 호출
      const response = await signupKakaoChild({
        nickname: data.nickname!,
        images,
      });

      if (response.success) {
        setIsOpenModal(true);
      } else {
        Toast(
          "error",
          "회원가입에 실패했습니다.",
          response.message || "잠시 후 다시 시도해주세요."
        );

        console.error("회원가입 실패:", response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.status === 400) {
        setError("nickname", {
          type: "manual",
          message: err.message || "사용할 수 없는 닉네임입니다.",
        });
      } else {
        console.error("회원가입/업로드 에러:", err);
        Toast("error", "회원가입에 실패했습니다.", err?.message || "잠시 후 다시 시도해주세요.");
      }
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    router.push("/login");
  };

  return (
    <div className="wrapper flex min-h-screen items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="아동 회원가입">
          <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-5">
            {/* 닉네임 */}
            <FormField<SignupFormValues>
              name="nickname"
              config={FIELD_CONFIG.nickname}
              register={register}
              errors={errors}
            />

            {/* 증명 서류 */}
            <div className="flex flex-col">
              <div className="sm:text-md mb-1.25 text-base font-medium sm:mb-2.5">
                증명서류 <span className="text-danger ml-1">*</span>
              </div>
              <DocumentUploadField
                register={register}
                errors={errors}
                watch={watch}
                onFilesChange={setDocuments}
                maxNum={1}
              />
            </div>

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
