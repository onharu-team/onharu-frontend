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

type BusinessHour = {
  businessDay: string;
  openTime: string;
  closeTime: string;
};

export type CharityDetail = {
  id: number;
  name: string;
  address: string;
  lat: string;
  lng: string;
  phone: string;

  categoryId: number;
  categoryName: string;

  intro: string;
  introduction: string;

  images: string[];
  tagNames: string[];

  businessHours: BusinessHour[];

  distance: number;
  favoriteCount: number;

  isOpen: boolean;
  isSharing: boolean;

  userId: number;
};
