import { NearbyStore } from "@/app/nearby/type/type";
import { MarkerCustom } from "./markerCustom";

export function NearbyStoreMarker(
  map: kakao.maps.Map,
  stores: NearbyStore[] | null,
  markersRef: React.MutableRefObject<kakao.maps.Marker[]>,
  overLayRef: React.MutableRefObject<kakao.maps.CustomOverlay[]>
) {
  if (!stores) return;

  markersRef.current.forEach(marker => marker.setMap(null));
  markersRef.current = [];

  overLayRef.current.forEach(overlay => overlay.setMap(null));
  overLayRef.current = [];

  stores.forEach(store => {
    const position = new kakao.maps.LatLng(store.lat, store.lng);
    const CustomMarkers = MarkerCustom(store.category);
    const content = `
      <div class="customoverlay">
      <div>
      <p>${store.name}</p>
      <button>정보 보기</button>
      <div class="arrow"></div>
      </div>
      </div>
    `;

    const marker = new kakao.maps.Marker({
      map,
      position,
      image: CustomMarkers,
      title: store.name,
    });

    const customOverlay = new kakao.maps.CustomOverlay({
      position,
      content: content,
      yAnchor: 1,
    });

    kakao.maps.event.addListener(marker, "click", () => {
      overLayRef.current.forEach(overlay => overlay.setMap(null));
      customOverlay.setMap(map);
    });

    markersRef.current.push(marker);
    overLayRef.current.push(customOverlay);
  });
}
