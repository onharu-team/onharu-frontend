// 원본 데이터 타입
export interface RawReservation {
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
}

// 그룹핑 결과 타입
export type GroupedReservations = Record<string, string[]>;
