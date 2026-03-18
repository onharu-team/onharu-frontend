import { FormatKoreanDate } from "@/components/feature/reservation/utils/FormatKoreanDate";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { useState } from "react";

interface SelectedReservationListProps {
  selectedTimesMap: Record<string, string[]>;
  handleRemoveTime: (date: string, time: string) => void;
  handleRemoveDate: (date: string) => void;
  handleClearAll: () => void;
}

export function SelectedReservationList({
  selectedTimesMap,
  handleRemoveTime,
  handleRemoveDate,
  handleClearAll,
}: SelectedReservationListProps) {
  const [open, setOpen] = useState(true);

  const entries = Object.entries(selectedTimesMap).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  );

  const totalCount = Object.values(selectedTimesMap).reduce((acc, times) => acc + times.length, 0);

  if (entries.length === 0)
    return (
      <div className="rounded-md border border-gray-300 bg-white p-3 text-center md:p-5">
        <button
          onClick={() => setOpen(prev => !prev)}
          className="md:text-md flex w-full text-sm font-semibold"
        >
          <div>선택된 일정이 없습니다.</div>
        </button>
      </div>
    );

  return (
    <div className="rounded-md border border-gray-300 bg-white p-3 text-center md:p-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => setOpen(prev => !prev)}
          className="md:text-md flex w-full justify-between text-sm font-semibold"
        >
          <div className="flex items-center gap-1 text-base sm:gap-2">
            선택된 일정<span className="text-main">{totalCount}개</span>
            <button
              onClick={handleClearAll}
              className="bg-main-active hover:bg-main cursor-pointer rounded-full p-1 text-xs text-white sm:p-2"
            >
              전체 삭제
            </button>
          </div>
          {open ? <RiArrowDownSLine className="h-6 w-6" /> : <RiArrowUpSLine className="h-6 w-6" />}
        </div>
      </div>

      {/* 드롭다운 */}
      {open && (
        <div className="mt-4 space-y-4">
          {entries.map(([date, times]) => (
            <div key={date}>
              {/* 날짜 + 날짜 삭제 */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium sm:text-base">{FormatKoreanDate(date)}</p>

                <button
                  onClick={() => handleRemoveDate(date)}
                  className="bg-main-400 hover:bg-main-500 cursor-pointer rounded-full p-1 text-xs font-semibold text-gray-900 sm:p-2"
                >
                  날짜 삭제
                </button>
              </div>

              {/* 시간 리스트 */}
              <div className="mt-2 flex flex-wrap gap-2">
                {[...times].sort().map(time => (
                  <div
                    key={time}
                    className="flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base"
                  >
                    <span>{time}</span>

                    <button
                      type="button"
                      onClick={() => handleRemoveTime(date, time)}
                      className="cursor-pointer text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
