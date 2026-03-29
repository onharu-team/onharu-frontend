import { RawReservation } from "../type/ReservationType";
import { ScheduleApiResponse, DailyScheduleDetail } from "@/types/store/schedules/type";

export function TransformScheduleData(apiResponse: ScheduleApiResponse): RawReservation[] {
  const summaries = apiResponse?.data?.dateSummaries;

  if (!Array.isArray(summaries)) return [];

  return summaries.flatMap(summary =>
    summary.scheduleSlots.map((detail: DailyScheduleDetail) => ({
      id: detail.id,
      date: summary.date,
      time: detail.startTime.slice(0, 5),
      maxPeople: detail.maxPeople,
      isAvailable: detail.isAvailable, // 추가, filter 제거
    }))
  );
}
