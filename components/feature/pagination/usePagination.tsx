"use client";
import { useState } from "react";

export function usePagination({
  totalDataCount,
  perPageDataCount,
}: {
  totalDataCount: number;
  perPageDataCount: number;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPage = Math.ceil(totalDataCount / perPageDataCount);

  const handleFirstPage = () => {
    //무조건 첫번째 페이지로 이동합니다
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    //이전 페이지로 이동합니다
    setCurrentPage(prev => prev - 1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPage);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  return {
    currentPage,
    setCurrentPage,
    handleFirstPage,
    handlePrevPage,
    handleLastPage,
    handleNextPage,
  };
}
