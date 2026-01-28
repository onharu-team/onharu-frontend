"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneAuthField from "@/components/feature/PhoneAuthField";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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

    console.log("아이디 찾기 요청:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 이름 */}
      <Input
        label="이름"
        id="name"
        placeholder="이름을 입력해 주세요."
        isRequired
        register={register("name", { required: "이름은 필수입니다." })}
        error={errors.name}
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

      <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
        아이디 찾기
      </Button>
    </form>
  );
}
