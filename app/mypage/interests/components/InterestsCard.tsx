"use client";

import clsx from "clsx";
import Image from "next/image";
import GenericPagination from "@/components/feature/pagination/GenericPagination";
import ButtonGroup from "./ButtonGroup";
import LikeButton from "../../../../components/feature/LikeButton";
import { FavoritesResponse } from "@/lib/api/types/favorites";

export default function InterestsCard({ items }: { items: FavoritesResponse }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {items.favorites.map(item => {
        const displayImage = item.image?.[0] || "/image/page/no-image.svg";
        const shareMessage = item.isShare
          ? "현재 나눔 중인 가게입니다!"
          : "현재 나눔 준비중입니다.";

        return (
          <div key={item.id} className="bg-secondary flex gap-2 rounded-[10px] p-2 sm:gap-5 sm:p-5">
            <div className="relative hidden h-37.5 w-37.5 overflow-hidden rounded-[10px] sm:block">
              <Image src={displayImage} alt={item.storeName} fill className="object-cover" />
            </div>

            <div className="relative flex-1">
              <div className="flex gap-1">
                <div className="relative h-18.75 w-18.75 shrink-0 overflow-hidden rounded-[10px] sm:hidden">
                  <Image src={displayImage} alt={item.storeName} fill className="object-cover" />
                </div>

                <div>
                  <p
                    className={clsx("text-sm font-medium sm:text-base", {
                      "text-main": item.isShare,
                      "text-text-secondary": !item.isShare,
                    })}
                  >
                    {shareMessage}
                  </p>
                  <h3 className="sm:text-md text-base font-bold">{item.storeName}</h3>
                  <p className="text-text-secondary text-sm sm:text-base">{item.address}</p>
                </div>
              </div>

              <ButtonGroup isShare={item.isShare} storeId={item.storeId} />

              <LikeButton storeId={item.storeId} isLiked={true} />
            </div>
          </div>
        );
      })}

      {items.currentPage > 1 && <GenericPagination totalPages={items.totalPages} />}
    </div>
  );
}
