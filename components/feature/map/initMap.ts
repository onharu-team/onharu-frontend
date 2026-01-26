import { loadMap } from "./loadmap";
/**
 * 초기 지도를 로드하는 함수입니다.
 * 한 번만 로드되며 상세페이지, 내 주변 페이지 모두 공통으로 사용됩니다.
 */
export async function InitMap(container: HTMLElement) {
  await loadMap();

  const map = new window.kakao.maps.Map(container, {
    center: new window.kakao.maps.LatLng(37.5665, 126.978),
    level: 5,
  });

  return map;
}
