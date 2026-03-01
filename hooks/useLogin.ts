import { useMutation } from "@tanstack/react-query";
import { LoginReq } from "@/lib/api/types/auth";
import { ApiError, ApiResponse } from "@/lib/api/types/common";
import { login } from "@/lib/api/auth";

export const useLogin = () => {
  return useMutation<ApiResponse<null>, ApiError, LoginReq>({
    mutationFn: body => login(body),
  });
};
