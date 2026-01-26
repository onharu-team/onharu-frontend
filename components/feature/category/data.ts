export const CategoryData = [
  { id: 1, icon: "image/page/menu-all.svg", name: "전체" },
  { id: 2, icon: "image/page/menu-food.svg", name: "식당" },
  { id: 3, icon: "image/page/menu-cafe.svg", name: "카페" },
  { id: 4, icon: "image/page/menu-medical.svg", name: "의료" },
  { id: 5, icon: "image/page/menu-study.svg", name: "교육" },
  { id: 6, icon: "image/page/menu-etc.svg", name: "생활" },
] as const;

export type CategoryName = (typeof CategoryData)[number]["name"];
