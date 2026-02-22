"use client";

import { SignupFormValues } from "@/app/signup/types";
import { signupOwner } from "@/lib/api/auth";
import { SignupOwnerResponse } from "@/lib/api/types/auth";
import { ApiError } from "@/lib/api/types/common";
import { useMutation } from "@tanstack/react-query";

export const useSignupOwner = () => {
  return useMutation<SignupOwnerResponse, ApiError, { formData: SignupFormValues }>({
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
