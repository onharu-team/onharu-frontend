"use client";

import { Navigation } from "@/components/feature/category/Navigation";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";
import { Card } from "@/components/ui/card/Card";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import { Pagination } from "@/components/feature/pagination/Pagination";
import { usePagination } from "@/components/feature/pagination/usePagination";
import { paginate } from "@/components/feature/pagination/utils/paginate";
import { dummyStores } from "./data/data";

export default function CharityStore() {
  const { category, setCategory, filterByCategory } = useCategoryFilter();
  const {
    currentPage,
    setCurrentPage,
    handleFirstPage,
    handlePrevPage,
    handleLastPage,
    handleNextPage,
  } = usePagination({ totalDataCount: 180, perPageDataCount: 16 });

  const filterStore = filterByCategory(dummyStores);
  const paginatedStores = paginate(filterStore, currentPage, 16);

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <h2 className="sr-only">나눔 가게 전체 보기</h2>
      <div className="wrapper">
        <Navigation value={category} onChange={setCategory} />
        <div className="mt-section-sm-top md:mt-section-lg-top grid grid-cols-4 gap-4">
          {paginatedStores.map(item => (
            <Card
              key={item.id}
              storelink={item.storelink}
              storename={item.storename}
              storeIntroduce={item.storeIntroduce}
              category={<Category category={item.category} />}
              hashtags={<HashTag tags={item.hashtags} />}
            />
          ))}
        </div>

        <div className="mt-section-sm-top md:mt-section-lg-top flex justify-center">
          <Pagination
            handleFirstPage={handleFirstPage}
            handlePrevPage={handlePrevPage}
            handleLastPage={handleLastPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalDataCount={filterStore.length}
            perPageDataCount={16}
          />
        </div>
      </div>
    </section>
  );
}
