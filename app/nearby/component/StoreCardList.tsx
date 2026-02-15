import { CharityMain } from "@/types/store/type";
import { Card } from "@/components/ui/card/Card";
import { Thumbnail } from "@/components/ui/card/Thumbnail";
import { StoreAddress } from "@/components/ui/card/StoreAddress";
import { OperatingBedge } from "@/components/ui/card/OperatingBedge";
import { Button } from "@/components/ui/Button";

interface StoreCardListProps {
  stores: CharityMain[];
  activeId: string;
  cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onReservation: (e: MouseEvent) => void;
}

export function StoreCardList({ stores, activeId, cardRefs, onReservation }: StoreCardListProps) {
  return (
    <>
      {stores.map(store => (
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
              <Thumbnail src={store.images} hasSharing={store.isSharing} isOpen={store.isOpen} />
            }
            storename={store.name}
            storeAddress={<StoreAddress address={store.address} />}
            storeIntroduce={store.introduction}
            operating={<OperatingBedge isOpen={store.isOpen} />}
            // operating={<OperatingBedge openTime={store.openTime} closeTime={store.closeTime} />}
            reservation={
              <Button
                varient="default"
                width="lg"
                height="md"
                fontSize="md"
                disabled={!store.isSharing}
                onClick={onReservation}
              >
                {store.isSharing ? "나눔 예약하기" : "나눔 준비중"}
              </Button>
            }
            activeId={activeId}
          />
        </div>
      ))}
    </>
  );
}
