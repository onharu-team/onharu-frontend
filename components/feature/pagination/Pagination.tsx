"use client";

import { createPageNumberList } from "./utils/utils";
import clsx from "clsx";
import {
  RiArrowRightSLine,
  RiArrowRightDoubleLine,
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
} from "@remixicon/react";

interface PaginationProps {
  handleFirstPage: () => void;
  handlePrevPage: () => void;
  handleLastPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalDataCount: number;
  perPageDataCount: number;
}

export function Pagination({
  handleFirstPage,
  handlePrevPage,
  handleLastPage,
  handleNextPage,
  currentPage,
  setCurrentPage,
  totalDataCount,
  perPageDataCount,
}: PaginationProps) {
  const totalPage = Math.ceil(totalDataCount / perPageDataCount);
  if (totalPage <= 1) return null;

  const pageNumberList = createPageNumberList(currentPage, totalPage);

  return (
    <div className={clsx("flex items-center gap-1")}>
      <button
        className="flex h-7 w-7 items-center justify-center"
        disabled={currentPage === 1}
        onClick={handleFirstPage}
      >
        <RiArrowLeftDoubleLine
          size={18}
          className={currentPage === 1 ? "text-gray-300" : "text-main"}
        />
      </button>

      <button
        className="flex h-7 w-7 items-center justify-center"
        disabled={currentPage === 1}
        onClick={handlePrevPage}
      >
        <RiArrowLeftSLine size={18} className={currentPage === 1 ? "text-gray-300" : "text-main"} />
      </button>

      <ul className="flex gap-1">
        {pageNumberList.map(item => (
          <li
            key={item}
            onClick={() => setCurrentPage(item)}
            className={clsx(
              "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-sm",
              {
                "bg-main font-bold text-white": currentPage === item,
                "text-main hover:bg-border": currentPage !== item,
              }
            )}
          >
            {item}
          </li>
        ))}
      </ul>

      <button
        className="flex h-7 w-7 items-center justify-center"
        disabled={currentPage === totalPage}
        onClick={handleNextPage}
      >
        <RiArrowRightSLine
          size={18}
          className={currentPage === totalPage ? "text-gray-300" : "text-main"}
        />
      </button>

      <button
        className="flex h-7 w-7 items-center justify-center"
        disabled={currentPage === totalPage}
        onClick={handleLastPage}
      >
        <RiArrowRightDoubleLine
          size={18}
          className={currentPage === totalPage ? "text-gray-300" : "text-main"}
        />
      </button>
    </div>
  );
}
