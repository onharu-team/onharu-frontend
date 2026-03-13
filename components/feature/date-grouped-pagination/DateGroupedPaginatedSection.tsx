"use client";

import { useMemo, ReactNode } from "react";
import GenericPagination from "../pagination/GenericPagination";

interface Props<T> {
  items: T[];
  totalPage: number;
  getDate: (item: T) => string;
  render: (item: T) => ReactNode;
}

export default function DateGroupedPaginatedSection<T>({
  items,
  totalPage,
  getDate,
  render,
}: Props<T>) {
  // 날짜 기준 정렬
  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) => new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime()
    );
  }, [items, getDate]);

  // 날짜별 그룹핑
  const grouped = useMemo(() => {
    return sortedItems.reduce<Record<string, T[]>>((acc, item) => {
      const rawDate = getDate(item).split("T")[0];

      const formattedDate = new Date(rawDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push(item);
      return acc;
    }, {});
  }, [sortedItems, getDate]);

  const dates = Object.keys(grouped);

  return (
    <div className="relative mb-10">
      <ul className="mt-6 flex flex-col gap-4">
        {dates.map(date => (
          <div key={date}>
            <div className="mb-2 text-sm font-medium">{date}</div>
            {grouped[date].map(render)}
          </div>
        ))}
      </ul>

      <GenericPagination totalPages={totalPage} />
    </div>
  );
}
