export type ImageFile = {
  name: string;
  url: string;
};

export type StoreInitialData = {
  storeName: string;
  category: string;
  content: string;
  phone: string;
  selectedDays: string[];
  openTime: string;
  closeTime: string;
  tags: string;
  files: ImageFile[];
};
