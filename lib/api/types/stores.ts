export type BusinessHour = {
  businessDay: string;
  openTime: string;
  closeTime: string;
};

export type StoreImage = {
  fileKey: string;
  filePath: string;
  displayOrder: number;
};

type StoreBase = {
  categoryId: number;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  introduction: string;
  intro: string;
  tagNames: string[];
  businessHours: BusinessHour[];
  images: StoreImage[];
};

export type CreateStoreReq = StoreBase & {
  name: string;
};

export type UpdateStoreReq = StoreBase & {
  isOpen: boolean;
  isSharing: boolean;
};
