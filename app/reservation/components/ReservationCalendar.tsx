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
   * 공통 Calendar 컴포넌트를 사용하기 전 날짜 데이터를 가공하는 곳입니다.
   *
   * @param availableDates 그룹화 된 객체에서 key(날짜)만 뽑아 Date배열 타입으로 만듭니다.
   * @param filterDate 만들어진 Date배열 타입의 각 요소들을 순환하며
   * 어떤 날짜를 활성화(선택 가능)할지 결정하는 필터 함수입니다.
   */

  const availableDates: Date[] = Object.keys(data).map(dateStr => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  });
  const filterDate = (d: Date) => availableDates.some(ad => isSameDay(d, ad));

  return (
    <Calendar
      filterDate={filterDate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
};
