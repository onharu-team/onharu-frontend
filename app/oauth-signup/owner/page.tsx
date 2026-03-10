"use client";

import BusinessNumberField from "@/app/signup/components/fields/BusinessNumberField";
import { SignupFormValues } from "@/app/signup/types";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";
import { FormField } from "@/components/form-fields/FormField";
import FormLayout from "@/components/layout/FormLayout";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OauthOwnerSignupPage() {
  const [isBusinessVerified, setIsBusinessVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    getValues,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const onSubmit = (data: SignupFormValues) => {
    if (!isBusinessVerified) {
      setError("businessNumber", {
        type: "manual",
        message: "사업자번호 인증을 진행해주세요.",
      });
      return;
    }

    console.log("회원가입 데이터:", data);
  };

  return (
    <div className="mt-section-sm-top wrapper md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom flex min-h-screen items-center justify-center">
      <div className="w-full max-w-115">
        <FormLayout title="매장 회원가입">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
