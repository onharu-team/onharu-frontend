import { NearbyStore } from "./../type/type";

function randomOffset() {
  return (Math.random() - 0.5) * 0.004;
}

export function DummyData(baseLat: number, baseLng: number): NearbyStore[] {
  return [
    // 식당
    {
      id: "1",
      name: "온정식당",
      category: "식당",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 세지로39번길 인근",
      description: "결식아동에게 따뜻한 식사를 나눕니다",
      openTime: "10:00",
      closeTime: "21:00",
      hasSharing: true,
    },
    {
      id: "2",
      name: "행복분식",
      category: "식당",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 세지로 인근",
      description: "아이들을 위한 무료 분식 나눔",
      openTime: "09:00",
      closeTime: "20:00",
      hasSharing: true,
    },

    // 카페
    {
      id: "3",
      name: "마음카페",
      category: "카페",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 세지로 인근",
      description: "아이들에게 무료 음료 제공",
      openTime: "10:00",
      closeTime: "21:00",
      hasSharing: true,
    },
    {
      id: "4",
      name: "오늘의 커피",
      category: "카페",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 세지로39번길 인근",
      description: "청소년 휴식 공간 제공",
      openTime: "11:00",
      closeTime: "22:00",
      hasSharing: false,
    },

    // 의료
    {
      id: "5",
      name: "세지로 한의원",
      category: "의료",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 세지로 인근",
      description: "아동 대상 무료 건강 상담",
      openTime: "09:30",
      closeTime: "18:30",
      hasSharing: true,
    },
    {
      id: "6",
      name: "권선 우리병원",
      category: "의료",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 인근",
      description: "취약계층 진료비 일부 지원",
      openTime: "09:00",
      closeTime: "17:00",
      hasSharing: false,
    },

    // 교육
    {
      id: "7",
      name: "희망 공부방",
      category: "교육",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 세지로 인근",
      description: "초등학생 대상 무료 학습 지도",
      openTime: "16:00",
      closeTime: "19:00",
      hasSharing: false,
    },
    {
      id: "8",
      name: "꿈나무 피아노교실",
      category: "교육",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 인근",
      description: "저소득층 아동 음악 교육 지원",
      openTime: "14:00",
      closeTime: "20:00",
      hasSharing: false,
    },

    // 생활
    {
      id: "9",
      name: "행복 세탁소",
      category: "생활",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 세지로 인근",
      description: "아동 가정 무료 세탁 서비스",
      openTime: "09:00",
      closeTime: "19:00",
      hasSharing: true,
    },
    {
      id: "10",
      name: "우리동네 문구점",
      category: "생활",
      lat: baseLat + randomOffset(),
      lng: baseLng + randomOffset(),
      address: "경기 수원시 권선구 인근",
      description: "학용품 일부 무료 제공",
      openTime: "10:00",
      closeTime: "20:00",
      hasSharing: true,
    },
  ];
}
