"use client";

import clsx from "clsx";
import {
  RiArrowRightSLine,
  RiArrowRightDoubleLine,
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
} from "@remixicon/react";

interface PaginationProps {
  totalDataCount: number;
  perPageDataCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  className?: string;
}

const PAGE_LIMIT = 5;

const createPageNumberList = (currentPage: number, totalPage: number): number[] => {
  const half = Math.floor(PAGE_LIMIT / 2);

  const startPage = Math.max(
    1,
    Math.min(currentPage - half, Math.max(1, totalPage - PAGE_LIMIT + 1))
  );

  const endPage = Math.min(startPage + PAGE_LIMIT - 1, totalPage);

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalDataCount,
  perPageDataCount,
  className = "",
}: PaginationProps) {
  const totalPage = Math.ceil(totalDataCount / perPageDataCount);
  if (totalPage <= 1) return null;

  const pageNumberList = createPageNumberList(currentPage, totalPage);

  return (
    <div className={clsx("flex items-center gap-5", className)}>
      <button
        className="flex h-16 w-16 items-center justify-center"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        <RiArrowLeftDoubleLine
          size={24}
          className={currentPage === 1 ? "text-gray-400" : "text-main"}
        />
      </button>

      <button
        className="flex h-16 w-16 items-center justify-center"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <RiArrowLeftSLine size={24} className={currentPage === 1 ? "text-gray-400" : "text-main"} />
      </button>

      <ul className="flex gap-5">
        {pageNumberList.map(item => (
          <li
            key={item}
            onClick={() => setCurrentPage(item)}
            className={clsx(
              "flex h-16 w-16 cursor-pointer items-center justify-center rounded-full text-lg font-extrabold",
              {
                "bg-main text-white": currentPage === item,
                "text-main hover:bg-border": currentPage !== item,
              }
            )}
          >
            {item}
          </li>
        ))}
      </ul>

      <button
        className="flex h-16 w-16 items-center justify-center"
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <RiArrowRightSLine
          size={24}
          className={currentPage === totalPage ? "text-gray-400" : "text-main"}
        />
      </button>

      <button
        className="flex h-16 w-16 items-center justify-center"
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage(totalPage)}
      >
        <RiArrowRightDoubleLine
          size={24}
          className={currentPage === totalPage ? "text-gray-400" : "text-main"}
        />
      </button>
    </div>
  );
}
