"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SignupFormValues } from "@/app/signup/types";
import { useSignupChild } from "@/hooks/useSignupChild";
import { useUploadImage } from "@/hooks/useUploadImage";
import { ChildSignupFields } from "./components/ChildSignupFields";
import { DocumentUploadSection } from "./components/DocumentUploadSection";
import TermsField from "../components/fields/TermsField";
import { SignupSuccessModal } from "../components/SignupSuccessModal";
import { Toast } from "@/components/feature/toast/Toast";

export default function ChildSignupForm() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate: signupMutate, isPending: isSignupPending } = useSignupChild();
  const { mutateAsync: uploadImage } = useUploadImage();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const onSubmit = async (data: SignupFormValues) => {
    if (!isCodeSent) {
      setError("email", { type: "manual", message: "이메일 인증을 진행해주세요." });
      return;
    }
    if (!isEmailVerified) {
      setError("authCode", { type: "manual", message: "인증 확인을 완료해 주세요." });
      return;
    }
    if (documents.length === 0) {
      setError("document", { type: "manual", message: "증명서류를 업로드해주세요." });
      return;
    }

    let uploadedUrl: string;

    try {
      clearErrors("document");
      uploadedUrl = await uploadImage(documents[0]);
    } catch {
      setError("document", { type: "manual", message: "파일 업로드에 실패했습니다." });
      return;
    }

    signupMutate(
      { formData: data, documentUrl: uploadedUrl },
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
        <ChildSignupFields
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

        {/* 증명 서류 */}
        <DocumentUploadSection
          register={register}
          errors={errors}
          watch={watch}
          onFilesChange={setDocuments}
        />

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
