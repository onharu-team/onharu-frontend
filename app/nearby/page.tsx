"use client";

import { useEffect, useState, useMemo } from "react";
import { SideMenu } from "./component/SideMenu";
import { Map } from "@/components/feature/map/map";
import { Navigation } from "@/components/feature/category/Navigation";
import { useMyLocation } from "@/components/feature/map/hooks/useMyLocation";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";
import { useSearch } from "@/components/feature/map/hooks/useSearch";
import { MyAddress } from "./component/MyAddress";
import { Card } from "@/components/ui/card/Card";
import { StoreAddress } from "@/components/ui/card/StoreAddress";
import { searchStores } from "@/components/feature/map/searchStore";
import { Button } from "@/components/ui/Button";
import { DevideBar } from "./component/DevideBar";
import { LocationSearch } from "./component/LocationSearch";
import { DummyData } from "./data/DummyData";
import { NearbyStore } from "./type/type";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";
import { LocationSearchSkeleton } from "./component/LocationSearchSkeleton";
import { cn } from "@/lib/utils";

export default function Nearby() {
  const [allStores, setAllStores] = useState<NearbyStore[]>([]);
  const { mylocation, handleMyLocation } = useMyLocation();
  const { inputValue, setInputValue, keyword, setKeyword, handleSearch, handleInputChange } =
    useSearch();
  const { category, setCategory, filterByCategory } = useCategoryFilter();

  const isReady = mylocation.lat !== 0;

  useEffect(() => {
    if (mylocation.lat === 0) return;
    setAllStores(DummyData(mylocation.lat, mylocation.lng));
  }, [mylocation]);

  const stores = useMemo(() => {
    let result = allStores;

    if (keyword) {
      result = searchStores({ stores: result, keyword: keyword });
    } else if (category !== "전체") {
      result = filterByCategory(result);
    }

    return result;
  }, [allStores, keyword, category, filterByCategory]);

  // 검색 결과에 따라 카테고리 자동 변경
  useEffect(() => {
    if (!keyword) return; // 검색어 없으면 무시

    if (stores.length > 0) {
      const categories = stores.map(store => store.category);
      const uniqueCategories = [...new Set(categories)];

      if (uniqueCategories.length === 1) {
        const resultCategory = uniqueCategories[0];
        if (category !== resultCategory) {
          setCategory(resultCategory);
        }
      } else {
        if (category !== "전체") {
          setCategory("전체");
        }
      }
    }
  }, [keyword, stores, category, setCategory]);

  const handleCategoryChange = () => {
    setKeyword("");
    setInputValue("");
  };

  return (
    <section>
      <h2 className="sr-only">내 주변 착한가게를 찾을 수 있습니다.</h2>
      <div className="flex h-[100vh]">
        <SideMenu isReady={isReady}>
          <MyAddress mylocation={mylocation} />
          {!isReady && <LocationSearchSkeleton />}
          {isReady && (
            <LocationSearch
              value={inputValue}
              onChange={handleInputChange}
              onSearch={handleSearch}
            />
          )}

          <DevideBar />
          <div className="scrollbar-thin grid flex-1 grid-cols-1 gap-8 overflow-y-scroll p-7.5">
            {!isReady && Array.from({ length: 3 }).map((_, idx) => <CardSkeleton key={idx} />)}

            {isReady &&
              stores.map(store => (
                <Card
                  key={store.id}
                  storelink="/"
                  storeSrc=""
                  storename={store.name}
                  storeAddress={<StoreAddress address={store.address} />}
                  storeIntroduce={store.description}
                  reservation={
                    <Button varient="default" width="lg" height="md" fontSize="md">
                      예약하기
                    </Button>
                  }
                />
              ))}
          </div>
          <div className={cn("absolute top-5 -right-[155%] z-50", !isReady && "-z-10 opacity-0")}>
            <Navigation
              value={category}
              onChange={setCategory}
              InitializePage={handleCategoryChange}
            />
          </div>
        </SideMenu>
        <div className="relative flex-1">
          <Map type="search" store={stores} handleMyLocation={handleMyLocation} />
        </div>
      </div>
    </section>
  );
}
