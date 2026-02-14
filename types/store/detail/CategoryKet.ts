export const CATEGORY = {
  all: "전체",
  restaurant: "식당",
  cafe: "카페",
  medical: "의료",
  education: "교육",
  life: "생활",
} as const;

export type CategoryKey = keyof typeof CATEGORY;
export type CategoryLabel = (typeof CATEGORY)[CategoryKey];

export const categoryReverseMap: Record<CategoryLabel, CategoryKey> = {
  전체: "all",
  식당: "restaurant",
  카페: "cafe",
  의료: "medical",
  교육: "education",
  생활: "life",
};
