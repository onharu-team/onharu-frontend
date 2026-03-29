import { format } from "date-fns";
import { GroupedReservations } from "@/components/feature/reservation/type/ReservationType";
import clsx from "clsx";

interface ReservationTimeProps {
  data: GroupedReservations;
  selectedDate: Date | null;
  selectedTime: string | null;
  handleSelectTime: (value: string) => void;
}
/**
 * 날짜별로 시간을 그룹핑
 * @param data 그룹화된 데이터입니다.
 *  @param selectedDate 선택된 날짜입니다.
 *  @param selectedTime 선택된 시간입니다.
 *  @param handleSelectTime 커스텀 훅입니다. 선택된 시간을 selectedTime에 반영해줍니다.
 */
export const ReservationTime = ({
  data,
  selectedDate,
  selectedTime,
  handleSelectTime,
}: ReservationTimeProps) => {
  const formatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const timesForSelectedDate = data[formatted] || [];
<<<<<<< HEAD
=======
  const existingTimes = existingSchedules?.[formatted] ?? [];

  const isToday = formatted === format(new Date(), "yyyy-MM-dd");

  const isPastTime = (time: string) => {
    if (!isToday) return false; // 오늘이 아니면 무조건 false
    const [hour, minute] = time.split(":").map(Number);
    const now = new Date();
    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);
    return slotTime <= now; // 현재 시간 이전이면 true
  };
>>>>>>> b5241a2 (예약 페이지에서 현재 시간 이전 버튼 비활성화)

  /**
   * 날짜별로 시간을 그룹핑
   *  @param formatted 선택된 날짜는 Date 타입으로, 이를 string타입으로 변환해줍니다.
   *  @param timesForSelectedDate 그룹에서 선택된 날짜에 맵핑 된 시간입니다.
   * 예를들어
   *  * {
      "2025-12-12": ["11:00", "12:00"],
      "2025-12-13": ["15:00","17:00"],
      "2025-12-15": ["14:00"],
    } 위 데이터 중 12월 12일을 선택했다면 timesForSelectedDate는 ["11:00", "12:00"]입니다.
   */

  if (timesForSelectedDate.length > 0) {
    return (
      <div className="grid grid-cols-4 gap-2">
<<<<<<< HEAD
        {timesForSelectedDate.map(date => (
          <button
            key={date}
            onClick={() => handleSelectTime(date)}
            className={clsx(
              "focus-visible:bg-main-300 cursor-pointer rounded-md border border-gray-300 bg-white py-2 transition duration-150 hover:bg-gray-50 md:py-4",
              selectedTime === date && "!bg-main text-white"
            )}
          >
            {date}
          </button>
        ))}
=======
        {timesForSelectedDate.map(slot => {
          const isSelected = Array.isArray(selectedTime)
            ? selectedTime.includes(slot.time)
            : selectedTime === slot.time;

          const isDisabled = !slot.isAvailable;

          return (
            <button
              key={slot.time}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleSelectTime(slot.time)}
              className={clsx(
                "focus-visible:bg-main-300 rounded-md border border-gray-300 bg-white py-2 transition duration-150 md:py-4",
                isSelected && "!bg-main text-white",
                isDisabled
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "cursor-pointer hover:bg-gray-50"
              )}
            >
              {slot.time}
            </button>
          );
        })}
>>>>>>> b5241a2 (예약 페이지에서 현재 시간 이전 버튼 비활성화)
      </div>
    );
  }
};
