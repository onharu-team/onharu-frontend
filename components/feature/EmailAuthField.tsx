"use client";

import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
  UseFormTrigger,
  UseFormSetError,
  UseFormClearErrors,
  get,
  FieldError,
} from "react-hook-form";
import { useEmailAuth } from "@/hooks/useEmailAuth";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  trigger: UseFormTrigger<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  emailName: Path<T>;
  codeName: Path<T>;
  onVerifiedChange: (verified: boolean) => void;
}

export const EmailAuthField = <T extends FieldValues>({
  register,
  watch,
  errors,
  trigger,
  setError,
  clearErrors,
  emailName,
  codeName,
  onVerifiedChange,
}: Props<T>) => {
  const { isCodeSent, isVerified, isResendMode, timeLeft, sendCode, verifyCode, isSending } =
    useEmailAuth();

  const email = watch(emailName);
  const code = watch(codeName);
  const emailError = get(errors, emailName) as FieldError | undefined;
  const codeError = get(errors, codeName) as FieldError | undefined;

  const handleSend = async () => {
    const isValid = await trigger(emailName);
    if (!isValid) return;

    try {
      await sendCode(email);
      clearErrors(emailName);
    } catch (error) {
      setError(emailName, { type: "manual", message: "인증번호 발송에 실패했습니다." });
    }
  };

  const handleVerify = async () => {
    if (!code) {
      setError(codeName, { type: "manual", message: "인증번호 6자리를 입력해 주세요!" });
      return;
    }

    try {
      const success = await verifyCode(email, code);

      if (success) {
        clearErrors([emailName, codeName]);
        onVerifiedChange(true);
      }
    } catch (error) {
      setError(codeName, { type: "manual", message: "인증번호가 일치하지 않습니다!" });
    }
  };

  return (
    <>
      {/* 이메일 입력 */}
      <div className="relative flex flex-row">
        <div className="w-78.75">
          <Input
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            isRequired
            disabled={isCodeSent || isVerified}
            register={register(emailName, {
              required: "이메일은 필수입니다.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
            error={emailError}
          />
        </div>

        <div className={clsx("absolute right-0 bottom-0", emailError && "mb-8")}>
          <Button
            type="button"
            varient="default"
            width="md"
            height="md"
            fontSize="sm"
            onClick={handleSend}
            disabled={isVerified || isSending}
          >
            {isVerified ? "인증 완료" : isCodeSent && isResendMode ? "재전송" : "인증번호 전송"}
          </Button>
        </div>
      </div>

      {/* 인증 번호 입력 */}
      {isCodeSent && (
        <div className="relative flex flex-row">
          <div className="w-78.75">
            <Input
              label="인증번호"
              id="authCode"
              placeholder="인증번호를 입력해 주세요."
              isRequired
              disabled={isVerified}
              register={register(codeName, {
                required: "인증번호 6자리를 입력해 주세요!",
              })}
              error={codeError}
            />
          </div>

          <div className={clsx("absolute right-0 bottom-0", codeError && "mb-8")}>
            <Button
              type="button"
              varient="default"
              width="md"
              height="md"
              fontSize="sm"
              onClick={handleVerify}
              disabled={isVerified}
            >
              인증번호 확인
            </Button>
          </div>

          {!isVerified && (
            <div className="text-danger absolute right-40 mt-12 text-sm">
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div>
          )}
        </div>
      )}
    </>
  );
};
