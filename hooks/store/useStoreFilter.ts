import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getCurrentPosition } from "@/components/feature/map/utils/getCurrentPositin";
import { Toast } from "@/components/feature/toast/Toast";

export const useStoreFilter = ({
  pathname,
  sort,
  direction,
}: {
  pathname: string;
  sort: string;
  direction: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLocationReady, setIsLocationReady] = useState(false);
  const OriginLocationRef = useRef<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });
  const filters = {
    pageNum: Number(searchParams.get("pageNum")) || 1,
    perPage: Number(searchParams.get("perPage")) || 16,
    lat: Number(searchParams.get("lat")) || null,
    lng: Number(searchParams.get("lng")) || null,
    categoryId: Number(searchParams.get("categoryId")) || 0,
    sortField: searchParams.get("sortField") || sort,
    sortDirection: searchParams.get("sortDirection") || direction,
    keyword: searchParams.get("keyword") || "",
  };

  useEffect(() => {
    if (filters.sortField !== "distance") return;
    (async () => {
      const pos = await getCurrentPosition();
      let lat = 37.5665;
      let lng = 126.978;
      if (!pos) {
        Toast(
          "info",
          "위치 접근을 허용하지 않았습니다.",
          "위치 변경을 통해 내 주소를 검색해보세요."
        );
      } else {
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      }

      OriginLocationRef.current = { lat, lng };

      const params = new URLSearchParams(searchParams);
      params.set("lat", String(lat));
      params.set("lng", String(lng));

      router.replace(`/${pathname}?${params.toString()}`);
      setIsLocationReady(true);
    })();
  }, []);

  const handleCategoryCahnge = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("categoryId", String(value));
    params.set("pageNum", "1");
    router.push(`/${pathname}?${params.toString()}`);
  };

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNum", String(nextPage));
    params.set("categoryId", String(filters.categoryId));
    router.push(`/${pathname}?${params.toString()}`);
  };

  const handleSortChange = (sort: string, direction: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNum", "1");
    params.set("categoryId", String(filters.categoryId));
    params.set("sortField", sort);
    params.set("lat", "");
    params.set("lng", "");
    params.set("sortDirection", direction);
    params.delete("keyword");
    router.push(`/${pathname}?${params.toString()}`);
  };

  const handleMyLocation = (lat: number | null, lng: number | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("lat", String(lat));
    params.set("lng", String(lng));
    params.set("categoryId", "0");

    params.delete("keyword");

    router.push(`/${pathname}?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim().length === 0) {
      Toast("info", "검색어는 두 글자 이상 입력해 주세요.");
      return;
    }

    if (value.trim()) {
      params.set("keyword", value.trim());
    } else {
      params.delete("keyword");
    }

    params.set("pageNum", "1");
    params.set("categoryId", "0");
    params.set("sortField", "id");
    params.delete("lat");
    params.delete("lng");
    router.push(`/${pathname}?${params.toString()}`);
  };

  return {
    filters,
    OriginLocationRef,
    isLocationReady,
    handleCategoryCahnge,
    handlePageChange,
    handleSortChange,
    handleMyLocation,
    handleSearch,
  };
};
