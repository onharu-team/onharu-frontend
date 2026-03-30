import { BusinessHour } from "@/lib/api/types/stores";
import { TimeSlot } from "@/components/feature/reservation/type/ReservationType";

export const CATEGORY_MAP: Record<string, number> = {
  식당: 1,
  카페: 2,
  의료: 3,
  교육: 4,
  생활: 5,
};

export const PERIODS = ["1개월", "3개월", "6개월"];

export const DAYS = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

export const DAY_MAP: Record<string, BusinessHour["businessDay"]> = {
  월요일: "MON",
  화요일: "TUE",
  수요일: "WED",
  목요일: "THU",
  금요일: "FRI",
  토요일: "SAT",
  일요일: "SUN",
};

export const TIMES: TimeSlot[] = [
  { time: "09:00", isAvailable: true },
  { time: "10:00", isAvailable: true },
  { time: "11:00", isAvailable: true },
  { time: "12:00", isAvailable: true },
  { time: "13:00", isAvailable: true },
  { time: "14:00", isAvailable: true },
  { time: "15:00", isAvailable: true },
  { time: "16:00", isAvailable: true },
  { time: "17:00", isAvailable: true },
  { time: "18:00", isAvailable: true },
  { time: "19:00", isAvailable: true },
  { time: "20:00", isAvailable: true },
  { time: "21:00", isAvailable: true },
];
