export type StoreStatus = "PREPARING" | "ONGOING";

export interface StoreItem {
  id: number;
  name: string;
  address: string;
  status: StoreStatus; // 현재 예약 가능 상태
  isLiked: boolean; // 관심 목록 여부
}
