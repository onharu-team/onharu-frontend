import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ApiError, ApiResponse } from "@/lib/api/types/common";
import { logout } from "@/lib/api/auth";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ApiResponse<null>, ApiError>({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.clear();

      router.push("/");
      router.refresh();
    },
  });
};
