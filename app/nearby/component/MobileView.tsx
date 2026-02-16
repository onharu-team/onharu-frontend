import { NearbyStore } from "../type/type";
import { StoreSearch } from "./StoreSearch";
import { Navigation } from "@/components/feature/category/Navigation";
import { CategoryName } from "@/components/feature/category/data";
import { BottomSheet } from "@/components/feature/bottomsheet/Bottomsheet";
import { MyAddress } from "./MyAddress";
import { StoreCardList } from "./StoreCardList";

interface MobileViewProps {
  isReady: boolean;
  mylocation: { lat: number | null; lng: number | null };
  inputValue: string;
  stores: any;
  activeId: string;
  cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onOpenModal: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
  onCategoryChange: (value: any) => void;
  onReservation: (e: MouseEvent) => void;
}

export function MobileView({
  isReady,
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
  if (!isReady) return null;

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
        </div>
      </BottomSheet>
    </>
  );
}
