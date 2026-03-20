import { CreateStoreScheduleItem } from "@/lib/api/types/reservation";

// 시작 시간으로부터 1시간 뒤 시간 계산 ("HH:mm" 형식)
export const getEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours + 1, minutes);
  return date.toTimeString().slice(0, 5);
};

const dayMap: Record<string, number> = {
  일요일: 0,
  월요일: 1,
  화요일: 2,
  수요일: 3,
  목요일: 4,
  금요일: 5,
  토요일: 6,
};

// 항시 제공 스케줄 생성
export const generateAlwaysProvideSchedules = (
  period: string,
  days: string[],
  times: string[],
  maxPeople: number
): CreateStoreScheduleItem[] => {
  const schedules: CreateStoreScheduleItem[] = [];

  const startDate = new Date();
  const endDate = new Date();
  const months = Number(period.replace("개월", "")) || 0;
  endDate.setMonth(startDate.getMonth() + months);

  const targetDayIndices = days.map(d => dayMap[d]);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (targetDayIndices.includes(d.getDay())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;

      times.forEach(time => {
        schedules.push({
          scheduleDate: formattedDate,
          startTime: time,
          endTime: getEndTime(time),
          maxPeople,
        });
      });
    }
  }

  return schedules;
};
