export type ReservationStatus = "CONFIRMED" | "PENDING" | "COMPLETED" | "CANCELED" | "SHARE_DONE";

export type CancelModalType = "cancelChild" | "cancelOwner" | "cancelNotAllowed";

export interface ReservationItem {
  id: number;
  role: "child" | "owner";
  status: ReservationStatus;
  title: string;
  reservationDate: string;
  reservationTime: string;
  people: number;
  address?: string;
  cancelReason?: string;
  date: string;
}
