"use client";

import { SignupFormValues } from "@/app/signup/types";
import { signupOwner } from "@/lib/api/auth";
import { SignupRes } from "@/lib/api/types/auth";
import { ApiError, ApiResponse } from "@/lib/api/types/common";
import { useMutation } from "@tanstack/react-query";

export const useSignupOwner = () => {
  return useMutation<ApiResponse<SignupRes>, ApiError, { formData: SignupFormValues }>({
    mutationFn: async ({ formData }) => {
      return signupOwner({
        loginId: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        phone: formData.phone,
        name: formData.storeName ?? "",
        businessNumber: formData.businessNumber ?? "",
      });
    },
  });
};
