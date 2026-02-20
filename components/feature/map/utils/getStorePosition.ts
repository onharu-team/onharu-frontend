import { MarkerCustom } from "./markerCustom";
import { CategoryName } from "../../category/data";
/**
 * 상세페이지에서 매장 위치를 주소 기준으로 검색하는 함수입니다.
 * @param map - InitMap 함수를 통해 가져온 map
 * @param address - 매장 주소입니다. ex)경기도 수원시 경수대로 234 12-1
 * @param category - 카테고리 정보입니다. 카테고리는 식당/카페/의료/교육/생활로 구분됩니다.
 */

export async function getStorePosition(
  map: kakao.maps.Map,
  address: string | null,
  category: CategoryName | null
): Promise<"OK" | "ZERO_RESULT" | "ERROR"> {
  return new Promise(resolve => {
    if (!address || !category) {
      resolve("ERROR");
      return;
    }
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (results, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const center = new kakao.maps.LatLng(Number(results[0].y), Number(results[0].x));
        const Marker = MarkerCustom(category);

        const myMarker = new window.kakao.maps.Marker({
          map,
          position: center,
          image: Marker,
        });

        map.setCenter(center);
        resolve("OK");
        return;
      }

      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        resolve("ZERO_RESULT");
        return;
      }

      resolve("ERROR");
    });
  });
}
