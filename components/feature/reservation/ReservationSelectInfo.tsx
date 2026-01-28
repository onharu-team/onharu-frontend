import { format } from "date-fns";

interface ReservationSelectInfoProps {
  selectedTime: string | null;
  selectedDate?: Date | null;
}

export const ReservationSelectInfo = ({
  selectedTime,
  selectedDate,
}: ReservationSelectInfoProps) => {
  return (
    <div className="md:text-md w-full rounded-md border border-gray-300 py-3.5 text-center text-sm font-semibold md:py-5.5">
      {selectedDate && selectedTime && (
        <p>
          선택된 일정 :{" "}
          <span className="text-main">
            {format(selectedDate, "yyyy-MM-dd")} {selectedTime}
          </span>
        </p>
      )}

      {(!selectedDate || !selectedTime) && <p>선택된 일정이 없습니다.</p>}
    </div>
  );
};
