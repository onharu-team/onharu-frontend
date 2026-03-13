"use client";

import { useCallback, useState } from "react";
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
import { DisplayFile } from "@/components/feature/DocumentUploadField";

export default function ChildSignupForm() {
  const [emailAuthKey, setEmailAuthKey] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate: signupMutate, isPending: isSignupPending } = useSignupChild();
  const { mutateAsync: uploadImage } = useUploadImage();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const handleFilesChange = useCallback(
    (allFiles: DisplayFile[]) => {
      const newFiles = allFiles.filter(f => !f.isExisting && f.file).map(f => f.file as File);

      // validate 옵션을 꺼서 렌더링 방지
      setValue("document", newFiles, { shouldValidate: false });

      if (newFiles.length > 0) {
        clearErrors("document");
      }
    },
    [setValue, clearErrors]
  );

  const onSubmit = async (data: SignupFormValues) => {
    const currentDocuments = data.document as unknown as File[];

    if (!isEmailVerified) {
      setError("email", { type: "manual", message: "인증 확인을 완료해 주세요." });
      return;
    }

    if (!currentDocuments || currentDocuments.length === 0) {
      setError("document", { type: "manual", message: "증명서류를 업로드해주세요." });
      return;
    }

    let uploadedUrl: string;
    try {
      uploadedUrl = await uploadImage(currentDocuments[0]);
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
            setEmailAuthKey(prev => prev + 1);
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
          emailAuthKey={emailAuthKey}
          register={register}
          errors={errors}
          watch={watch}
          trigger={trigger}
          setError={setError}
          clearErrors={clearErrors}
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
        />

        {/* 증명 서류 */}
        <DocumentUploadSection errors={errors} onFilesChange={handleFilesChange} />

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
