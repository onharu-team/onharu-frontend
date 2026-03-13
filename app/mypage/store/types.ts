export type StoreApiRes = {
  store: {
    id: number;
    name: string;
    address: string;
    phone: string;
    lat: string;
    lng: string;
    introduction: string;
    intro: string;
    categoryId: number;
    categoryName: string;
    isOpen: boolean;
    isSharing: boolean;
    distance: number;
    businessHours: Array<{
      businessDay: string;
      openTime: string;
      closeTime: string;
    }>;
    tagNames: string[];
    images: string[];
    favoriteCount: number;
  };
};

export type StoreInitialData = {
  storeName: string;
  category: string;
  intro: string;
  content: string;
  phone: string;
  selectedDays: string[];
  openTime: string;
  closeTime: string;
  tags: string[];
  files: string[];
  address: string;
  lat: string;
  lng: string;
};
