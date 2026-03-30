import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import Calendar from "@/components/feature/calendar/Calendar";
import { ReservationTime } from "@/components/feature/reservation/ReservationTime";
import { TIMES } from "../constants/schedule";
import { GroupedReservations } from "@/components/feature/reservation/type/ReservationType";
import { getFutureOrTodayDates } from "@/utils/date";

export function SingleReservationArea({
  selectedDate,
  setSelectedDate,
  selectedTime,
  handleSelectTime,
  existingSchedules,
  onMonthChange,
}: {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  selectedTime: string[] | null;
  handleSelectTime: (time: string) => void;
  existingSchedules: Record<string, string[]>;
  onMonthChange?: (year: number, month: number) => void;
}) {
  const dataForReservation: GroupedReservations = selectedDate
    ? {
        [format(selectedDate, "yyyy-MM-dd")]: TIMES.map(slot => ({
          ...slot,
          isAvailable: !existingSchedules[format(selectedDate, "yyyy-MM-dd")]?.includes(slot.time),
        })),
      }
    : {};

  const reservedDates = getFutureOrTodayDates(Object.keys(existingSchedules ?? {}));

  return (
    <>
      <div className="sm:text-md mb-2 text-base font-medium sm:mb-5">나눔 일정</div>

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        reservedDates={reservedDates}
        onMonthChange={onMonthChange}
      />

      <div className="mt-1.25 mb-3.75 sm:mt-2.5 sm:mb-7.5">
        <ReservationTime
          data={dataForReservation}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          handleSelectTime={handleSelectTime}
          existingSchedules={existingSchedules}
        />
      </div>
    </>
  );
}
