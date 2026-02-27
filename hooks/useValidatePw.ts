"use client";

import { validatePassword } from "@/lib/api/auth";
import { ValidatePasswordReq } from "@/lib/api/types/auth";
import { ApiError, ApiResponse } from "@/lib/api/types/common";
import { useMutation } from "@tanstack/react-query";

export const useValidatePassword = () => {
  return useMutation<ApiResponse<"true">, ApiError, ValidatePasswordReq>({
    mutationFn: async ({ password }) => {
      return validatePassword({
        password,
      });
    },
  });
};
