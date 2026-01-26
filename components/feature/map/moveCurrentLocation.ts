import { getCurrentPosition } from "./getCurrentPositin";

/**
 * 내 주변 페이지에서만 사용됩니다.
 * 현재 위치로 이동 버튼을 누르면 해당 함수가 호출됩니다.
 */

export async function moveToCurrentLocation(map: kakao.maps.Map): Promise<void> {
  try {
    const pos = await getCurrentPosition();
    const { latitude, longitude } = pos.coords;

    const latlng = new window.kakao.maps.LatLng(latitude, longitude);
    map.setCenter(latlng);

    const ImageSrc = "/images/my-marker.svg";
    const ImageSize = new kakao.maps.Size(48, 62);
    const MarkerImage = new kakao.maps.MarkerImage(ImageSrc, ImageSize);

    const myMarker = new window.kakao.maps.Marker({
      map,
      position: latlng,
      image: MarkerImage,
    });

    // useLocationStore.getState().setMarkers(myMarker);
  } catch (err) {
    // 실패해도 시 기본위치 유지
  }
}
