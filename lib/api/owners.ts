import { apiClient } from "./clientApiClient";
import { ReservationsData, OwnerReservation, OwnerReservationParams } from "./types/reservation";
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
