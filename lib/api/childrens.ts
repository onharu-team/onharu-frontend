import { apiClient } from "./clientApiClient";
import { ReservationsData, GetReservationsParams, ChildReservation } from "./types/reservation";
import { ApiResponse } from "./types/common";

export const getChildReservations = (
  params: GetReservationsParams
): Promise<ApiResponse<ReservationsData<ChildReservation>>> => {
  const query = new URLSearchParams({
    pageNum: String(params.pageNum ?? 1),
    perPage: String(params.perPage ?? 4),
    statusFilter: params.statusFilter ?? "ALL",
    sortField: params.sortField ?? "id",
    sortDirection: params.sortDirection ?? "desc",
  }).toString();

  return apiClient.get<ApiResponse<ReservationsData<ChildReservation>>>(
    `/childrens/reservations?${query}`
  );
};

export const childReservationCancel = (
  reservationId: string,
  cancelReason: string
): Promise<ApiResponse<null>> => {
  return apiClient.post<ApiResponse<null>>(`/childrens/reservations/${reservationId}/cancel`, {
    cancelReason,
  });
};
