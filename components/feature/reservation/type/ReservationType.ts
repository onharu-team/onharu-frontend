export interface RawReservation {
  id: number;
  date: string;
  time: string;
  maxPeople: number;
  isAvailable: boolean; // 추가
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

export type GroupedReservations = Record<string, TimeSlot[]>; // 수정
