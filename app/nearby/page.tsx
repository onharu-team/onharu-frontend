"use client";
import { useEffect, useState, useMemo } from "react";
import {
  DevideBar,
  LocationSearch,
  MyAddress,
  SideMenu,
  StoreSearch,
  StoreSearchSkeleton,
  SearchNoResult,
} from "./component";
import { DummyData } from "./data/DummyData";
import { NearbyStore } from "./type/type";

import { Map } from "@/components/feature/map/map";
import { Navigation } from "@/components/feature/category/Navigation";
import { useMyLocation } from "@/components/feature/map/hooks/useMyLocation";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";
import { useSearch } from "@/components/feature/search/useSearch";
import { getCurrentPosition } from "@/components/feature/map/utils/getCurrentPositin";

import { Card } from "@/components/ui/card/Card";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";
import { OperatingBedge } from "@/components/ui/card/OperatingBedge";
import { Thumbnail } from "@/components/ui/card/Thumbnail";
import { StoreAddress } from "@/components/ui/card/StoreAddress";
import { searchStores } from "@/components/feature/search/searchStore";
import { Button } from "@/components/ui/Button";

import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { useActiveCard } from "@/components/feature/search/useActiveCard";

export default function Nearby() {
  const [allStores, setAllStores] = useState<NearbyStore[]>([]);
  const { mylocation, handleMyLocation } = useMyLocation();
  const { inputValue, setInputValue, keyword, setKeyword, handleSearch, handleInputChange } =
    useSearch();
  const { category, setCategory, filterByCategory } = useCategoryFilter();
  const { activeId, handleActiveCard, cardRefs } = useActiveCard();
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const isReady = mylocation.lat !== 0;

  useEffect(() => {
    (async () => {
      const pos = await getCurrentPosition();
      const { latitude, longitude } = pos.coords;
      handleMyLocation(latitude, longitude);
    })();
  }, []);

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

  const handleReservation = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section>
      <h2 className="sr-only">내 주변 착한가게를 찾을 수 있습니다.</h2>
      <div className="flex h-[calc(100vh-80px)]">
        <SideMenu isReady={isReady}>
          <MyAddress mylocation={mylocation} handleOpenModal={handleOpenModal} />
          {!isReady && <StoreSearchSkeleton />}
          {isReady && (
            <StoreSearch value={inputValue} onChange={handleInputChange} onSearch={handleSearch} />
          )}

          <DevideBar />
          <div className="scrollbar-thin grid flex-1 grid-cols-1 gap-8 overflow-y-scroll p-7.5">
            {!isReady && Array.from({ length: 3 }).map((_, idx) => <CardSkeleton key={idx} />)}

            {isReady &&
              stores.length > 0 &&
              stores.map(store => (
                <div
                  key={store.id}
                  className="w-full"
                  ref={el => {
                    cardRefs.current[store.id] = el;
                  }}
                >
                  <Card
                    type="nearby"
                    storeId={store.id}
                    storelink="/"
                    storeThumnail={
                      <Thumbnail
                        src={""}
                        openTime={store.openTime}
                        closeTime={store.closeTime}
                        hasSharing={store.hasSharing}
                      />
                    }
                    storename={store.name}
                    storeAddress={<StoreAddress address={store.address} />}
                    storeIntroduce={store.description}
                    operating={
                      <OperatingBedge openTime={store.openTime} closeTime={store.closeTime} />
                    }
                    reservation={
                      <Button
                        varient="default"
                        width="lg"
                        height="md"
                        fontSize="md"
                        disabled={!store.hasSharing}
                        onClick={handleReservation}
                      >
                        {store.hasSharing ? "나눔 예약하기" : "나눔 준비중"}
                      </Button>
                    }
                    activeId={activeId}
                  />
                </div>
              ))}

            {isReady && stores.length === 0 && <SearchNoResult />}
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
          <Map
            type="search"
            store={stores}
            mylocation={mylocation}
            handleActiveCard={handleActiveCard}
          />
        </div>
      </div>
      {open && (
        <Modal onClick={handleCloseModal}>
          <LocationSearch
            open={open}
            handleCloseModal={handleCloseModal}
            handleMyLocation={handleMyLocation}
          />
        </Modal>
      )}
    </section>
  );
}
