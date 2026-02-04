export const CATEGORY_OPTIONS = [
  { label: "식당", value: "식당" },
  { label: "카페", value: "카페" },
  { label: "의료", value: "의료" },
  { label: "교육", value: "교육" },
  { label: "생활", value: "생활" },
];

export const TIME_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const hour = String(9 + i).padStart(2, "0");
  return { label: `${hour}:00`, value: `${hour}:00` };
});

