import { UserRole } from "./auth";

export type ReservationStatus =
  | "ALL" // 전체
  | "WAITING" // 예약 대기중
  | "CONFIRMED" // 예약 확정
  | "CANCELED" // 예약 취소
  | "COMPLETED"; // 이용 완료

interface BaseReservationParams {
  pageNum: number;
  perPage?: number;
  statusFilter?: ReservationStatus;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}

export interface ChildReservationParams extends BaseReservationParams {
  storeId?: never;
}

export interface OwnerReservationParams extends BaseReservationParams {
  storeId: number;
}

export type GetReservationsParams = ChildReservationParams | OwnerReservationParams;

interface BaseReservation {
  id: number;
  userId: number;
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
  reviewed: boolean;
  cancelRequestedBy?: UserRole | null;
}

export interface ChildReservation extends BaseReservation {
  storeAddress?: string;
}

export interface OwnerReservation extends BaseReservation {
  childNickname?: string;
}

export interface ReservationsData<T> {
  reservations: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

// 가게 스케줄 생성
export interface CreateStoreScheduleItem {
  scheduleDate: string;
  startTime: string;
  endTime: string;
  maxPeople: number;
}

export interface CreateStoreSchedulesReq {
  storeSchedules: CreateStoreScheduleItem[];
}
