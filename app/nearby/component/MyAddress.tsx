import { useState, useEffect } from "react";
import { getAddress } from "@/components/feature/map/getAddress";
import { Button } from "@/components/ui/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MyAddress = ({ mylocation }: { mylocation: { lat: number; lng: number } }) => {
  const [myaddress, setMyAddress] = useState("");

  useEffect(() => {
    const loadAddress = async () => {
      const loadAddress = await getAddress({ mylocation });

      setMyAddress(loadAddress);
    };

    loadAddress();
  }, [mylocation]);

  if (myaddress == "") {
    return (
      <div className="px-7 pt-12.5">
        <Skeleton height={40} />
      </div>
    );
  }
  if (myaddress !== "") {
    return (
      <div className="text-md flex items-center justify-between px-7 pt-12.5 font-bold md:text-xl">
        {myaddress !== "" && (
          <>
            {myaddress}
            <Button varient="default" fontSize="sm" width="xs" height="xs">
              위치 변경
            </Button>
          </>
        )}
      </div>
    );
  }
};
