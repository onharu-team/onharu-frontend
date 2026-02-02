"use client";

import { paginate } from "@/components/feature/pagination/utils/paginate";
import { StoreItem } from "../types";
import ButtonGroup from "./ButtonGroup";
import LikeButton from "./LikeButton";
import { Pagination } from "@/components/feature/pagination/Pagination";
import { usePagination } from "@/components/feature/pagination/usePagination";
import clsx from "clsx";

interface InterestsCardProps {
  items: StoreItem[];
}

export default function InterestsCard({ items }: InterestsCardProps) {
  const perPageDataCount = 4;

  const {
    currentPage,
    setCurrentPage,
    handleFirstPage,
    handlePrevPage,
    handleLastPage,
    handleNextPage,
  } = usePagination({ totalDataCount: items.length, perPageDataCount });

  const paginatedItems = paginate(items, currentPage, perPageDataCount);

  if (!items.length)
    return (
      <p className="sm:text-md bg-secondary mt-6 rounded-[10px] py-8 text-center text-sm font-medium sm:mt-12.5">
        관심 목록이 없습니다.
      </p>
    );

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {paginatedItems.map(item => {
        const isPreparing = item.status === "PREPARING";

        return (
          <div key={item.id} className="bg-secondary flex gap-2 rounded-[10px] p-2 sm:gap-5 sm:p-5">
            <div className="hidden h-37.5 w-37.5 rounded-[10px] bg-red-500 sm:block">이미지</div>

            <div className="relative flex-1">
              <div className="flex gap-1">
                <div className="h-18.75 w-18.75 rounded-[10px] bg-red-500 sm:hidden"></div>

                <div>
                  <p
                    className={clsx("text-sm font-medium sm:text-base", {
                      "text-main": !isPreparing,
                      "text-text-secondary": isPreparing,
                    })}
                  >
                    {isPreparing ? "현재 나눔 준비중입니다." : "현재 나눔 중인 가게입니다!"}
                  </p>
                  <h3 className="sm:text-md text-base font-bold">{item.name}</h3>
                  <p className="text-text-secondary text-sm sm:text-base">{item.address}</p>
                </div>
              </div>

              <ButtonGroup isPreparing={isPreparing} />

              <LikeButton storeId={item.id} initialLiked={item.isLiked} />
            </div>
          </div>
        );
      })}

      <div className="mt-10 flex justify-center">
        <Pagination
          handleFirstPage={handleFirstPage}
          handlePrevPage={handlePrevPage}
          handleLastPage={handleLastPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalDataCount={items.length}
          perPageDataCount={perPageDataCount}
        />
      </div>
    </div>
  );
}
