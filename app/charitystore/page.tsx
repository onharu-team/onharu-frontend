"use client";
import { Navigation } from "@/components/feature/category/Navigation";
import { BgrDropdown } from "@/components/feature/dropdown/Dropdown";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";
import { Card } from "@/components/ui/card/Card";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import { Pagination } from "@/components/feature/pagination/Pagination";
import { usePagination } from "@/components/feature/pagination/usePagination";
import { paginate } from "@/components/feature/pagination/utils/paginate";
import { dummyStores } from "./data/data";
import { useDropdown } from "@/components/feature/dropdown/useDropdown";
import { SelectData } from "./data/dropdown";

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

  const {
    open,
    selected,
    highlightedIndex,
    setSelected,
    setHighlightedIndex,
    handleOpen,
    handleClose,
    handleKeyDown,
    containerRef,
    listboxRef,
  } = useDropdown({ options: SelectData });

  const filterStore = filterByCategory(dummyStores);
  /**
   * 현재 filter 로직은 카테고리별 정렬만 구현한 상태입니다.
   * 추천순, 인기순, 거리순 관련 정보를 어떻게 표현할지 기능 완성 후 고도화시킬 예정
   * 현재 드롭다운 셀렉트 기능만 구현된 상태
   * **/
  const paginatedStores = paginate(filterStore, currentPage, 16);

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <h2 className="sr-only">나눔 가게 전체 보기</h2>
      <div className="wrapper">
        <Navigation value={category} onChange={setCategory} InitializePage={handleFirstPage} />
        <BgrDropdown
          options={SelectData}
          open={open}
          selected={selected}
          highlightedIndex={highlightedIndex}
          setSelected={setSelected}
          setHighlightedIndex={setHighlightedIndex}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleKeyDown={handleKeyDown}
          containerRef={containerRef}
          listboxRef={listboxRef}
        />
        <div className="mt-4 grid grid-cols-2 gap-4 md:mt-8 lg:grid-cols-4">
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
