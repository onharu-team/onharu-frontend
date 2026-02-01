"use client";
import { useRef, useEffect, useState } from "react";
import { MapLoading } from "./MapLoading";
import { InitMap } from "./initMap";
import { moveToCurrentLocation } from "./utils/moveCurrentLocation";
import { getStorePosition } from "./utils/getStorePosition";
import { CategoryName } from "../category/data";
import { NearbyStore } from "@/app/nearby/type/type";
import { NearbyStoreMarker } from "./utils/NearByStoreMarker";

interface BaseMapProps {
  address?: string | null;
  category?: CategoryName | null;
}

interface DetailMapProps extends BaseMapProps {
  type: "detail";
}

interface SearchMapProps extends BaseMapProps {
  type: "search";
  store: NearbyStore[];
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
  const [mapReady, setMapReady] = useState<boolean>(false);
  const stores = type === "search" ? props.store : null;
  const mylocation = type === "search" ? props.mylocation : null;

  useEffect(() => {
    if (!mapRef.current) return;

    const mapload = async () => {
      if (!mapRef.current) return;
      const map = await InitMap(mapRef.current);
      locationRef.current = map;
      if (!address || !category) return;
      await getStorePosition(map, address, category);
    };

    mapload();

    (window as any).handleOverlayClose = () => {
      if (activeOverlayRef.current) {
        activeOverlayRef.current.setMap(null);
        activeOverlayRef.current = null;
      }
    };

    return () => {
      // //search 상태 초기화
      // useLocationStore.getState().setSearchState(false)
      // //전역 marker 비우기
      // useLocationStore.getState().clearMarkers()
      // //내 위치 버튼 위치값 초기화
      // useTransformStore.getState().setTransform(53)
    };
  }, []);

  useEffect(() => {
    if (props.type !== "search" || !mylocation || !locationRef.current) return;
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
  }, [mylocation]);

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

  return (
    <>
      <div className="h-full w-full" ref={mapRef} />
      {type === "search" && <MapLoading ready={mapReady} />}
    </>
  );
};
