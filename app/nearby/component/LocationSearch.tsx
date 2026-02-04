"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { Button } from "@/components/ui/Button";
import { getCoord } from "@/components/feature/map/utils/getCoord";
import { Toast } from "@/components/feature/toast/Toast";

interface LocationSearchProps {
  open: boolean;
  handleCloseModal: () => void;
  handleMyLocation: (lat: number, lng: number) => void;
}

export const LocationSearch = ({
  open,
  handleCloseModal,
  handleMyLocation,
}: LocationSearchProps) => {
  const [coordopen, setCoordOpen] = useState(false);
  const [address, setAddress] = useState("");
  const coordinateRef = useRef("");

  const handleComplete = (data: any) => {
    setAddress(data.roadAddress || data.address);
    setCoordOpen(false);
    coordinateRef.current = data.roadAddress || data.address;
  };

  const handleFindLocation = async () => {
    if (address === "") {
      handleCloseModal();
    } else {
      const newCoord = await getCoord(address);
      if (!newCoord) {
        Toast("error", "위치 정보 반영에 실패했습니다.", "다시 한 번 시도해 주세요.");
        return;
      }
      handleMyLocation(newCoord.lat, newCoord.lng);
      handleCloseModal();
    }
  };

  return (
    <>
      <p className="text-md f-gmks text-center leading-tight font-bold md:text-2xl">
        위치정보 <br />
        직접 검색해볼까요?
      </p>
      <div className="relative">
        <div className="absolute -top-12 left-0 h-22.5 w-22.5 -rotate-6">
          <Image
            src={"/image/character/squirrel-wink.png"}
            fill
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <input
          readOnly
          value={address}
          placeholder="주소를 입력해주세요."
          className="mt-6 h-12.5 w-full rounded-md border border-gray-300 px-2.5"
          onFocus={() => setCoordOpen(true)}
        />
      </div>
      {coordopen && (
        <>
          <div className="mt-4">
            <DaumPostcode
              onComplete={handleComplete}
              autoClose
              style={{ width: "100%", height: "450px" }}
            />
          </div>
        </>
      )}
      {!coordopen && address && (
        <>
          <p className="md:text-md mt-8 text-center text-base font-semibold">
            선택한 주소 : {address}
          </p>
        </>
      )}
      <div className="mt-14.5">
        <Button varient="default" fontSize="md" width="lg" height="lg" onClick={handleFindLocation}>
          위치 변경
        </Button>
      </div>
    </>
  );
};
