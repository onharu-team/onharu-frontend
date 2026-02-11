"use client";

import { useQuery } from "@tanstack/react-query";
import { GetStores } from "@/lib/api/GetStores";
import { CharityMain } from "../page-section/charity-shop/data/type";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Navigation } from "@/components/feature/category/Navigation";
import { BgrDropdown } from "@/components/feature/dropdown/Dropdown";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";
import { Card } from "@/components/ui/card/Card";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import { Pagination } from "@/components/feature/pagination/Pagination";
import { dummyStores } from "./data/data";
import { useDropdown } from "@/components/feature/dropdown/useDropdown";
import { SelectData } from "./data/dropdown";
import { Thumbnail } from "@/components/ui/card/Thumbnail";

export default function CharityStore() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);

  const handlePageChange = (nextPage: number) => {
    router.push(`/charitystore?page=${nextPage}`);
  };

  const { category, setCategory, filterByCategory } = useCategoryFilter();

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["stores", page, 16],
    queryFn: () => GetStores(page, 16),
  });

  const stores: CharityMain[] = data?.data?.stores ?? [];
  const storesLength = data?.totalCount ?? 16;

  //const filterStore = filterByCategory(dummyStores);
  /**
   * 현재 filter 로직은 카테고리별 정렬만 구현한 상태입니다.
   * 추천순, 인기순, 거리순 관련 정보를 어떻게 표현할지 기능 완성 후 고도화시킬 예정
   * 현재 드롭다운 셀렉트 기능만 구현된 상태
   * **/
  //const paginatedStores = paginate(stores, currentPage, 16);

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <h2 className="sr-only">나눔 가게 전체 보기</h2>
      <div className="wrapper">
        <Navigation
          value={category}
          onChange={setCategory}
          InitializePage={() => handlePageChange(1)}
        />
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
          {error && <>데이터 로드에 실패했습니다.</>}
          {isLoading && (
            <>
              {Array.from({ length: 16 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </>
          )}
          {!isLoading && (
            <>
              {stores.map(items => (
                <Card
                  key={items.id}
                  type="charity"
                  storeId={items.id}
                  storelink={String(items.storelink)}
                  storeThumnail={
                    <Thumbnail
                      src={""}
                      openTime={items.openTime}
                      closeTime={items.closeTime}
                      isOpen={items.isOpen}
                      hasSharing={items.hasSharing}
                    />
                  }
                  storename={items.name}
                  storeIntroduce={items.introduction}
                  category={<Category category={items.categoryName} />}
                  hashtags={<HashTag tags={items.tags || []} />}
                />
              ))}
            </>
          )}
        </div>

        <div className="mt-section-sm-top md:mt-section-lg-top flex justify-center">
          <Pagination
            currentPage={page}
            totalDataCount={storesLength}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}
