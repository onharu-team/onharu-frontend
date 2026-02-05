"use client";

import { useState, useRef, useEffect } from "react";
import {
  Path,
  get,
  FieldError,
  UseFormRegister,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
  UseFormTrigger,
  UseFormWatch,
  FieldValues,
} from "react-hook-form";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";

type EmailAuthFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  trigger: UseFormTrigger<T>;
  watch: UseFormWatch<T>;
  emailName: Path<T>;
  codeName: Path<T>;
  onVerifiedChange: (verified: boolean) => void;
  onCodeSentChange: (sent: boolean) => void;
};

export default function EmailAuthField<T extends FieldValues>({
  register,
  errors,
  setError,
  clearErrors,
  trigger,
  watch,
  emailName,
  codeName,
  onVerifiedChange,
  onCodeSentChange,
}: EmailAuthFieldProps<T>) {
  const [isVerified, setIsVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isResendMode, setIsResendMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    setTimeLeft(180);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setIsVerified(false);
          onVerifiedChange(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    // 이메일 중복 체크
    if (watch(emailName) === "test@test.com") {
      setError(emailName, { type: "manual", message: "이미 존재하는 이메일입니다." });
      setIsCodeSent(false);
      setIsResendMode(false);
      setIsVerified(false);
      onVerifiedChange(false);
      onCodeSentChange(false);
      clearTimer();
      return;
    }

    const isValid = await trigger(emailName);
    if (!isValid) return;

    clearErrors(emailName);

    setIsVerified(false);
    setIsCodeSent(true);
    setIsResendMode(true);
    onVerifiedChange(false);
    onCodeSentChange(true);

    startTimer();
  };

  const handleVerifyCode = (code: string) => {
    if (!code) {
      setError(codeName, { type: "manual", message: "인증번호 6자리를 입력해 주세요!" });
      return;
    }

    if (code === "123456") {
      clearErrors(codeName);
      setIsVerified(true);
      onVerifiedChange(true);
      clearTimer();
    } else {
      setError(codeName, { type: "manual", message: "인증번호가 일치하지 않습니다!" });
    }
  };

  useEffect(() => () => clearTimer(), []);

  return (
    <>
      <div className="relative flex flex-row">
        <div className="w-78.75">
          <Input
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            isRequired
            register={register(emailName, {
              required: "이메일은 필수입니다.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
            error={get(errors, emailName) as FieldError | undefined}
            disabled={isVerified}
          />
        </div>

        <div className={clsx("absolute right-0 bottom-0", get(errors, emailName) && "mb-8")}>
          <Button
            type="button"
            varient="default"
            width="md"
            height="md"
            fontSize="sm"
            onClick={handleSendCode}
            disabled={isVerified}
          >
            {isVerified ? "인증 완료" : isResendMode ? "재전송" : "인증번호 전송"}
          </Button>
        </div>
      </div>

      {isCodeSent && (
        <div className="relative flex flex-row">
          <div className="w-78.75">
            <Input
              label="인증번호"
              id="authCode"
              placeholder="인증번호를 입력해 주세요."
              isRequired
              register={register(codeName, {
                required: "인증번호 6자리를 입력해 주세요!",
              })}
              error={get(errors, codeName) as FieldError | undefined}
              disabled={isVerified}
            />
          </div>

          <div className={clsx("absolute right-0 bottom-0", get(errors, codeName) && "mb-8")}>
            <Button
              type="button"
              varient="default"
              width="md"
              height="md"
              fontSize="sm"
              onClick={() => handleVerifyCode(watch(codeName))}
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
}
