import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotificationHistories, updateReadAll } from "@/lib/api/notifications";

export const useNotificationHistory = (params?: { pageNum?: number; perPage?: number }) => {
  const queryClient = useQueryClient();
  const queryKey = ["notifications", "histories", params?.pageNum];

  const query = useQuery({
    queryKey,
    queryFn: () => getNotificationHistories(params),
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    select: res => {
      const histories = res.success ? res.data.histories : [];
      const totalPages = res.success ? res.data.totalPages : 0;

      // 읽지 않은 알림이 있는지 확인 (헤더 표시용)
      const hasUnread = histories.some(history => !history.isRead);

      return { histories, totalPages, hasUnread };
    },
  });

  // 전체 읽음 처리
  const { mutate: markAllAsRead } = useMutation({
    mutationFn: updateReadAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", "histories"] });
    },
  });

  return {
    ...query,
    notifications: query.data?.histories ?? [],
    totalPages: query.data?.totalPages ?? 0,
    hasUnread: query.data?.hasUnread ?? false,
    markAllAsRead,
  };
};
