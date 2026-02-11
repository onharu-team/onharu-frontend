export interface CharityMain {
  id: string;
  storelink: string;
  images: [];
  name: string;
  introduction: string;
  categoryName: string;
  tags?: string[];
  openTime: string; //delete?
  closeTime: string; //delete?
  isOpen: boolean;
  hasSharing: boolean;
}
