"use client";
import { useEffect, useState, useMemo } from "react";
import { LocationSearch } from "./component";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetStores } from "@/lib/api/GetStores";
import { CharityMain } from "@/types/store/type";

import { useSearchParams } from "next/navigation";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Map } from "@/components/feature/map/map";
import { useMyLocation } from "@/components/feature/map/hooks/useMyLocation";
import { useSearch } from "@/components/feature/search/useSearch";
import { getCurrentPosition } from "@/components/feature/map/utils/getCurrentPositin";
import { useActiveCard } from "@/components/feature/search/useActiveCard";

import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";
import { DesktopView } from "./component/DesktopView";
import { MobileView } from "./component/MobileView";
import { Toast } from "@/components/feature/toast/Toast";

export default function Nearby() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    pageNum: Number(searchParams.get("pageNum")) || 1,
    perPage: Number(searchParams.get("perPage")) || 16,
    lat: Number(searchParams.get("lat")) || 0,
    lng: Number(searchParams.get("lng")) || 0,
    categoryId: Number(searchParams.get("categoryId")) || 0,
    sortField: "distance",
  });
  const [isLocationReady, setIsLocationReady] = useState(false);
  const { OriginLocationRef } = useMyLocation();
  const { inputValue, setInputValue, keyword, setKeyword, handleInputChange } = useSearch();
  const { activeId, handleActiveCard, cardRefs } = useActiveCard();
  const { open, handleOpenModal, handleCloseModal } = useModal();

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
      setIsLocationReady(true);
    })();
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["stores", filters],
    queryFn: () => GetStores(filters),
    enabled: isLocationReady,
    placeholderData: previousData => previousData,
  });

  const isReady = isLocationReady && !isLoading;

  const stores: CharityMain[] = data?.data?.stores ?? [];
  const mylocation = { lat: filters.lat, lng: filters.lng };

  const handleMyLocation = (lat: number, lng: number) => {
    setFilters(prev => ({
      ...prev,
      categoryId: 0,
      lat: lat,
      lng: lng,
    }));
    const params = new URLSearchParams(searchParams);
    params.set("categoryId", "0");
    router.push(`/nearby?${params.toString()}`);
  };

  const handleCategoryChange = (value: number) => {
    setFilters(prev => ({
      ...prev,
      pageNum: 1,
      categoryId: value,
    }));
    const params = new URLSearchParams(searchParams);
    params.set("pageNum", "1");
    params.set("categoryId", String(value));
    router.push(`/nearby?${params.toString()}`);
  };

  const handleSearch = () => {};

  const handleReservation = (e: MouseEvent) => {
    e.preventDefault();
  };

  const commonProps = {
    isReady,
    mylocation,
    inputValue,
    stores,
    activeId,
    cardRefs,
    onOpenModal: handleOpenModal,
    onInputChange: handleInputChange,
    onSearch: handleSearch,
    onCategoryChange: handleCategoryChange,
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
          />
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
