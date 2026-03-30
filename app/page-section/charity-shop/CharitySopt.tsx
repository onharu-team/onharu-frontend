"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetStores } from "@/lib/api/GetStores";
import { CharityShopWrapper } from "./CharityShopWrapper";
import { Card } from "@/components/ui/card/Card";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import { Thumbnail } from "@/components/ui/card/Thumbnail";
import { CharityMain } from "../../../types/store/type";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";
import { getCurrentPosition } from "@/components/feature/map/utils/getCurrentPositin";

export const CharityShop = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isDefaultLocation, setIsDefaultLocation] = useState(false); // 기본위치 여부

  const DEFAULT_LOCATION = { lat: 37.5665, lng: 126.978 };

  const filters = {
    pageNum: 1,
    perPage: 4,
    lat: location?.lat ?? DEFAULT_LOCATION.lat,
    lng: location?.lng ?? DEFAULT_LOCATION.lng,
    categoryId: 0,
  };

  useEffect(() => {
    getCurrentPosition().then(pos => {
      if (pos) {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      } else {
        setLocation(DEFAULT_LOCATION);
      }
    });
  }, []);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["stores", filters],
    queryFn: () => GetStores(filters),
    enabled: !!location,
  });
  const stores: CharityMain[] = data?.data?.stores ?? [];

  // 데이터 없으면 기본 위치로 재호출
  useEffect(() => {
    if (
      !isLoading &&
      !!location && // 위치가 확정된 이후에만
      !!data && // 쿼리 응답이 실제로 온 이후에만
      stores.length === 0 &&
      !isDefaultLocation
    ) {
      setTimeout(() => {
        setIsDefaultLocation(true);
        setLocation(DEFAULT_LOCATION);
      }, 0);
    }
  }, [stores, isLoading, data, location]);

  if (!location || isLoading || isFetching) {
    return (
      <CharityShopWrapper>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </CharityShopWrapper>
    );
  }

  if (error) {
    return (
      <CharityShopWrapper>
        <p className="font-gmarketsans text-md text-center font-semibold">
          데이터를 불러오지 못했습니다.
        </p>
      </CharityShopWrapper>
    );
  }

  return (
    <>
      <CharityShopWrapper>
        {isDefaultLocation && stores.length > 0 && (
          <p className="mb-2 text-sm text-gray-700">주변에 가게가 없어 전체 가게를 보여드려요!</p>
        )}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {stores.map(items => (
            <Card
              key={items.id}
              type="charity"
              storeId={items.id}
              storelink={String(items.id)}
              storeThumnail={
                <Thumbnail src={items.images} isOpen={items.isOpen} hasSharing={items.isSharing} />
              }
              storename={items.name}
              storeIntroduce={items.introduction}
              category={<Category category={items.categoryName} />}
              hashtags={<HashTag tags={items.tagNames || []} />}
              distance={items.distance}
            />
          ))}
        </div>
      </CharityShopWrapper>
    </>
  );
};
