import { apiClient } from "./clientApiClient";
import { ChildReservationsData } from "./types/childrens";

export const getChildReservations = (): Promise<ChildReservationsData> => {
  return apiClient.get<ChildReservationsData>(
    "/childrens/reservations?pageNum=1&perPage=10&statusFilter=ALL&sortField=id&sortDirection=desc"
  );
};
