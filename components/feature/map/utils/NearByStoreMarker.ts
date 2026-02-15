import { NearbyStore } from "@/app/nearby/type/type";
import { CharityMain } from "@/types/store/type";
import { MarkerCustom } from "./markerCustom";
import { RiCloseLine } from "@remixicon/react";

export function NearbyStoreMarker(
  map: kakao.maps.Map,
  stores: CharityMain[] | null,
  markersRef: React.MutableRefObject<kakao.maps.Marker[]>,
  overLayRef: React.MutableRefObject<kakao.maps.CustomOverlay[]>,
  activeOverlayRef: React.MutableRefObject<kakao.maps.CustomOverlay | null>,
  handleActiveCard: (id: string) => void
) {
  if (!stores) return;

  markersRef.current.forEach(marker => marker.setMap(null));
  markersRef.current = [];

  overLayRef.current.forEach(overlay => overlay.setMap(null));
  overLayRef.current = [];

  stores.forEach(store => {
    const position = new kakao.maps.LatLng(Number(store.lat), Number(store.lng));
    const CustomMarkers = MarkerCustom(store.categoryName);
    const content = `
      <div class="customoverlay">
        <div>
          <p class="store_name">${store.name}</p>
          <p class="sharing">${store.hasSharing ? "나눔중" : "나눔 준비중"}</p>
            <button class="close_btn" onclick="handleOverlayClose()">
            </button>
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
      activeOverlayRef.current = customOverlay;
      handleActiveCard(store.id);
    });

    markersRef.current.push(marker);
    overLayRef.current.push(customOverlay);
  });
}
