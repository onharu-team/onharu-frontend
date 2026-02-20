export const SelectData = [
  {
    value: "id",
    direction: "asc",
    label: "기본순",
  },
  {
    value: "favoriteCount",
    direction: "desc",
    label: "추천순",
  },
  {
    value: "name",
    direction: "asc",
    label: "이름순",
  },
  {
    value: "distance",
    direction: "asc",
    label: "거리순",
  },
] as const;

export type SortValue = (typeof SelectData)[number]["value"];
export type SrotDirection = (typeof SelectData)[number]["direction"];
export type SortLabel = (typeof SelectData)[number]["label"];
