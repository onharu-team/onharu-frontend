export const CategoryData = [
  {
    id: 0,
    icon: "image/page/menu-all.svg",
    name: "전체",
    iconSize: {
      width: 82,
      height: 84,
    },
  },
  {
    id: 1,
    icon: "image/page/menu-food.svg",
    name: "식당",
    iconSize: {
      width: 82,
      height: 84,
    },
  },
  {
    id: 2,
    icon: "image/page/menu-cafe.svg",
    name: "카페",
    iconSize: {
      width: 96,
      height: 79,
    },
  },
  {
    id: 3,
    icon: "image/page/menu-medical.svg",
    name: "의료",
    iconSize: {
      width: 97,
      height: 69,
    },
  },
  {
    id: 4,
    icon: "image/page/menu-study.svg",
    name: "교육",
    iconSize: {
      width: 92,
      height: 87,
    },
  },
  {
    id: 5,
    icon: "image/page/menu-etc.svg",
    name: "생활",
    iconSize: {
      width: 86,
      height: 75,
    },
  },
] as const;

export type CategoryName = (typeof CategoryData)[number]["name"];
