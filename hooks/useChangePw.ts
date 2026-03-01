"use client";

import { changePassword } from "@/lib/api/auth";
import { ChangePasswordReq } from "@/lib/api/types/auth";
import { ApiError, ApiResponse } from "@/lib/api/types/common";
import { useMutation } from "@tanstack/react-query";

export const useChangePassword = () => {
  return useMutation<ApiResponse<Record<string, never>>, ApiError, ChangePasswordReq>({
    mutationFn: async body => {
      return changePassword(body as ChangePasswordReq);
    },
  });
};
