import { CategoryName } from "@/components/feature/category/data";

export interface NearbyStore {
  id: string;
  name: string;
  category: CategoryName;
  lat: number;
  lng: number;
  address: string;
  description: string;

  openTime: string; // "09:00"
  closeTime: string; // "20:00"
  hasSharing: boolean; // 나눔중 여부
}
