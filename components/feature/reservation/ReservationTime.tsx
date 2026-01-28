import { format } from "date-fns";
import { GroupedReservations } from "@/components/feature/reservation/type/ReservationType";
import clsx from "clsx";

interface ReservationTimeProps {
  data: GroupedReservations;
  selectedDate: Date | null;
  selectedTime: string | null;
  handleSelectTime: (value: string) => void;
}

export const ReservationTime = ({
  data,
  selectedDate,
  selectedTime,
  handleSelectTime,
}: ReservationTimeProps) => {
  const formatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const timesForSelectedDate = data[formatted] || [];

  if (timesForSelectedDate.length > 0) {
    return (
      <div className="grid grid-cols-4 gap-2">
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
      </div>
    );
  }
};
