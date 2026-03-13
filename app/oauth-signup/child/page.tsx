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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const handleFilesChange = () => {};

  const onSubmit = (data: SignupFormValues) => {
    const finalData = {
      ...data,
      documents: uploadedFiles,
    };

    console.log("회원가입 데이터:", finalData);
  };

  return (
    <div className="mt-section-sm-top wrapper md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom flex min-h-screen items-center justify-center">
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
                onFilesChange={handleFilesChange}
                error={errors.document?.message}
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
