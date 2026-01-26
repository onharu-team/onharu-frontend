const PAGE_LIMIT = 5;

export const createPageNumberList = (currentPage: number, totalPage: number): number[] => {
  const pageGroup = Math.floor((currentPage - 1) / PAGE_LIMIT);
  const startPage = pageGroup * PAGE_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_LIMIT - 1, totalPage);
  //ex ) current page 6페이지일때, pageGroup은 1번째 그룹
  // startPage는 6
  // endPage는 10 또는 마지막페이지 중 작은쪽

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};
