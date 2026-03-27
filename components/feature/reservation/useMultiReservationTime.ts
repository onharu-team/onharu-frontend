import { useState } from "react";
import { format } from "date-fns";

/**
 * 다중 시간 선택 훅
 * - 선택한 날짜별로 시간 배열 관리
 * - 구조: { "2026-03-16": ["10:00", "11:00"], "2026-03-17": ["14:00"] }
 */
export const useMultiReservationTime = ({ selectedDate }: { selectedDate: Date | null }) => {
  const [selectedTimesMap, setSelectedTimesMap] = useState<Record<string, string[]>>({});

  // 현재 선택된 날짜를 키 형식으로 변환 ("yyyy-MM-dd")
  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  // 현재 날짜에 선택된 시간 배열, 없으면 빈 배열
  const selectedTimes = dateKey ? selectedTimesMap[dateKey] || [] : [];

  // 시간 선택/해제 처리 - 이미 선택된 시간은 제거, 새로운 시간은 추가
  const handleSelectTimes = (value: string) => {
    if (!dateKey) return;

    setSelectedTimesMap(prev => {
      const currentTimes = prev[dateKey] || [];
      const isExisting = currentTimes.includes(value);

      const newTimes = isExisting
        ? currentTimes.filter(t => t !== value)
        : [...currentTimes, value];

      // 시간 배열이 비어 있으면 날짜 키 삭제
      if (newTimes.length === 0) {
        const newMap = { ...prev };
        delete newMap[dateKey];
        return newMap;
      }

      return {
        ...prev,
        [dateKey]: newTimes,
      };
    });
  };

  // 특정 날짜에서 특정 시간 제거 - 시간이 모두 제거되면 날짜 키 자체 삭제
  const handleRemoveTime = (dateKey: string, time: string) => {
    setSelectedTimesMap(prev => {
      const currentTimes = prev[dateKey] || [];

      const updatedTimes = currentTimes.filter(t => t !== time);

      if (updatedTimes.length === 0) {
        const newMap = { ...prev };
        delete newMap[dateKey];
        return newMap;
      }

      return {
        ...prev,
        [dateKey]: updatedTimes,
      };
    });
  };

  // 특정 날짜 전체 제거
  const handleRemoveDate = (date: string) => {
    setSelectedTimesMap(prev => {
      const newMap = { ...prev };
      delete newMap[date];
      return newMap;
    });
  };

  // 모든 선택 초기화
  const handleClearAll = () => {
    setSelectedTimesMap({});
  };

  return {
    selectedTimes,
    handleSelectTimes,
    selectedTimesMap,
    handleRemoveTime,
    handleRemoveDate,
    handleClearAll,
  };
};
