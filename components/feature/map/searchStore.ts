export interface LocationMarker {
  markerId: string;
  marker: kakao.maps.Marker;
}
/**
 * 내 주변 페이지에서만 사용됩니다.
 * 직접 검색어를 통해 매장을 검색합니다.
 * 해당 함수 수정 예정임!!
 */

export function searchStores(map: kakao.maps.Map, keyword: any) {
  const places = new kakao.maps.services.Places();

  //useLocationStore.getState().clearLocationMarkers()

  places.keywordSearch(
    keyword,
    (data, status) => {
      if (status === kakao.maps.services.Status.ERROR) {
        //useLocationStore.getState().setSearchError('검색에 실패했습니다')
        return;
      }
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        //useLocationStore.getState().setSearchSuccess(data)
        return;
      }
      if (status === kakao.maps.services.Status.OK) {
        // console.log(status)
        // console.log('-----------🚫🚫🚫🚫')
        // console.log(data)

        const MarkerCustom = (code: string) => {
          let ImageSrc = "";
          if (code.includes("병원")) {
            ImageSrc = "/images/hospital-marker.svg";
          } else if (
            code.includes("관상어") ||
            code.includes("수족관") ||
            code.includes("열대어")
          ) {
            ImageSrc = "/images/fish-location.svg";
          } else {
            ImageSrc = "/images/search-marker.svg";
          }
          const ImageSize = new kakao.maps.Size(43, 52);
          const MarkerImage = new kakao.maps.MarkerImage(ImageSrc, ImageSize);

          return MarkerImage;
        };

        let newMarker: LocationMarker[] = [];

        data.forEach(place => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(Number(place.y), Number(place.x)),
            image: MarkerCustom(place.category_name),
          });

          const markerRes = {
            markerId: place.id,
            marker: marker,
          };

          newMarker.push(markerRes);
        });

        //useLocationStore.getState().setSearchSuccess(data)
        //useLocationStore.getState().setSearchState(true)
        //useLocationStore.getState().setLocationMarkers(newMarker)
      }
    },
    {
      location: map.getCenter(),
      radius: 5000, // 3km
    }
  );
}
