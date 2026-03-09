"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/feature/pagination/Pagination";
import Link from "next/link";
import { UserRole } from "@/lib/api/types/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { formatDateLabel } from "@/utils/formatDateLabel";
import { ReviewsData } from "../types";
import DeleteReviewButton from "./DeleteReviewButton";

interface Props {
  items: ReviewsData | null;
  role: UserRole;
  hasUsed?: boolean;
}

function ReviewActionButtons({ storeId, reviewId }: { storeId: number; reviewId: number }) {
  return (
    <div className="flex gap-2">
      <Link href={`/charitystore/${storeId}`} className="w-full">
        <Button varient="light" width="lg" height="sm" fontSize="sm">
          매장 보러가기
        </Button>
      </Link>
      <DeleteReviewButton reviewId={reviewId} />
    </div>
  );
}

export default function ReviewsContent({ items, role, hasUsed = false }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isOwner = role === "OWNER";

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNum", String(page));
    router.push(`?${params.toString()}`);
  };

  if (!items || items.reviews.length === 0) {
    if (!isOwner && hasUsed) {
      return (
        <div>
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
          총 <span className="text-main font-bold">{items.totalCount}개</span>의 감사카드를
          {isOwner ? "받았어요!" : "전달했어요!"}
        </p>
      </div>

      {items.reviews.map(({ id, nickname, storeId, content, createAt }) => {
        const date = formatDateLabel(createAt);

        return (
          <div key={id} className="bg-secondary mb-2 rounded-[10px] p-4 sm:mb-5 sm:p-8">
            <div className="flex items-center gap-5">
              <div className="relative h-6.25 w-7.5 sm:h-10.75 sm:w-12.5">
                <Image
                  src="/image/page/reservation-img2.svg"
                  alt=""
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>

              <div className="relative flex-1 text-xs sm:text-base">
                <p>
                  {nickname}
                  {isOwner ? "님의 따뜻한 감사 인사" : "사장님께"}
                </p>

                <p className="text-text-secondary">{date}</p>

                {!isOwner && (
                  <div className="absolute top-0 right-0 hidden w-full max-w-60 sm:block">
                    <ReviewActionButtons storeId={storeId} reviewId={id} />
                  </div>
                )}
              </div>
            </div>

            <p className="sm:text-md mt-2 text-xs font-medium break-keep sm:mt-5">{content}</p>

            {!isOwner && (
              <div className="mt-3 sm:hidden">
                <ReviewActionButtons storeId={storeId} reviewId={id} />
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-10 flex justify-center">
        <Pagination totalPage={items.totalPages} handlePageChange={handlePageChange} />
      </div>
    </>
  );
}
