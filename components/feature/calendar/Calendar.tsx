"use client";

import { useMemo } from "react";
import styles from "./Calendar.module.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";

interface CalendarProps {
  filterDate?: (date: Date) => boolean;
  selectedDate?: Date | null;
  setSelectedDate?: Dispatch<SetStateAction<Date | null>>;
  reservedDates?: string[];
  onMonthChange?: (year: number, month: number) => void;
}
/**
 * 공통 Calendar 컴포넌트를 사용하기 전 날짜 데이터를 가공하는 곳입니다.
 * @param filterDate Calendar가 어떤 날짜를 필터링 할지 결정해줍니다.
 * @param selectedDate 커스텀 훅에서 전달받은 선택된 날짜입니다.
 * @param setSelectedDate 커스텀 훅에서 전달받은 선택 날짜를 바꿔주는 함수입니다.
 * @param reservedDates 예약이 있는 날짜 배열 ("yyyy-MM-dd" 형식)
 * @param onMonthChange 달력에서 월이 변경될 때 호출되는 콜백 (년, 월 정보 전달)
 */

export default function Calendar({
  filterDate,
  selectedDate,
  setSelectedDate,
  reservedDates = [],
  onMonthChange,
}: CalendarProps) {
  const reservedSet = useMemo(() => new Set(reservedDates), [reservedDates]);

  const renderDay = (day: number, date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const hasReservation = reservedSet.has(key);

    return (
      <div className={styles.dayWrapper}>
        <span>{day}</span>
        {hasReservation && <div className={styles.dot} />}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <DatePicker
        locale={ko}
        selected={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date()}
        inline
        showDisabledMonthNavigation
        filterDate={filterDate}
        renderDayContents={renderDay}
        onMonthChange={date => {
          onMonthChange?.(date.getFullYear(), date.getMonth() + 1);
        }}
      />
    </div>
  );
}
