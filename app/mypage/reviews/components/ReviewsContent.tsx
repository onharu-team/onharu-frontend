"use client";

import Image from "next/image";
import { ReviewItem } from "../types";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/feature/pagination/Pagination";
import { usePagination } from "@/components/feature/pagination/usePagination";
import { paginate } from "@/components/feature/pagination/utils/paginate";
import Link from "next/link";

interface Props {
  items: ReviewItem[];
  role: "child" | "owner";
  hasUsed?: boolean;
}

export default function ReviewsContent({ items, role, hasUsed = false }: Props) {
  const isOwner = role === "owner";
  const perPageDataCount = 5;

  const {
    currentPage,
    setCurrentPage,
    handleFirstPage,
    handlePrevPage,
    handleLastPage,
    handleNextPage,
  } = usePagination({ totalDataCount: items.length, perPageDataCount });

  const paginatedItems = paginate(items, currentPage, perPageDataCount);

  if (!items.length) {
    if (!isOwner && hasUsed) {
      return (
        <div>
          <div className="flex justify-end">
            <Link href="/mypage/reviews/write">
              <Button varient="default" width="md" height="sm" fontSize="md">
                감사카드 작성
              </Button>
            </Link>
          </div>
          <p className="sm:text-md bg-secondary mt-3 rounded-[10px] py-8 text-center text-sm font-medium sm:mt-6">
            감사 리뷰 내역이 없습니다.
          </p>
        </div>
      );
    }

    if (!isOwner && !hasUsed) {
      return (
        <div className="sm:text-md bg-secondary mt-6 flex flex-col items-center gap-2 rounded-[10px] py-8 text-sm font-medium sm:mt-12.5 sm:gap-5">
          나눔 가게를 이용하고 감사 리뷰를 작성 해 보세요!
          <Link href="/charitystore">
            <Button varient="default" width="md" height="sm" fontSize="md">
              나눔가게 보러가기
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <p className="sm:text-md bg-secondary mt-3 rounded-[10px] py-8 text-center text-sm font-medium sm:mt-6">
        감사 리뷰 내역이 없습니다.
      </p>
    );
  }

  return (
    <>
      <div className="my-4 flex flex-col justify-between sm:my-8 sm:flex-row sm:items-center">
        <p className="sm:text-md my-4 text-base sm:my-0">
          총 <span className="text-main font-bold">{items.length}개</span>의 감사카드를{" "}
          {isOwner ? "받았어요!" : "전달했어요!"}
        </p>

        {!isOwner && (
          <Link href="/mypage/reviews/write">
            <Button varient="default" width="md" height="sm" fontSize="md">
              감사카드 작성
            </Button>
          </Link>
        )}
      </div>

      {paginatedItems.map(item => (
        <div key={item.id} className="bg-secondary mb-2 rounded-[10px] p-4 sm:mb-5 sm:p-8">
          <div className="flex items-center gap-5">
            <div className="relative h-6.25 w-7.5 sm:h-10.75 sm:w-12.5">
              <Image
                src="/image/page/reservation-img2.png"
                alt=""
                fill
                sizes="50px"
                className="object-cover"
              />
            </div>

            <div className="relative flex-1 text-xs sm:text-base">
              <p>
                {isOwner ? `${item.nickname}님의 따뜻한 감사 인사` : `${item.storeName} 사장님께`}
              </p>

              <p className="text-text-secondary">{item.createdAt}</p>

              {!isOwner && (
                <div className="absolute top-0 right-0 w-full max-w-25 sm:max-w-35">
                  <Button varient="dark" width="lg" height="sm" fontSize="sm">
                    매장 보러가기
                  </Button>
                </div>
              )}
            </div>
          </div>

          <p className="sm:text-md mt-2 text-xs font-medium break-keep sm:mt-5">{item.content}</p>
        </div>
      ))}

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
    </>
  );
}
