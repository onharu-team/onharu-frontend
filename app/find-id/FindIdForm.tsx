"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneAuthField from "@/components/feature/PhoneAuthField";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/form-fields/FormField";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";

type FindIdFormValues = {
  name: string;
  phone: string;
  authCode: string;
};

export default function FindIdForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    trigger,
  } = useForm<FindIdFormValues>({ mode: "onSubmit" });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const onSubmit = (data: FindIdFormValues) => {
    if (!isCodeSent) {
      setError("phone", { type: "manual", message: "연락처 인증을 진행해주세요." });
      return;
    }

    if (!isPhoneVerified) {
      setError("authCode", { type: "manual", message: "인증 확인을 완료해 주세요." });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 이름 */}
      <FormField<FindIdFormValues>
        name="name"
        config={FIELD_CONFIG.name}
        register={register}
        errors={errors}
      />

      {/* 연락처 인증 */}
      <PhoneAuthField<FindIdFormValues>
        register={register}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
        trigger={trigger}
        watch={watch}
        phoneName="phone"
        codeName="authCode"
        onVerifiedChange={setIsPhoneVerified}
        onCodeSentChange={setIsCodeSent}
      />

      <div className="mt-2.5 sm:mt-7.5">
        <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
          아이디 찾기
        </Button>
      </div>
    </form>
  );
}
