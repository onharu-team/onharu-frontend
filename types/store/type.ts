import { CategoryName } from "@/components/feature/category/data";
export interface CharityMain {
  id: string;
  storelink: string;
  images: [];
  address: string;
  name: string;
  introduction: string;
  categoryName: CategoryName;
  lat: string;
  lng: string;
  tags?: string[];
  openTime: string; //delete?
  closeTime: string; //delete?
  isOpen: boolean;
  hasSharing: boolean;
}
