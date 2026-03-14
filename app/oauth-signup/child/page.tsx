"use client";

import { SignupFormValues } from "@/app/signup/types";
import DocumentUploadField from "@/components/feature/DocumentUploadField";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";
import { FormField } from "@/components/form-fields/FormField";
import FormLayout from "@/components/layout/FormLayout";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OauthChildSignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const [documents, setDocuments] = useState<File[]>([]);

  const onSubmit = (data: SignupFormValues) => {
    if (documents.length === 0) {
      setError("document", { type: "manual", message: "증명서류를 업로드해주세요." });
      return;
    }

    // console.log("회원가입 데이터:", finalData);
  };

  return (
    <div className="wrapper flex min-h-screen items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="아동 회원가입">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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

            <div className="mt-2.5 sm:mt-7.5">
              <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
                회원가입
              </Button>
            </div>
          </form>
        </FormLayout>
      </div>
    </div>
  );
}
