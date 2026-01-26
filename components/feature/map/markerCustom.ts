const MarkerMapping = [
  {
    code: "식당",
    src: "/image/map/marker-food.svg",
  },
  {
    code: "카페",
    src: "/image/map/marker-cafe.svg",
  },
  {
    code: "의료",
    src: "/image/map/marker-medical.svg",
  },
  {
    code: "교육",
    src: "/image/map/marker-study.svg",
  },
  {
    code: "생활",
    src: "/image/map/marker-etc.svg",
  },
];

export const MarkerCustom = (code: string) => {
  let targetGroup = MarkerMapping.filter(m => m.code === code);
  const ImageSrc = targetGroup[0].src;

  const ImageSize = new kakao.maps.Size(43, 52);
  const MarkerImage = new kakao.maps.MarkerImage(ImageSrc, ImageSize);

  return MarkerImage;
};
