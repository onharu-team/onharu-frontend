export type ReservationStatus =
  | "ALL"
  | "WAITING"
  | "CONFIRMED"
  | "CANCELED"
  | "COMPLETED"
  | "REJECTED";

export interface ChildReservation {
  id: number;
  childId: number;
  storeScheduleId: number;
  storeId: number;
  storeName: string;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  people: number;
  status: ReservationStatus;
  reservationAt: string;
  cancelReason: string | null;
}

export interface ChildReservationsData {
  reservations: ChildReservation[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}
