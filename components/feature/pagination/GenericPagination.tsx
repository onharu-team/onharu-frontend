"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Pagination } from "@/components/feature/pagination/Pagination";

interface GenericPaginationProps {
  totalPages: number;
  className?: string;
  onPageChange?: (page: number) => void;
}

export default function GenericPagination({
  totalPages,
  className,
  onPageChange,
}: GenericPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNum", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={className ?? "mt-10 flex justify-center"}>
      <Pagination totalPage={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
}
