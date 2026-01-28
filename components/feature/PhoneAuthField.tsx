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

type PhoneAuthFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  trigger: UseFormTrigger<T>;
  watch: UseFormWatch<T>;
  phoneName: Path<T>;
  codeName: Path<T>;
  onVerifiedChange: (verified: boolean) => void;
  onCodeSentChange: (sent: boolean) => void;
};

export default function PhoneAuthField<T extends FieldValues>({
  register,
  errors,
  setError,
  clearErrors,
  trigger,
  watch,
  phoneName,
  codeName,
  onVerifiedChange,
  onCodeSentChange,
}: PhoneAuthFieldProps<T>) {
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
    const isValid = await trigger(phoneName);
    if (!isValid) return;

    clearErrors(phoneName);

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
            label="연락처"
            id="phone"
            type="tel"
            placeholder="연락처를 입력해 주세요."
            isRequired
            register={register(phoneName, {
              required: "연락처는 필수입니다.",
              pattern: {
                value: /^01[0-9]-?\d{3,4}-?\d{4}$/,
                message: "올바른 전화번호 형식이 아닙니다.",
              },
            })}
            error={get(errors, phoneName) as FieldError | undefined}
            disabled={isVerified}
          />
        </div>

        <div className="absolute right-0 mt-7">
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

          <div className="absolute right-0 mt-7">
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
            <div className="text-danger absolute right-40 mt-10 text-sm">
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div>
          )}
        </div>
      )}
    </>
  );
}
