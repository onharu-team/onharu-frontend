"use client";

import { useFavoriteMutation } from "@/hooks/useFavorite";
import { RiPokerHeartsFill } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  storeId: number;
  isLiked: boolean;
  className?: string;
}

export default function LikeButton({ storeId, isLiked, className }: LikeButtonProps) {
  const { mutate: toggleLike, isPending } = useFavoriteMutation();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isPending) return;

    toggleLike(storeId);
  };

  return (
    <button
      type="button"
      className={cn("absolute top-0 right-0 p-2 transition-transform active:scale-90", className)}
      onClick={handleLikeClick}
      disabled={isPending}
    >
      {isLiked ? (
        <RiPokerHeartsFill
          size={24}
          color="rgba(235,50,35,1)"
          className={isPending ? "animate-pulse" : ""}
        />
      ) : (
        <RiPokerHeartsFill
          size={24}
          color="rgba(153,153,153,1)"
          className={isPending ? "animate-pulse" : ""}
        />
      )}
    </button>
  );
}
