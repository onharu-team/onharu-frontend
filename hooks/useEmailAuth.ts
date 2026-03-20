import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendEmailCode, verifyEmailCode } from "@/lib/api/auth";

export const useEmailAuth = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResendMode, setIsResendMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sendMutation = useMutation({ mutationFn: sendEmailCode });
  const verifyMutation = useMutation({ mutationFn: verifyEmailCode });

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
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendCode = async (email: string) => {
    await sendMutation.mutateAsync({ email });
    setIsCodeSent(true);
    setIsVerified(false);
    setIsResendMode(true);
    startTimer();
  };

  const verifyCode = async (email: string, code: string) => {
    const response = await verifyMutation.mutateAsync({ email, code });

    if (response.success) {
      setIsVerified(true);
      clearTimer();
    }
    return response.success;

    //=============== Test ===================
    // const isTestSuccess = code === "123456";
    // if (isTestSuccess) {
    //   setIsVerified(true);
    //   clearTimer();
    // }
    // return isTestSuccess;
    //=========================================
  };

  useEffect(() => () => clearTimer(), []);

  return {
    isCodeSent,
    isVerified,
    isResendMode,
    timeLeft,
    sendCode,
    verifyCode,
    isSending: sendMutation.isPending,
    isVerifying: verifyMutation.isPending,
  };
};
