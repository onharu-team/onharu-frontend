"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import EmailAuthField from "@/components/feature/EmailAuthField";

type FindPasswordFormValues = {
  name: string;
  email: string;
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
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const onSubmit = (data: FindPasswordFormValues) => {
    if (!isCodeSent) {
      setError("email", { type: "manual", message: "이메일 인증을 진행해주세요." });
      return;
    }

    if (!isEmailVerified) {
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

      {/* 이메일 */}
      <EmailAuthField<FindPasswordFormValues>
        register={register}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
        trigger={trigger}
        watch={watch}
        emailName="email"
        codeName="authCode"
        onVerifiedChange={setIsEmailVerified}
        onCodeSentChange={setIsCodeSent}
      />

      {/* 연락처  */}
      <Input
        label="연락처"
        id="phone"
        type="tel"
        placeholder="연락처를 입력해 주세요."
        isRequired
        register={register("phone", {
          required: "연락처는 필수입니다.",
          pattern: {
            value: /^01[016789]\d{7,8}$/,
            message: "올바른 전화번호 형식이 아닙니다.",
          },
        })}
        error={errors.phone}
      />

      <div className="mt-2.5 sm:mt-7.5">
        <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
          비밀번호 찾기
        </Button>
      </div>
    </form>
  );
}
