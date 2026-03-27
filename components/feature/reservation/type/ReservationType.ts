// 원본 데이터 타입
export interface RawReservation {
  id: number;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  maxPeople: number;
}

// 그룹핑 결과 타입
export type GroupedReservations = Record<string, string[]>;
