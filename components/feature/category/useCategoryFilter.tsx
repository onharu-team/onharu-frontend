"use client";

import { useState } from "react";
import { CategoryName } from "./data";

export function useCategoryFilter() {
  const [category, setCategory] = useState<CategoryName>("전체");

  // const filterByCategory = <T extends { categoryName: CategoryName }>(items: T[]) => {
  //   if (category === "전체") return items;
  //   return items.filter(item => item.categoryName === category);
  // };

  const filterByCategory = (value: string) => {
    //value : 전체,식당,카페...
  };

  return {
    category,
    setCategory,
    filterByCategory,
  };
}
