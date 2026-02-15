import { NearbyStore } from "../type/type";
import { SideMenu } from "./SideMenu";
import { MyAddress } from "./MyAddress";
import { StoreSearchSkeleton } from "./StoreSearchSkeleton";
import { StoreSearch } from "./StoreSearch";
import { DevideBar } from "./DevideBar";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";
import { StoreCardList } from "./StoreCardList";
import { SearchNoResult } from "./SearchNoResult";
import { Navigation } from "@/components/feature/category/Navigation";
import { cn } from "@/lib/utils";
import { CategoryName } from "@/components/feature/category/data";

interface DesktopViewProps {
  isReady: boolean;
  mylocation: { lat: number; lng: number };
  inputValue: string;
  stores: any;
  category: CategoryName;
  activeId: string;
  cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onOpenModal: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onCategoryChange: (value: CategoryName) => void;
  onCategoryInit: () => void;
  onReservation: (e: MouseEvent) => void;
  isCategoryQuery: boolean | null;
  isSidemenuQuery: boolean | null;
}

export function DesktopView({
  isReady,
  mylocation,
  inputValue,
  stores,
  category,
  activeId,
  cardRefs,
  onOpenModal,
  onInputChange,
  onSearch,
  onCategoryChange,
  onCategoryInit,
  onReservation,
  isCategoryQuery,
  isSidemenuQuery,
}: DesktopViewProps) {
  return (
    <SideMenu isReady={isReady}>
      <MyAddress mylocation={mylocation} handleOpenModal={onOpenModal} />

      {!isReady && <StoreSearchSkeleton />}
      {isReady && <StoreSearch value={inputValue} onChange={onInputChange} onSearch={onSearch} />}

      <DevideBar />

      <div className="scrollbar-thin grid flex-1 grid-cols-1 gap-8 overflow-y-scroll p-7.5">
        {!isReady && Array.from({ length: 3 }).map((_, idx) => <CardSkeleton key={idx} />)}
        {isReady && stores.length > 0 && (
          <StoreCardList
            stores={stores}
            activeId={activeId}
            cardRefs={cardRefs}
            onReservation={onReservation}
          />
        )}
        {isReady && stores.length === 0 && <SearchNoResult />}
      </div>

      <div
        className={cn(
          "absolute top-5 left-[455px] z-50 min-w-[643px]",
          !isReady && "-z-10 opacity-0",
          isCategoryQuery && "left-[414px] min-w-100",
          isSidemenuQuery && "left-[350px] min-w-80"
        )}
      >
        <Navigation value={category} onChange={onCategoryChange} InitializePage={onCategoryInit} />
      </div>
    </SideMenu>
  );
}
