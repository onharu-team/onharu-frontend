"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneAuthField from "@/components/feature/PhoneAuthField";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type FindPasswordFormValues = {
  name: string;
  userId: string;
  phone: string;
  authCode: string;
};

export default function FindPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    trigger,
  } = useForm<FindPasswordFormValues>({ mode: "onSubmit" });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const onSubmit = (data: FindPasswordFormValues) => {
    if (!isCodeSent) {
      setError("phone", { type: "manual", message: "연락처 인증을 진행해주세요." });
      return;
    }

    if (!isPhoneVerified) {
      setError("authCode", { type: "manual", message: "인증 확인을 완료해 주세요." });
      return;
    }

    console.log("비밀번호 찾기 요청:", data);
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

      {/* 아이디 */}
      <Input
        label="아이디"
        id="userId"
        placeholder="아이디를 입력해 주세요."
        isRequired
        register={register("userId", {
          required: "아이디는 필수입니다.",
        })}
        error={errors.userId}
      />

      {/* 연락처 인증 */}
      <PhoneAuthField<FindPasswordFormValues>
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
        비밀번호 찾기
      </Button>
    </form>
  );
}
