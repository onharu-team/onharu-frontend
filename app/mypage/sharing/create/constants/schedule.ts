import { BusinessHour } from "@/lib/api/types/stores";

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

export const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  // "종일",
];
