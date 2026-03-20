"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStoreSchedules } from "@/lib/api/owners";

export function useDeleteStoreSchedules(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storeScheduleIds: number[]) =>
      deleteStoreSchedules(storeId, { storeScheduleIds }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["storeSchedules", storeId],
      });
    },
  });
}

