import { format, isToday } from "date-fns";
import clsx from "clsx";
import { GroupedReservations } from "@/components/feature/reservation/type/ReservationType";

interface ReservationTimeProps {
  data: GroupedReservations;
  selectedDate: Date | null;
  selectedTime: string | string[] | null;
  handleSelectTime: (value: string) => void;
  existingSchedules?: Record<string, string[]>;
}

export const ReservationTime = ({
  data,
  selectedDate,
  selectedTime,
  handleSelectTime,
  existingSchedules,
}: ReservationTimeProps) => {
  const formatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const timesForSelectedDate = data[formatted] || [];
  const existingTimes = existingSchedules?.[formatted] ?? [];
  const now = new Date();

  if (!timesForSelectedDate.length) return null;

  return (
    <div className="grid grid-cols-4 gap-2">
      {timesForSelectedDate.map(slot => {
        const isBooked = existingTimes.includes(slot.time);

        const isPastTime =
          selectedDate && isToday(selectedDate)
            ? (() => {
                const [hour, minute] = slot.time.split(":").map(Number);
                const timeDate = new Date(selectedDate);
                timeDate.setHours(hour, minute, 0, 0);
                return timeDate <= now;
              })()
            : false;

        const isDisabled = !slot.isAvailable || isBooked || isPastTime;

        const isSelected = Array.isArray(selectedTime)
          ? selectedTime.includes(slot.time)
          : selectedTime === slot.time;

        return (
          <button
            key={`${formatted}-${slot.time}`}
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
    </div>
  );
};
