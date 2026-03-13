import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotification, updateNotification } from "@/lib/api/notifications";
import { Toast } from "@/components/feature/toast/Toast";

export const useNotificationQuery = () => {
  const queryClient = useQueryClient();

  // 알림 상태 조회
  const { data, isLoading } = useQuery({
    queryKey: ["notifications", "me"],
    queryFn: getNotification,
    select: res => res.success && res.data.notificationResponse,
  });

  // 알림 상태 수정
  const { mutate: updateToggle, isPending } = useMutation({
    mutationFn: (isSystemEnabled: boolean) => updateNotification({ isSystemEnabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", "me"] });
    },
    onError: error => {
      console.error("알림 설정 변경 실패:", error);
      Toast("error", "알림 설정 변경에 실패했습니다.", "잠시후에 다시 시도해주세요.");
    },
  });

  return {
    notification: data,
    isLoading,
    updateToggle,
    isUpdating: isPending,
  };
};
