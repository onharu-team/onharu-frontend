const categories = ["전체", "식당", "카페", "의료", "교육", "생활"] as const;

export const dummyStores = Array.from({ length: 200 }, (_, i) => ({
  storelink: `#store${i + 1}`,
  storename: `가게 ${i + 1}`,
  storeIntroduce: `이 가게는 맛있습니다 ${i + 1}`,
  category: categories[i % categories.length],
  hashtags: ["밥", "친절", "깔끔"],
}));
