import { useState } from "react";
import { Toast } from "@/components/feature/toast/Toast";

export const usePeopleCounter = ({ availableCounter }: { availableCounter: number }) => {
  const [counter, setCounter] = useState(1);

  const MIN_COUNTER = 1;
  const AVAILABLE_COUNTER = availableCounter;
  //발행자가 설정한 최대 예약 가능 인원

  const handleCounterInit = () => {
    setCounter(1);
  };

  const handleAdd = () => {
    if (counter + 1 > AVAILABLE_COUNTER) {
      Toast("warning", "예약 가능 인원이 초과됐습니다.", "예약 가능 인원을 다시 선택하세요.");
      return;
    }
    setCounter(prev => prev + 1);
  };

  const handleSubtract = () => {
    if (counter - 1 < MIN_COUNTER) {
      Toast("warning", "예약 인원 입력이 실패했습니다.", "최소 한 명 이상 예약해 주세요.");
      return;
    }
    setCounter(prev => prev - 1);
  };

  return { counter, handleAdd, handleSubtract, handleCounterInit };
};
