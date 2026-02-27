import { Reservation } from "../types";

/** Owner 시나리오 */
// 가게 등록 전
export const ownerNoStore = {
  hasStore: false,
  shareCount: 0,
  reservations: [],
};

// 나눔 내역 없음
export const ownerNoShare = {
  hasStore: true,
  shareCount: 0,
  reservations: [],
};

// 나눔 내역 있음
export const ownerActive: {
  hasStore: boolean;
  shareCount: number;
  reservations: Reservation[];
} = {
  hasStore: true,
  shareCount: 5,
  reservations: [
    {
      date: "2026-02-01",
      time: "오전 11:00",
      people: 2,
      status: "확정",
    },
    {
      date: "2026-02-03",
      time: "오후 1:00",
      people: 1,
      status: "대기중",
    },
  ],
};

/** Child 데이터 */
// 방문 예정 일정
export const childSchedule = {
  storeName: "행복 제육 볶음",
  storeId: 1,
  address: "서울특별시 강남구 테헤란로 123",
  date: "2026년 1월 10일",
  time: "오전 10:00",
  people: 2,
};

// 리뷰 작성 대상 리스트
export const childReviewList = [
  {
    reservationId: "res_101",
    storeName: "행복 제육 볶음",
    date: "2025-12-25",
    people: 2,
  },
  {
    reservationId: "res_102",
    storeName: "따뜻한 국밥집",
    date: "2026-01-03",
    people: 1,
  },
];
