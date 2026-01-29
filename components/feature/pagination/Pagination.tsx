"use client";
import { PAGELIMIT } from "./data/PageLimit";
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
  handleNextPage: () => void;
  handleLastPage: (page: number) => void;
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
  /**
   * @param totalPage 총 페이지 갯수 = 총 데이터갯수 / 한 페이지당 허용 데이터갯수
   * @param groupLength 그룹 갯수 = 총 페이지 / 5
   * @param LastGroupHead 마지막 그룹의 첫번째 페이지 넘버
   */

  const totalPage = Math.ceil(totalDataCount / perPageDataCount);
  const groupLength = Math.ceil(totalPage / PAGELIMIT);
  const LastGroupHead = PAGELIMIT * (groupLength - 1);

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
        disabled={currentPage === groupLength}
        onClick={() => {
          handleLastPage(LastGroupHead + 1);
        }}
      >
        <RiArrowRightDoubleLine
          size={18}
          className={currentPage === groupLength ? "text-gray-300" : "text-main"}
        />
      </button>
    </div>
  );
}
