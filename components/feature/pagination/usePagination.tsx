"use client";
import { useState } from "react";

export function usePagination() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleFirstPage = () => {
    //무조건 첫번째 페이지로 이동합니다
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    //이전 페이지로 이동합니다
    setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleLastPage = (page: number) => {
    setCurrentPage(page);
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
