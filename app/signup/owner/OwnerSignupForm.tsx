"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SignupFormValues } from "@/app/signup/data/signup";
import PhoneAuthField from "@/components/feature/PhoneAuthField";
import TermsField from "../components/fields/TermsField";
import BusinessNumberField from "../components/fields/BusinessNumberField";

export default function OwnerSignupForm() {
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
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const passwordValue = watch("password");

  const onSubmit = (data: SignupFormValues) => {
    if (!isCodeSent) {
      setError("phone", { type: "manual", message: "연락처 인증을 진행해주세요." });
      return;
    }

    if (!isPhoneVerified) {
      setError("authCode", { type: "manual", message: "인증 확인을 완료해 주세요." });
      return;
    }

    if (data.userId === "test") {
      // 이미 존재하는 아이디일 때 에러 표시
      setError("userId", { type: "manual", message: "이미 존재하는 아이디입니다." });
      return;
    }

    console.log("회원가입 데이터:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 아이디 */}
      <Input
        label="아이디"
        id="userId"
        placeholder="아이디를 입력해 주세요."
        isRequired
        register={register("userId", {
          required: "아이디는 필수입니다.",
          minLength: { value: 4, message: "아이디는 4자 이상 입력해 주세요." },
        })}
        error={errors.userId}
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

      {/* 매장명 */}
      <Input
        label="매장명"
        id="storeName"
        placeholder="매장명을 입력해 주세요."
        isRequired
        register={register("storeName", { required: "매장명은 필수입니다." })}
        error={errors.storeName}
      />

      {/* 연락처 */}
      <PhoneAuthField<SignupFormValues>
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

      {/* 사업자등록번호 */}
      <BusinessNumberField register={register} errors={errors} trigger={trigger} />

      {/* 이용 약관 */}
      <TermsField register={register} errors={errors} />

      <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
        회원가입
      </Button>
    </form>
  );
}
