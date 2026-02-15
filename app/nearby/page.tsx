"use client";
import { useEffect, useState, useMemo } from "react";
import { LocationSearch } from "./component";
import { DummyData } from "./data/DummyData";
import { NearbyStore } from "./type/type";
import { useQuery } from "@tanstack/react-query";
import { GetStores } from "@/lib/api/GetStores";
import { CharityMain } from "@/types/store/type";

import { useSearchParams } from "next/navigation";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Map } from "@/components/feature/map/map";
import { useMyLocation } from "@/components/feature/map/hooks/useMyLocation";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";
import { useSearch } from "@/components/feature/search/useSearch";
import { getCurrentPosition } from "@/components/feature/map/utils/getCurrentPositin";
import { searchStores } from "@/components/feature/search/searchStore";
import { useActiveCard } from "@/components/feature/search/useActiveCard";

import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";
import { DesktopView } from "./component/DesktopView";
import { MobileView } from "./component/MobileView";
import { Toast } from "@/components/feature/toast/Toast";

export default function Nearby() {
  //const [allStores, setAllStores] = useState<NearbyStore[]>([]);
  const [filters, setFilters] = useState({
    page: 1,
    categoryId: 0,
    keyword: "",
    lat: 0,
    lng: 0,
  });
  const { OriginLocationRef, mylocation, handleMyLocation } = useMyLocation();
  const { inputValue, setInputValue, keyword, setKeyword, handleSearch, handleInputChange } =
    useSearch();
  const { category, setCategory, filterByCategory } = useCategoryFilter();
  const { activeId, handleActiveCard, cardRefs } = useActiveCard();
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("categoryId") ?? 0);

  const isReady = mylocation.lat !== 0;

  const isCategoryQuery = useMediaQuery("(max-width: 1150px)");
  const isSidemenuQuery = useMediaQuery("(max-width:820px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    (async () => {
      const pos = await getCurrentPosition();
      if (!pos) {
        Toast(
          "info",
          "위치 접근을 허용하지 않았습니다.",
          "위치 변경을 통해 내 주소를 검색해보세요."
        );
        //handleMyLocation(37.5665, 126.978);
        setFilters(prev => ({
          ...prev,
          lat: 37.5665,
          lng: 126.978,
        }));
        OriginLocationRef.current = { lat: 37.5665, lng: 126.978 };
      } else {
        const { latitude, longitude } = pos.coords;
        setFilters(prev => ({
          ...prev,
          lat: latitude,
          lng: longitude,
        }));
        OriginLocationRef.current = { lat: latitude, lng: longitude };
      }
    })();
  }, []);

  const page = 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["stores", filters],
    queryFn: () => GetStores(filters),
  });

  const stores: CharityMain[] = data?.data?.stores ?? [];

  // const stores = useMemo(() => {
  //   let result = allStores;

  //   if (keyword) {
  //     result = searchStores({ stores: result, keyword: keyword });
  //   } else if (category !== "전체") {
  //     result = filterByCategory(result);
  //   }

  //   return result;
  // }, [allStores, keyword, category, filterByCategory]);

  // 검색 결과에 따라 카테고리 자동 변경
  // useEffect(() => {
  //   if (!keyword) return; // 검색어 없으면 무시

  //   if (stores.length > 0) {
  //     const categories = stores.map(store => store.category);
  //     const uniqueCategories = [...new Set(categories)];

  //     if (uniqueCategories.length === 1) {
  //       const resultCategory = uniqueCategories[0];
  //       if (category !== resultCategory) {
  //         setCategory(resultCategory);
  //       }
  //     } else {
  //       if (category !== "전체") {
  //         setCategory("전체");
  //       }
  //     }
  //   }
  // }, [keyword, stores, category, setCategory]);

  const handleCategoryChange = () => {
    setKeyword("");
    setInputValue("");
  };

  const handleReservation = (e: MouseEvent) => {
    e.preventDefault();
  };

  const commonProps = {
    isReady,
    mylocation,
    inputValue,
    stores,
    category,
    activeId,
    cardRefs,
    onOpenModal: handleOpenModal,
    onInputChange: handleInputChange,
    onSearch: handleSearch,
    onCategoryChange: setCategory,
    onCategoryInit: handleCategoryChange,
    onReservation: handleReservation,
  };

  return (
    <section>
      <h2 className="sr-only">내 주변 착한가게를 찾을 수 있습니다.</h2>
      <div className="flex h-[calc(100vh-205px)]">
        {isMobile === false && (
          <DesktopView
            {...commonProps}
            isCategoryQuery={isCategoryQuery}
            isSidemenuQuery={isSidemenuQuery}
          ></DesktopView>
        )}
        <div className="relative flex-1">
          <Map
            type="search"
            store={stores}
            OriginLocationRef={OriginLocationRef}
            handleMyLocation={handleMyLocation}
            mylocation={mylocation}
            handleActiveCard={handleActiveCard}
          />
        </div>
        {isMobile && <MobileView {...commonProps} />}
      </div>
      {open && (
        <Modal onClick={handleCloseModal}>
          <LocationSearch
            type="nearby"
            title={
              <>
                위치정보 <br />
                직접 검색해볼까요?
              </>
            }
            imageOn={true}
            handleCloseModal={handleCloseModal}
            handleMyLocation={handleMyLocation}
          />
        </Modal>
      )}
    </section>
  );
}
