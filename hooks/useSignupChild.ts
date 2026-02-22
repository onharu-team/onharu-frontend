"use client";

import { SignupFormValues } from "@/app/signup/types";
import { signupChild } from "@/lib/api/auth";
import { SignupChildResponse } from "@/lib/api/types/auth";
import { ApiError } from "@/lib/api/types/common";
import { useMutation } from "@tanstack/react-query";

export const useSignupChild = () => {
  return useMutation<
    SignupChildResponse,
    ApiError,
    { formData: SignupFormValues; documentUrl: string }
  >({
    mutationFn: async ({ formData, documentUrl }) => {
      return signupChild({
        loginId: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        name: formData.name ?? "",
        phone: formData.phone,
        nickname: formData.nickname ?? "",
        certificate: documentUrl,
      });
    },
  });
};
