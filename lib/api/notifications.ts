import { apiClient } from "./clientApiClient";
import { ApiResponse } from "./types/common";
import { NotificationData, NotificationHistory } from "./types/notification";

// 알림 내역 조회
export const getNotificationHistories = (params?: {
  pageNum?: number;
  perPage?: number;
  sortField?: "id" | "createdAt";
  sortDirection?: "asc" | "desc";
}): Promise<ApiResponse<{ histories: NotificationHistory[]; totalPages: number }>> => {
  const query = new URLSearchParams({
    pageNum: String(params?.pageNum ?? 1),
    perPage: String(params?.perPage ?? 6),
    sortField: params?.sortField ?? "createdAt",
    sortDirection: params?.sortDirection ?? "desc",
  }).toString();

  return apiClient.get<ApiResponse<{ histories: NotificationHistory[]; totalPages: number }>>(
    `/notifications/histories?${query}`
  );
};

// 알림 설정 조회
export const getNotification = (): Promise<ApiResponse<NotificationData>> => {
  return apiClient.get<ApiResponse<NotificationData>>("/notifications/me");
};

// 알림 설정 수정
export const updateNotification = (body: {
  isSystemEnabled: boolean;
}): Promise<ApiResponse<NotificationData>> => {
  return apiClient.put<ApiResponse<NotificationData>>("/notifications/me", body);
};

// 알림 전체 읽음 처리
export const updateReadAll = (): Promise<ApiResponse<null>> => {
  return apiClient.put("/notifications/histories/read/all");
};
