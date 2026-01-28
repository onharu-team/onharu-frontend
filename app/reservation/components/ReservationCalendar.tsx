"use client";

import { Dispatch, SetStateAction } from "react";
import { isSameDay } from "date-fns";
import Calendar from "@/components/feature/calendar/Calendar";
import { GroupedReservations } from "@/components/feature/reservation/type/ReservationType";

interface ReservationCalendar {
  data: GroupedReservations;
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

export const ReservationCalendar = ({
  data,
  selectedDate,
  setSelectedDate,
}: ReservationCalendar) => {
  /**
   * 날짜별로 시간을 그룹핑
   * @param availableDates 예약 가능한 {날짜:시간[]} 배열에서 날짜만 뽑아 캘린더 컴포넌트로 전달
   */

  const availableDates: Date[] = Object.keys(data).map(dateStr => new Date(dateStr));

  const filterDate = (d: Date) => availableDates.some(ad => isSameDay(d, ad));

  return (
    <Calendar
      filterDate={filterDate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
};
