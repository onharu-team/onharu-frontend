"use client";

import { Like } from "@/components/feature/StoreLike";
import { useState } from "react";

interface LikeButtonProps {
  storeId: number;
  initialLiked: boolean;
}

export default function LikeButton({ storeId, initialLiked }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 right-0" onClick={handleClick}>
      <Like isLiked={isLiked} />
    </div>
  );
}
