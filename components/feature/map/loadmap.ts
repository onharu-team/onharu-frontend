/**
 * InitMap 로드를 위해 꼭 필요한 함수이며, 초기 카카오맵 api script를 로드하는 함수입니다.
 * 이미 window.kakao 존재시 return됩니다.
 */

export function loadMap(): Promise<void> {
  return new Promise(resolve => {
    if (window.kakao) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };

    document.head.appendChild(script);
  });
}
