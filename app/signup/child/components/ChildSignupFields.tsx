"use client";

import { SignupFormValues } from "@/app/signup/types";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
  UseFormWatch,
  UseFormTrigger,
} from "react-hook-form";
import EmailAuthField from "@/components/feature/EmailAuthField";
import { FormField } from "@/components/form-fields/FormField";
import { FIELD_CONFIG } from "@/components/form-fields/fieldConfig";

interface Props {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
  trigger: UseFormTrigger<SignupFormValues>;
  setError: UseFormSetError<SignupFormValues>;
  clearErrors: UseFormClearErrors<SignupFormValues>;
  isCodeSent: boolean;
  setIsCodeSent: (b: boolean) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (b: boolean) => void;
}

export const ChildSignupFields = ({
  register,
  errors,
  watch,
  trigger,
  setError,
  clearErrors,
  isCodeSent,
  setIsCodeSent,
  isEmailVerified,
  setIsEmailVerified,
}: Props) => {
  const passwordValue = watch("password");

  return (
    <>
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
        isVerified={isEmailVerified}
        setIsVerified={setIsEmailVerified}
        isCodeSent={isCodeSent}
        setIsCodeSent={setIsCodeSent}
      />

      <FormField<SignupFormValues>
        name="password"
        config={FIELD_CONFIG.password}
        register={register}
        errors={errors}
      />

      <FormField<SignupFormValues>
        name="passwordConfirm"
        config={FIELD_CONFIG.passwordConfirm(passwordValue)}
        register={register}
        errors={errors}
      />

      <FormField<SignupFormValues>
        name="name"
        config={FIELD_CONFIG.name}
        register={register}
        errors={errors}
      />

      <FormField<SignupFormValues>
        name="nickname"
        config={FIELD_CONFIG.nickname}
        register={register}
        errors={errors}
      />

      <FormField<SignupFormValues>
        name="phone"
        config={FIELD_CONFIG.phone}
        register={register}
        errors={errors}
      />
    </>
  );
};
