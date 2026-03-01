import { useMutation, useQueryClient } from "@tanstack/react-query";
import { withdrawUser } from "@/lib/api/auth";

export function useWithdraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => withdrawUser(),

    onSuccess: () => {
      queryClient.clear();
    },
  });
}
