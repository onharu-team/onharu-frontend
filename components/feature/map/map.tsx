"use client";
import { useRef, useEffect, useState, RefObject } from "react";
import { MapLoading } from "./MapLoading";
import { InitMap } from "./initMap";
import { MapZoom } from "./MapZoom";
import { moveToCurrentLocation } from "./utils/moveCurrentLocation";
import { getStorePosition } from "./utils/getStorePosition";
import { NearbyStoreMarker } from "./utils/NearByStoreMarker";
import { CategoryName } from "../category/data";
import { NearbyStore } from "@/app/nearby/type/type";
import { useZoomControl } from "./hooks/useZoomControl";
import { MyLocation } from "./MyLocation";

interface BaseMapProps {
  address?: string | null;
  category?: CategoryName | null;
}

interface DetailMapProps extends BaseMapProps {
  type: "detail";
}

interface SearchMapProps extends BaseMapProps {
  type: "search";
  store: any;
  handleMyLocation: (lat: number, lng: number) => void;
  OriginLocationRef: RefObject<{ lat: number; lng: number }>;
  mylocation: { lat: number; lng: number };
  handleActiveCard: (id: string) => void;
}

type MapProps = DetailMapProps | SearchMapProps;

export const Map = (props: MapProps) => {
  const { type, address, category } = props;
  const mapRef = useRef<HTMLDivElement>(null);
  const CurrentOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const locationRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const overLayRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const activeOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const [addressError, setAddressError] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const { handleZoomIn, handleZoomOut } = useZoomControl(locationRef);
  const stores = type === "search" ? props.store : null;
  const mylocation = type === "search" ? props.mylocation : null;
  const originLocation = type === "search" ? props.OriginLocationRef : null;
  const handleMyLocation = type === "search" ? props.handleMyLocation : null;

  useEffect(() => {
    const mapload = async () => {
      if (!mapRef.current) return;
      const map = await InitMap(mapRef.current);
      locationRef.current = map;
      setIsMapInitialized(true);
      if (!address || !category) return; // type detail에서만 적용됩니다
      const storePosition = await getStorePosition(map, address, category);
      setAddressError(storePosition === "ZERO_RESULT");
    };

    mapload();

    (window as any).handleOverlayClose = () => {
      if (activeOverlayRef.current) {
        activeOverlayRef.current.setMap(null);
        activeOverlayRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (props.type !== "search" || !mylocation || !locationRef.current) return;
    if (mylocation.lat === 0) return;

    moveToCurrentLocation(locationRef.current, CurrentOverlayRef, mylocation.lat, mylocation.lng);
    NearbyStoreMarker(
      locationRef.current,
      stores,
      markersRef,
      overLayRef,
      activeOverlayRef,
      props.handleActiveCard
    );
    setMapReady(true);
  }, [mylocation, isMapInitialized]);

  useEffect(() => {
    if (props.type !== "search" || !locationRef.current || !props.store.length) return;

    NearbyStoreMarker(
      locationRef.current,
      stores,
      markersRef,
      overLayRef,
      activeOverlayRef,
      props.handleActiveCard
    );
  }, [stores]);

  if (addressError) {
    return (
      <div className="font-gmarketsans flex h-full w-full items-center justify-center text-4xl">
        지도에 등록되지 않은 주소입니다.
      </div>
    );
  }

  return (
    <>
      <div className="h-full w-full" ref={mapRef} />

      {type === "search" && (
        <>
          <MapLoading ready={mapReady} />
          <MapZoom handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} mapReady={mapReady} />
          <MyLocation
            handleMyLocation={handleMyLocation}
            originLocation={originLocation}
            mapReady={mapReady}
          />
        </>
      )}
    </>
  );
};
