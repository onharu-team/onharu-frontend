import { StoreSearch } from "./StoreSearch";
import { Navigation } from "@/components/feature/category/Navigation";
import { CharityMain } from "@/types/store/type";
import { BottomSheet } from "@/components/feature/bottomsheet/Bottomsheet";
import { MyAddress } from "./MyAddress";
import { StoreCardList } from "./StoreCardList";
import { SearchNoResult } from "./SearchNoResult";

interface MobileViewProps {
  isReady: boolean;
  error: Error | null;
  mylocation: { lat: number | null; lng: number | null };
  inputValue: string;
  stores: CharityMain[];
  activeId: string;
  cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onOpenModal: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
  onCategoryChange: (value: number) => void;
  onReservation: (e: MouseEvent) => void;
}

export function MobileView({
  isReady,
  error,
  mylocation,
  inputValue,
  stores,
  activeId,
  cardRefs,
  onOpenModal,
  onInputChange,
  onSearch,
  onCategoryChange,
  onReservation,
}: MobileViewProps) {
  return (
    <>
      <div className="fixed top-16 left-[50%] z-50 w-full -translate-x-[50%]">
        <StoreSearch value={inputValue} onChange={onInputChange} onSearch={onSearch} />
      </div>

      <div className="fixed top-38 z-50 w-full">
        <Navigation onChange={onCategoryChange} />
      </div>

      <BottomSheet open={isReady} onClose={() => {}}>
        <MyAddress mylocation={mylocation} handleOpenModal={onOpenModal} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stores.length > 0 && (
            <StoreCardList
              stores={stores}
              activeId={activeId}
              cardRefs={cardRefs}
              onReservation={onReservation}
            />
          )}
          {stores.length === 0 && <SearchNoResult />}
          {error && <>데이터를 읽을 수 없습니다.</>}
        </div>
      </BottomSheet>
    </>
  );
}
