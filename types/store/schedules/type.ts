export interface DailyScheduleDetail {
  id: number;
  storeId: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  maxPeople: number;
  isAvailable: boolean;
}

export interface DateSummaries {
  date: string;
  availableSlots: number;
  scheduleSlots: DailyScheduleDetail[];
}

export interface ScheduleApiResponse {
  success: boolean;
  data: {
    dateSummaries: DateSummaries[];
    scheduleSlots: DailyScheduleDetail[];
  };
}
