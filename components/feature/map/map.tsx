"use client";
import { useRef, useEffect, useState } from "react";
import { InitMap } from "./initMap";
import { moveToCurrentLocation } from "./moveCurrentLocation";
import { getStorePosition } from "./getStorePosition";
import { CategoryName } from "../category/data";

interface MapProps {
  type: "detail" | "search";
  address: string;
  category: CategoryName;
}

export const Map = ({ type, address, category }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<kakao.maps.Map | null>(null);
  const [mapReady, setMapReady] = useState<boolean>(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapload = async () => {
      if (!mapRef.current) return;
      const map = await InitMap(mapRef.current);
      locationRef.current = map;

      if (type === "detail") await getStorePosition(map, address, category);
      else if (type === "search") {
        //await moveToCurrentLocation(map); //map center 순서보장을 위해
      }

      //searchNearbyStores(map, '동물병원')
      setMapReady(true);
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
  return <div className="h-full w-full" ref={mapRef} />;
};
