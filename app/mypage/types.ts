export interface Reservation {
  date: string;
  time: string;
  people: number;
  status: "대기중" | "확정" | "완료";
}

export interface ChildSchedule {
  storeName: string;
  storeId: number;
  address: string;
  date: string;
  time: string;
  people: number;
}

export interface ReviewTarget {
  storeName: string;
  date: string;
  people: number;
  reservationId: string;
}
