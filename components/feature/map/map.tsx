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
}

type MapProps = DetailMapProps | SearchMapProps;

export const Map = (props: MapProps) => {
  const { type, address, category } = props;
  const mapRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const overLayRef = useRef<kakao.maps.CustomOverlay[]>([]);
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
    if (!mylocation || !locationRef.current) return;
    moveToCurrentLocation(locationRef.current, mylocation.lat, mylocation.lng); //map center 순서보장을 위해
    NearbyStoreMarker(locationRef.current, stores, markersRef, overLayRef);
    setMapReady(true);
  }, [mylocation]);

  useEffect(() => {
    if (type !== "search") return;
    if (!locationRef.current) return;
    if (!props.store?.length) return;

    NearbyStoreMarker(locationRef.current, stores, markersRef, overLayRef);
  }, [type, stores]);

  return (
    <>
      <div className="h-full w-full" ref={mapRef} />
      {type === "search" && <MapLoading ready={mapReady} />}
    </>
  );
};
