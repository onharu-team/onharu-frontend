import { ScheduleApiResponse } from "@/types/store/schedules/type";

export async function GetStoreSchedules(
  storeId: string,
  year: number,
  month: number
): Promise<ScheduleApiResponse> {
  const res = await fetch(`/api/stores/${storeId}/schedules?year=${year}&month=${month}`);
  return res.json();
}
