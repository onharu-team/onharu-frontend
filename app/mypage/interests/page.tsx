"use client";

import { useSearchParams } from "next/navigation";
import { PageSection } from "../components/PageSection";
import InterestsCard from "./components/InterestsCard";
import { useFavoritesQuery } from "@/hooks/useFavorite";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function InterestsPage() {
  const searchParams = useSearchParams();

  const pageNum = Number(searchParams.get("pageNum")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 4;

  const { data, isLoading } = useFavoritesQuery({
    pageNum,
    perPage,
  });

  const hasNoData = !data || data.favorites.length === 0;

  return (
    <PageSection title="관심 목록" className="bg-white">
      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: perPage }).map((_, i) => (
            <Skeleton key={i} className="h-23.75 rounded-[10px] sm:h-47.5" />
          ))}
        </div>
      ) : hasNoData ? (
        <p className="sm:text-md bg-secondary mt-6 rounded-[10px] py-8 text-center text-sm font-medium sm:mt-12.5">
          관심 목록이 없습니다.
        </p>
      ) : (
        <InterestsCard items={data} />
      )}
    </PageSection>
  );
}
