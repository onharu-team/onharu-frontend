import { SideMenu } from "./SideMenu";
import { MyAddress } from "./MyAddress";
import { StoreSearch } from "./StoreSearch";
import { StoreSearchSkeleton } from "./StoreSearchSkeleton";
import { DevideBar } from "./DevideBar";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";
import { StoreCardList } from "./StoreCardList";
import { SearchNoResult } from "./SearchNoResult";
import { Navigation } from "@/components/feature/category/Navigation";
import { cn } from "@/lib/utils";
import { CharityMain } from "@/types/store/type";

interface DesktopViewProps {
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
  isCategoryQuery: boolean | null;
  isSidemenuQuery: boolean | null;
}

export function DesktopView({
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
        {isReady && error && <>데이터를 읽을 수 없습니다.</>}
      </div>

      <div
        className={cn(
          "absolute top-5 left-[455px] z-50 min-w-[643px]",
          !isReady && "-z-10 opacity-0",
          isCategoryQuery && "left-[414px] min-w-100",
          isSidemenuQuery && "left-[350px] min-w-80"
        )}
      >
        <Navigation onChange={onCategoryChange} />
      </div>
    </SideMenu>
  );
}
