import { RiCalendar2Line } from "@remixicon/react";
import { DateSummaries } from "@/types/store/schedules/type";

interface ReservationProps {
  data: DateSummaries[] | [];
}

export const Reservation = ({ data }: ReservationProps) => {
  const availableDates = data.filter(day => day.availableSlots > 0);

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  if (availableDates.length !== 0) {
    return (
      <>
        <p className="lg:text-md flex items-center gap-1.5 text-base font-semibold">
          <RiCalendar2Line size={20} /> 이번 달 예약 가능 날짜
        </p>
        {/* 그룹 날짜별 그루핑 */}
        <div>
          {availableDates.map(day => (
            <div key={day.date} className="mt-3 md:mt-6">
              <p>{formatDate(day.date)}</p>
              <div className="mt-3 flex gap-2">
                {
                  day.scheduleSlots
                    .filter(slot => slot.isAvailable) // 개별 슬롯도 isAvailable 체크
                    .map(slot => (
                      <span
                        key={slot.id}
                        className="rounded-md border border-gray-300 px-5 py-1 text-sm md:px-10 md:py-2 md:text-base"
                      >
                        {slot.startTime.slice(0, 5)}
                      </span>
                    )) // "19:00:00" → "19:00"
                }
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return <p className="lg:text-md flex items-center gap-1.5 text-base">나눔 준비중입니다.</p>;
};
