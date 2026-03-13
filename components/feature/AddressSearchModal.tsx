"use client";

import DaumPostcode from "react-daum-postcode";
import { Modal } from "@/components/ui/Modal";
import { getCoord } from "./map/utils/getCoord";

export type AddressResult = {
  address: string;
  lat: string;
  lng: string;
};

type AddressSearchModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (result: AddressResult) => void;
};

type Address = {
  address: string;
  roadAddress: string;
  autoJibunAddress?: string;
  buildingName?: string;
  userSelectedType?: string;
};

export default function AddressSearchModal({ open, onClose, onSelect }: AddressSearchModalProps) {
  const handleComplete = async (data: Address) => {
    const address = data.roadAddress || data.address;

    const coord = await getCoord(address);

    if (!coord) return;

    onSelect({
      address,
      lat: String(coord.lat),
      lng: String(coord.lng),
    });

    onClose();
  };

  if (!open) return null;

  return (
    <Modal onClick={onClose}>
      <h2 className="mb-2 text-base font-semibold sm:mb-4 sm:text-lg">주소 검색</h2>

      <DaumPostcode
        onComplete={handleComplete}
        autoClose={false}
        style={{ width: "100%", height: "450px" }}
      />
    </Modal>
  );
}
