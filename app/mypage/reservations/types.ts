import { ChildReservation, OwnerReservation } from "@/lib/api/types/reservation";

export type CancelModalType = "cancelChild" | "cancelOwner" | "cancelNotAllowed";

export type ChildReservationCardProps = ChildReservation & {
  role: "CHILD";
};

export type OwnerReservationCardProps = OwnerReservation & {
  role: "OWNER";
};
