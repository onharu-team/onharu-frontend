import { useState, useEffect } from "react";
import { getAddress } from "@/components/feature/map/utils/getAddress";
import { Button } from "@/components/ui/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { cn } from "@/lib/utils";

interface MyAddressProps {
  mylocation: { lat: number | null; lng: number | null };
  handleOpenModal: () => void;
}

export const MyAddress = ({ mylocation, handleOpenModal }: MyAddressProps) => {
  const [myaddress, setMyAddress] = useState("위치 확인 중..");
  const [loading, setLoading] = useState<boolean>(true);
  const BaseClasses = "px-0 pt-3 pb-4 md:px-7 md:pt-12.5 md:pb-0 bg-white";

  useEffect(() => {
    const loadAddress = async () => {
      const loadAddress = await getAddress({ mylocation });
      setMyAddress(loadAddress || "위치 확인 중..");
      setLoading(false);
    };

    loadAddress();
  }, [mylocation]);

  if (loading) {
    return (
      <div className={BaseClasses}>
        <Skeleton height={40} style={{ lineHeight: "1.5" }} />
      </div>
    );
  }
  if (!loading) {
    return (
      <>
        <div
          className={cn(
            BaseClasses,
            "text-md flex items-center justify-between font-bold md:text-xl"
          )}
        >
          {myaddress}
          <Button varient="default" fontSize="sm" width="xs" height="xs" onClick={handleOpenModal}>
            위치 변경
          </Button>
        </div>
      </>
    );
  }
};
