"use client";
import { useQuery } from "@tanstack/react-query";
import { GetStores } from "@/lib/api/GetStores";
import { CharityMain } from "@/types/store/type";

import { LocationSearch } from "./component";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Map } from "@/components/feature/map/map";
import { useSearch } from "@/components/feature/search/useSearch";
import { useActiveCard } from "@/components/feature/search/useActiveCard";

import { Modal } from "@/components/ui/Modal";
import useModal from "@/hooks/ui/useModal";
import { DesktopView } from "./component/DesktopView";
import { MobileView } from "./component/MobileView";

import { useStoreFilter } from "@/hooks/store/useStoreFilter";

export default function Nearby() {
  const {
    filters,
    isLocationReady,
    OriginLocationRef,
    handleCategoryCahnge,
    handleSearch,
    handleMyLocation,
  } = useStoreFilter({
    pathname: "nearby",
    sort: "distance",
    direction: "asc",
  });

  const { inputValue, handleInputChange } = useSearch();
  const { activeId, handleActiveCard, cardRefs } = useActiveCard();
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const isCategoryQuery = useMediaQuery("(max-width: 1150px)");
  const isSidemenuQuery = useMediaQuery("(max-width:820px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { data, isLoading, error } = useQuery({
    queryKey: ["stores", filters],
    queryFn: ({ signal }) => GetStores(filters, signal),
    staleTime: 1000 * 60,
    enabled: isLocationReady,
    placeholderData: previousData => previousData,
  });

  const isReady = isLocationReady && !isLoading;

  const stores: CharityMain[] = data?.data?.stores ?? [];
  const mylocation = { lat: filters.lat, lng: filters.lng };

  const handleReservation = (e: MouseEvent) => {
    e.preventDefault();
  };

  const commonProps = {
    isReady,
    error,
    mylocation,
    inputValue,
    stores,
    activeId,
    cardRefs,
    onOpenModal: handleOpenModal,
    onInputChange: handleInputChange,
    onSearch: handleSearch,
    onCategoryChange: handleCategoryCahnge,
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
