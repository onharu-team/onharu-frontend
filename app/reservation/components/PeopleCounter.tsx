import { cn } from "@/lib/utils";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
interface PeopleCounter {
  counter: number;
  availableCounter: number;
  disabled: boolean;
  handleSubtract: () => void;
  handleAdd: () => void;
}
/**
 * 날짜별로 시간을 그룹핑
 * @param counter 커스텀 훅에서 전달받고 있으며, 선택된 인원수입니다.
 * @param availableCounter 예약 가능한 인원수입니다.
 * @param handleSubtract 커스텀 훅에서 전달받고 있으며, 인원수 감소 함수입니다.
 * @param handleAdd 커스텀 훅에서 전달받고 있으며, 인원수 증가 함수입니다.
 */
export const PeopleCounter = ({
  counter,
  availableCounter,
  disabled,
  handleSubtract,
  handleAdd,
}: PeopleCounter) => {
  const ButtonBaseClasses =
    "focus-visible:bg-main-100 hover:bg-gray-50 cursor-pointer flex w-10 items-center justify-center focus-visible:outline-none md:w-15";

  return (
    <div className="flex items-center justify-between">
      <p className="md:text-md text-sm font-semibold">방문 예정 인원</p>

      <div className="flex h-9 overflow-hidden rounded-md border border-gray-300 md:h-12.5">
        <button
          aria-label="인원수 감소, 최소 1명"
          className={cn(ButtonBaseClasses, disabled && "cursor-default bg-gray-100")}
          onClick={handleSubtract}
          disabled={disabled}
        >
          <RiSubtractLine size={18} className={cn(disabled && "text-gray-400")} />
        </button>
        <div
          aria-live="polite"
          className="md:text-md flex w-[50px] items-center justify-center border-r border-l border-r-gray-300 border-l-gray-300 text-sm font-semibold md:w-[85px]"
        >
          {counter}
        </div>
        <button
          aria-label={`인원수 증가, 최대 ${availableCounter}명`}
          className={cn(ButtonBaseClasses, disabled && "cursor-default bg-gray-100")}
          onClick={handleAdd}
          disabled={disabled}
        >
          <RiAddLine size={18} className={cn(disabled && "text-gray-400")} />
        </button>
      </div>
    </div>
  );
};
