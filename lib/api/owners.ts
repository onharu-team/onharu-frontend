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

type OwnerReservationAction = "approve" | "reject" | "complete";

export const changeOwnerReservationStatus = (
  reservationId: string,
  action: OwnerReservationAction,
  body?: { rejectReason: string }
): Promise<ApiResponse<null>> => {
  if (action === "reject") {
    return apiClient.post<ApiResponse<null>>(`/owners/reservations/${reservationId}/reject`, body);
  }

  return apiClient.post<ApiResponse<null>>(`/owners/reservations/${reservationId}/${action}`);
};
