import clsx from "clsx";
import { PERIODS } from "../constants/schedule";

export function PeriodSelect({
  period,
  onPeriodChange,
}: {
  period: string | null;
  onPeriodChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-1.25 sm:gap-2.5">
      {PERIODS.map(p => (
        <button
          key={p}
          onClick={() => onPeriodChange(p)}
          className={clsx(
            "border-border h-7.75 w-20 rounded-full border text-sm font-medium sm:text-base",
            period === p ? "bg-main text-white" : "bg-white"
          )}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
