import { apiClient } from "./clientApiClient";
import {
  ReservationsData,
  OwnerReservation,
  OwnerReservationParams,
  CreateStoreSchedulesReq,
} from "./types/reservation";
import { ApiResponse } from "./types/common";

export const getOwnerReservations = ({
  storeId,
  ...params
}: OwnerReservationParams): Promise<ApiResponse<ReservationsData<OwnerReservation>>> => {
  const query = new URLSearchParams({
    pageNum: String(params.pageNum ?? 1),
    perPage: String(params.perPage ?? 4),
    statusFilter: params.statusFilter ?? "ALL",
    sortField: params.sortField ?? "id",
    sortDirection: params.sortDirection ?? "desc",
  }).toString();

  return apiClient.get<ApiResponse<ReservationsData<OwnerReservation>>>(
    `/owners/stores/${storeId}/reservations?${query}`
  );
};

type OwnerReservationAction = "approve" | "cancel" | "complete";

export const changeOwnerReservationStatus = (
  reservationId: string,
  action: OwnerReservationAction,
  body?: { cancelReason: string }
): Promise<ApiResponse<null>> => {
  if (action === "cancel") {
    return apiClient.post<ApiResponse<null>>(`/owners/reservations/${reservationId}/cancel`, body);
  }

  return apiClient.post<ApiResponse<null>>(`/owners/reservations/${reservationId}/${action}`);
};

// 가게 스케줄 생성
export const createStoreSchedules = (
  storeId: string,
  body: CreateStoreSchedulesReq
): Promise<ApiResponse<null>> => {
  return apiClient.post<ApiResponse<null>>(`/owners/stores/${storeId}/schedules`, body);
};

// 가게 스케줄 삭제
export const deleteStoreSchedules = (
  storeId: string,
  body: { storeScheduleIds: number[] }
): Promise<ApiResponse<null>> => {
  return apiClient.delete<ApiResponse<null>, { storeScheduleIds: number[] }>(
    `/owners/stores/${storeId}/schedules`,
    body
  );
};
