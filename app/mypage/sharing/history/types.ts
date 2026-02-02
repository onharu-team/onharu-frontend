export type SharingHistoryStatus = "ONGOING" | "HISTORY";

export interface SharingHistoryItem {
  id: number;
  status: SharingHistoryStatus; // 진행상태
  availableDates: string[]; // 가능한날짜
  availableTimes: string[]; // 가능한시간
  maxParticipantsPerSlot: number; // 한번에 예약 가능한 인원
  currentParticipants: number; // 신청인원
  remainingParticipants: number; // 신청가능인원
  createdAt: string; // date
}
