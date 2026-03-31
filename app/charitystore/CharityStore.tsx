"use client";
import { useState, useEffect } from "react";
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
import { getCurrentPosition } from "@/components/feature/map/utils/getCurrentPositin";
import { calcDistance } from "@/lib/distance";

const DEFAULT_LOCATION = { lat: 37.5665, lng: 126.978 };

export default function CharityStore() {
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isDeniedLocation, setIsDeniedLocation] = useState(false); // 위치권한 거부 여부

  useEffect(() => {
    getCurrentPosition().then(pos => {
      if (pos) {
        setMyLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      } else {
        // 위치 권한 거부 시 기본 위치 사용
        setMyLocation(DEFAULT_LOCATION);
        setIsDeniedLocation(true);
      }
    });
  }, []);

  const { filters, handlePageChange, handleCategoryCahnge, handleSortChange } = useStoreFilter({
    perPage: 16,
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
    queryFn: ({ signal }) => GetStores(filters, signal),
    staleTime: 1000 * 60,
    placeholderData: previousData => previousData,
  });

  const stores: CharityMain[] = data?.data?.stores ?? [];
  const storeLength = data?.data?.totalCount;

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <h2 className="sr-only"> 전체 보기</h2>
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
            <div className="mt-4 md:mt-8">
              {isDeniedLocation && (
                <p className="mb-2 text-sm text-gray-700">
                  위치 권한이 거부되어 기본 위치(서울)를 기준으로 거리를 계산합니다.
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stores.map(items => {
                  const distance =
                    myLocation && items.lat && items.lng
                      ? calcDistance(
                          myLocation.lat,
                          myLocation.lng,
                          Number(items.lat),
                          Number(items.lng)
                        )
                      : null;
                  return (
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
                      distance={distance}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-section-sm-top md:mt-section-lg-top flex justify-center">
              <Pagination totalPage={data?.data?.totalPages} handlePageChange={handlePageChange} />
            </div>
          </>
        )}
        {!isLoading && !error && storeLength === 0 && (
          <div className="flex h-[calc(100vh-550px)] items-center justify-center">
            <p className="font-gmarketsans text-center text-xl">결과가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
