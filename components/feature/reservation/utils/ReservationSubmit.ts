import { Toast } from "../../toast/Toast";

export const handleReservationSubmit = async (
  selectedDate: Date | null,
  selectedTime: string | null,
  people: number,
  storeId: string,
  storeScheduleId: number | null
) => {
  if (!selectedDate || !selectedTime || !storeScheduleId) {
    Toast("warning", "예약이 완료되지 않았습니다.", "날짜 혹은 시간을 정확히 선택해 주세요.");
    return;
  }

  try {
    const res = await fetch(`/api/childrens/stores/${storeId}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeScheduleId, people }),
    });

    if (!res.ok) throw new Error("예약 실패");

    Toast("success", "예약이 완료되었습니다!", "사장님이 수락하면 예약이 확정됩니다.");
  } catch (e) {
    Toast("error", "예약 중 오류가 발생했습니다.", "다시 시도해 주세요.");
    console.log(e);
  }
};
