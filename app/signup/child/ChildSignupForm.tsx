"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SignupFormValues } from "@/app/signup/types";
import DocumentUploadField from "@/components/feature/DocumentUploadField";
import TermsField from "../components/fields/TermsField";
import EmailAuthField from "@/components/feature/EmailAuthField";

export default function ChildSignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    trigger,
    clearErrors,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const passwordValue = watch("password");

  const onSubmit = (data: SignupFormValues) => {
    if (!isCodeSent) {
      setError("email", { type: "manual", message: "이메일 인증을 진행해주세요." });
      return;
    }

    if (!isEmailVerified) {
      setError("authCode", { type: "manual", message: "인증 확인을 완료해 주세요." });
      return;
    }

    console.log("회원가입 데이터:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 이메일 */}
      <EmailAuthField<SignupFormValues>
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

      {/* 비밀번호 */}
      <Input
        label="비밀번호"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        isRequired
        register={register("password", {
          required: "비밀번호는 필수입니다.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message: "대,소문자 포함 8자 이상 입력해주세요.",
          },
        })}
        error={errors.password}
      />

      {/* 비밀번호 확인 */}
      <Input
        label="비밀번호 재입력"
        id="passwordConfirm"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해 주세요."
        isRequired
        register={register("passwordConfirm", {
          required: "비밀번호 확인은 필수입니다.",
          validate: value => value === passwordValue || "비밀번호가 일치하지 않습니다.",
        })}
        error={errors.passwordConfirm}
      />

      {/* 이름 */}
      <Input
        label="이름"
        id="name"
        placeholder="이름을 입력해 주세요."
        isRequired
        register={register("name", { required: "이름은 필수입니다." })}
        error={errors.name}
      />

      {/* 닉네임 */}
      <Input
        label="닉네임"
        id="nickname"
        placeholder="닉네임을 입력해 주세요."
        isRequired
        register={register("nickname", {
          required: "닉네임은 필수입니다.",
          minLength: { value: 2, message: "닉네임은 2자 이상 입력해 주세요." },
        })}
        error={errors.nickname}
      />

      {/* 연락처 */}
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

      {/* 증명 서류 */}
      <div className="flex flex-col">
        <div className="sm:text-md mb-1.25 text-base font-medium sm:mb-2.5">
          증명서류 <span className="text-danger ml-1">*</span>
        </div>
        <DocumentUploadField register={register} errors={errors} watch={watch} />
      </div>

      {/* 이용 약관 */}
      <TermsField register={register} errors={errors} />

      <div className="mt-2.5 sm:mt-7.5">
        <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
          회원가입
        </Button>
      </div>
    </form>
  );
}
