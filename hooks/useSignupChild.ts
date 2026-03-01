"use client";

import { SignupFormValues } from "@/app/signup/types";
import { signupChild } from "@/lib/api/auth";
import { ChildReq, ImageInfo, SignupReq, SignupRes } from "@/lib/api/types/auth";
import { ApiError, ApiResponse } from "@/lib/api/types/common";
import { useMutation } from "@tanstack/react-query";

export const useSignupChild = () => {
  return useMutation<
    ApiResponse<SignupRes>,
    ApiError,
    { formData: SignupFormValues; documentUrl: string }
  >({
    mutationFn: async ({ formData, documentUrl }) => {
      const images: ImageInfo[] = [
        {
          fileKey: documentUrl.split("/onharu-minio/")[1],
          filePath: documentUrl,
          displayOrder: "0",
        },
      ];

      const payload: SignupReq & ChildReq = {
        loginId: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        name: formData.name ?? "",
        phone: formData.phone,
        nickname: formData.nickname ?? "",
        images,
      };

      return signupChild(payload);
    },
  });
};
