import {
  RiUserSmileLine,
  RiCalendarLine,
  RiHandHeartLine,
  RiNotification3Line,
} from "@remixicon/react";

export const ownerMenu = [
  {
    title: "회원정보 관리",
    icon: RiUserSmileLine,
    items: [
      { label: "회원정보 수정", href: "/mypage/account/edit" },
      { label: "비밀번호 변경", href: "/mypage/account/password" },
      { label: "회원탈퇴", href: "/mypage/account/withdraw" },
    ],
  },
  {
    title: "나눔관리",
    icon: RiCalendarLine,
    items: [
      { label: "나눔 등록", href: "/mypage/sharing/create" },
      { label: "나눔 내역 관리", href: "/mypage/sharing/history" },
      { label: "예약 내역 관리", href: "/mypage/sharing/reservations" },
    ],
  },
  {
    title: "가게 관리",
    icon: RiHandHeartLine,
    items: [
      { label: "가게 등록/수정", href: "/mypage/store/edit" },
      { label: "내가 받은 감사카드", href: "/mypage/store/thanks" },
      { label: "1:1 문의하기", href: "/mypage/store/inquiry" },
    ],
  },
  {
    title: "알림",
    icon: RiNotification3Line,
    items: [
      { label: "알림 내역", href: "/mypage/notifications" },
      { label: "알림 설정", href: "/mypage/notifications/settings" },
    ],
  },
];

export const childMenu = [
  {
    title: "회원정보 관리",
    icon: RiUserSmileLine,
    items: [
      { label: "회원정보 수정", href: "/mypage/account/edit" },
      { label: "비밀번호 변경", href: "/mypage/account/password" },
      { label: "증명서류 보기", href: "/mypage/account/documents" },
      { label: "회원탈퇴", href: "/mypage/account/withdraw" },
    ],
  },
  {
    title: "예약 관리",
    icon: RiUserSmileLine,
    items: [{ label: "예약 내역", href: "/mypage/reservations" }],
  },
  {
    title: "나의 활동",
    icon: RiHandHeartLine,
    items: [
      { label: "감사 리뷰", href: "/mypage/activity/reviews" },
      { label: "감사 목록", href: "/mypage/activity/thanks" },
      { label: "1:1 문의하기", href: "/mypage/activity/inquiry" },
    ],
  },
  {
    title: "알림",
    icon: RiNotification3Line,
    items: [
      { label: "알림 내역", href: "/mypage/notifications" },
      { label: "알림 설정", href: "/mypage/notifications/settings" },
    ],
  },
];
