import { getChildReservations } from "@/lib/api/childrens";
import { getOwnerReservations } from "@/lib/api/owners";
import { UserRole } from "@/lib/api/types/auth";
import {
  ChildReservationParams,
  GetReservationsParams,
  OwnerReservationParams,
} from "@/lib/api/types/reservation";
import { useQuery } from "@tanstack/react-query";

export function useReservations(
  role: UserRole | undefined,
  params: GetReservationsParams | undefined
) {
  return useQuery({
    queryKey: ["reservations", role, params],
    queryFn: async () => {
      if (!role || !params) throw new Error("Invalid params");

      if (role === "CHILD") {
        return getChildReservations(params as ChildReservationParams);
      }

      return getOwnerReservations(params as OwnerReservationParams);
    },
    enabled: !!role && !!params,
  });
}
