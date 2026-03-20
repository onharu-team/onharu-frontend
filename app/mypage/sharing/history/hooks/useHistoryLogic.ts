import { useState, useMemo } from "react";
import { useAuthProfile } from "@/hooks/useAuth";
import { useCalendarSelect } from "@/components/feature/calendar/useCalendarSelect";
import { useStoreSchedules } from "@/hooks/UseStoreSchedules";
import { useDeleteStoreSchedules } from "@/hooks/useDeleteStoreSchedules";
import useModal from "@/hooks/ui/useModal";
import { Toast } from "@/components/feature/toast/Toast";
import { OwnerData } from "@/lib/api/types/auth";

export const useHistoryLogic = () => {
  const today = new Date();

  // 날짜 및 캘린더 관련 상태
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const { selectedDate, setSelectedDate } = useCalendarSelect();

  // 유저 정보, storeId
  const { data: user } = useAuthProfile() as { data: OwnerData };
  const storeId = String(user?.stores[0]);

  // 매장 스케줄 조회
  const { detailed } = useStoreSchedules({
    storeId,
    params: { year: String(currentYear), month: String(currentMonth) },
  });

  // 예약 내역이 있는 날짜 목록
  const reservedDates = useMemo(() => Object.keys(detailed), [detailed]);

  // 모달 및 삭제 대상 관리 상태
  const { open: modalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [pendingDeleteIdList, setPendingDeleteIdList] = useState<number[]>([]);

  // 매장 스케줄 삭제
  const deleteMutation = useDeleteStoreSchedules(storeId);

  // 선택된 날짜의 포맷팅 키 (YYYY-MM-DD)
  const selectedDayKey = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  // 선택된 날짜의 스케줄 리스트
  const selectedDaySchedules = detailed[selectedDayKey] || [];

  /**
   * 삭제 요청 처리 (모달 오픈)
   * @param id - 단일 삭제 시 스케줄 ID, 미전달 시 전체 삭제로 간주
   */
  const handleRequestDelete = (id?: number) => {
    if (id !== undefined) {
      // 단일 삭제 설정
      setPendingDeleteId(id);
      setPendingDeleteIdList([]);
    } else {
      // 해당 날짜의 삭제 가능한 모든 ID 설정
      const availableIds = selectedDaySchedules.filter(s => s.isAvailable).map(s => s.id);
      setPendingDeleteIdList(availableIds);
      setPendingDeleteId(null);
    }
    handleOpenModal();
  };

  // 스케줄 삭제 확정 처리
  const handleConfirmDelete = () => {
    const idsToDelete = pendingDeleteId !== null ? [pendingDeleteId] : pendingDeleteIdList;
    if (idsToDelete.length === 0) return;

    deleteMutation.mutate(idsToDelete, {
      onSuccess: () => {
        handleCloseModal();
        setPendingDeleteId(null);
        setPendingDeleteIdList([]);
        Toast("success", "나눔이 삭제되었습니다.");
      },
      onError: () => Toast("error", "나눔 삭제에 실패했습니다.", '잠시후에 다시 시도해주세요.'),
    });
  };

  return {
    state: {
      selectedDate,
      reservedDates,
      selectedDaySchedules,
      modalOpen,
      deleteMutation,
      pendingDeleteId,
      pendingDeleteIdList,
    },
    actions: {
      setSelectedDate,
      setCurrentYear,
      setCurrentMonth,
      handleRequestDelete,
      handleConfirmDelete,
      handleCloseModal,
    },
  };
};
