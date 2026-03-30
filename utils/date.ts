import { isBefore, startOfDay, parseISO } from "date-fns";

export const getFutureOrTodayDates = (dates: string[]) => {
  const today = startOfDay(new Date());

  return dates.filter(date => !isBefore(parseISO(date), today));
};
