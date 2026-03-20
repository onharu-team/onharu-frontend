import { Schedule } from "../../types";

interface ScheduleItemProps {
  schedule: Schedule;
  onDelete: (id: number) => void;
  isPending: boolean;
}

export const ScheduleItem = ({ schedule, onDelete, isPending }: ScheduleItemProps) => (
  <div className="border-border flex w-full items-center justify-between rounded-md border bg-white px-2 py-2 sm:px-4 sm:py-3">
    <div className="flex flex-col items-center gap-1 sm:flex-row">
      <div className="text-xs font-medium sm:text-sm">
        {schedule.time} ~ {schedule.endTime} · 최대 {schedule.maxPeople}명
        {!schedule.isAvailable && <span className="text-main"> · 예약 있음</span>}
      </div>
    </div>
    <button
      type="button"
      onClick={() => onDelete(schedule.id)}
      disabled={isPending || !schedule.isAvailable}
      className={`rounded-full p-1 text-xs font-semibold sm:p-2 ${
        isPending || !schedule.isAvailable
          ? "cursor-not-allowed bg-gray-300 text-gray-500"
          : "bg-main-400 hover:bg-main-500 cursor-pointer text-gray-900"
      }`}
    >
      {!schedule.isAvailable ? "삭제 불가" : "나눔 삭제"}
    </button>
  </div>
);
