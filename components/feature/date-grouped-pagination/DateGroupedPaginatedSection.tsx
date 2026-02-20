// "use client";

// import { useMemo, useEffect, ReactNode } from "react";
// import { Pagination } from "@/components/feature/pagination/Pagination";
// import { usePagination } from "@/components/feature/pagination/usePagination";
// import { paginate } from "@/components/feature/pagination/utils/paginate";

// interface Props<T> {
//   items: T[];
//   getDate: (item: T) => string;
//   render: (item: T) => ReactNode;
//   emptyText?: string;
//   perPage?: number;
// }

// interface FlatItem<T> {
//   date: string;
//   item: T;
// }

// export default function DateGroupedPaginatedSection<T>({
//   items,
//   getDate,
//   render,
//   emptyText = "내역이 없습니다.",
//   perPage = 4,
// }: Props<T>) {
//   // 날짜별 그룹핑, 최신순 정렬
//   const flatItems: FlatItem<T>[] = useMemo(() => {
//     const grouped = items.reduce<Record<string, T[]>>((acc, item) => {
//       const dateKey = getDate(item).split("T")[0];
//       (acc[dateKey] = acc[dateKey] || []).push(item);
//       return acc;
//     }, {});

//     return Object.keys(grouped)
//       .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
//       .flatMap(date =>
//         grouped[date].map(item => ({
//           date: new Date(date).toLocaleDateString("ko-KR", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           item,
//         }))
//       );
//   }, [items, getDate]);

//   // 페이지 상태 관리
//   const {
//     currentPage,
//     setCurrentPage,
//     handleFirstPage,
//     handlePrevPage,
//     handleNextPage,
//     handleLastPage,
//   } = usePagination({ totalDataCount: flatItems.length, perPageDataCount: perPage });

//   // 현재 페이지 데이터
//   const paginatedItems = paginate(flatItems, currentPage, perPage);

//   // 페이지별 날짜 그룹핑
//   const groupedPage: Record<string, T[]> = paginatedItems.reduce(
//     (acc, { date, item }) => {
//       (acc[date] = acc[date] || []).push(item);
//       return acc;
//     },
//     {} as Record<string, T[]>
//   );

//   const dates = Object.keys(groupedPage);

//   // 데이터 변경 시 페이지 초기화
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [items, setCurrentPage]);

//   if (!items.length)
//     return (
//       <p className="sm:text-md bg-secondary mt-6 rounded-[10px] py-8 text-center text-sm font-medium sm:mt-12.5">
//         {emptyText}
//       </p>
//     );

//   return (
//     <div className="relative mb-10">
//       <ul className="mt-6 flex flex-col gap-4 sm:mt-12.5">
//         {dates.map(date => (
//           <div key={date}>
//             <div className="sm:text-md mb-2 text-sm font-medium sm:mb-5">{date}</div>
//             {groupedPage[date].map(render)}
//           </div>
//         ))}
//       </ul>

//       <div className="mt-10 flex justify-center">
//         <Pagination
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           totalDataCount={flatItems.length}
//           perPageDataCount={perPage}
//           handleFirstPage={handleFirstPage}
//           handlePrevPage={handlePrevPage}
//           handleNextPage={handleNextPage}
//           handleLastPage={handleLastPage}
//         />
//       </div>
//     </div>
//   );
// }
