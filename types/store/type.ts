import { CategoryName } from "@/components/feature/category/data";
export interface CharityMain {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  introduction: string;
  intro: string;
  categoryId: number;
  categoryName: CategoryName;
  isOpen: boolean;
  isSharing: boolean;
  tagNames: string[];
  distance: number;
  images: string[];
  favoriteCount: number;
}
