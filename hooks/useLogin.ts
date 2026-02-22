import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "@/lib/api/types/auth";
import { ApiError } from "@/lib/api/types/common";
import { login } from "@/lib/api/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: body => login(body),
  });
};
