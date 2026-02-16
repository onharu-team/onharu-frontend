"use client";
import { useQuery } from "@tanstack/react-query";
import { GetStores } from "@/lib/api/GetStores";
import { CharityMain } from "../../types/store/type";

import { Navigation } from "@/components/feature/category/Navigation";
import { BgrDropdown } from "@/components/feature/dropdown/Dropdown";
import { Card } from "@/components/ui/card/Card";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import { Pagination } from "@/components/feature/pagination/Pagination";
import { useDropdown } from "@/components/feature/dropdown/useDropdown";
import { SelectData } from "@/components/feature/dropdown/data/DropdownData";
import { Thumbnail } from "@/components/ui/card/Thumbnail";

import { useStoreFilter } from "@/hooks/store/useStoreFilter";

export default function CharityStore() {
  const { filters, handlePageChange, handleCategoryCahnge, handleSortChange } = useStoreFilter({
    pathname: "charitystore",
    sort: "favoriteCount",
    direction: "desc",
  });

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
    queryKey: ["stores", filters],
    queryFn: () => GetStores(filters),
    placeholderData: previousData => previousData,
  });

  const stores: CharityMain[] = data?.data?.stores ?? [];
  const storeLength = data?.data?.totalCount;

  console.log(stores);

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <h2 className="sr-only">나눔 가게 전체 보기</h2>
      <div className="wrapper">
        <Navigation onChange={handleCategoryCahnge} />
        <BgrDropdown
          options={SelectData}
          open={open}
          selected={selected}
          highlightedIndex={highlightedIndex}
          setSelected={setSelected}
          setSortChange={handleSortChange}
          setHighlightedIndex={setHighlightedIndex}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleKeyDown={handleKeyDown}
          containerRef={containerRef}
          listboxRef={listboxRef}
        />
        {isLoading && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:mt-8 lg:grid-cols-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}
        {error && (
          <p className="font-gmarketsans text-center text-xl">데이터 로드에 실패했습니다.</p>
        )}
        {!isLoading && !error && storeLength > 0 && (
          <>
            <div className="mt-4 grid grid-cols-2 gap-4 md:mt-8 lg:grid-cols-4">
              {stores.map(items => (
                <Card
                  key={items.id}
                  type="charity"
                  storeId={items.id}
                  storelink={String(items.id)}
                  storeThumnail={
                    <Thumbnail
                      src={items.images}
                      isOpen={items.isOpen}
                      hasSharing={items.isSharing}
                    />
                  }
                  storename={items.name}
                  storeIntroduce={items.introduction}
                  category={<Category category={items.categoryName} />}
                  hashtags={<HashTag tags={items.tagNames || []} />}
                />
              ))}
            </div>
            <div className="mt-section-sm-top md:mt-section-lg-top flex justify-center">
              <Pagination totalPage={data?.data?.totalPages} handlePageChange={handlePageChange} />
            </div>
          </>
        )}
        {!isLoading && !error && storeLength === 0 && (
          <p className="font-gmarketsans text-center text-xl">결과가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
