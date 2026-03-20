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

export interface StoreSchedule {
  id: number;
  storeId: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  maxPeople: number;
  isAvailable: boolean;
}

// 가게 스케줄 조회
export interface MonthlySummary {
  date: string;
  availableSlots: number;
  scheduleSlots: StoreSchedule[];
}

export interface StoreSchedulesRes {
  dateSummaries: MonthlySummary[];
  scheduleSlots: StoreSchedule[];
}

export interface GetStoreSchedulesReq {
  year: string;
  month: string;
  day?: string;
}
