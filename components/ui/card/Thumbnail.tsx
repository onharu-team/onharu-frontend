import Image from "next/image";

interface ThumbnailProps {
  src: string[];
  openTime?: string;
  closeTime?: string;
  isOpen: boolean;
  hasSharing: boolean;
}

export const Thumbnail = ({ src, isOpen, hasSharing }: ThumbnailProps) => {
  //const status = Operating({ openTime: openTime, closeTime: closeTime });
  // const realStatus =
  //   status.openMinutes < status.closeMinutes ? status.midnightStatus : status.status;
  //const imageSrc = src || "/image/page/no-image.svg";
  const imageSrc = src.length > 0 ? src[0] : "/image/page/no-image.svg";

  return (
    <div className="relative h-full w-full">
      {!isOpen && hasSharing && (
        <div className="text-md f-gmks absolute inset-0 z-20 flex items-center justify-center bg-gray-200/85 text-center font-bold md:text-xl">
          영업종료
          <br />
          다음에 만나요!
        </div>
      )}

      {!isOpen && !hasSharing && (
        <div className="text-md f-gmks absolute inset-0 z-20 flex items-center justify-center bg-gray-200/85 text-center font-bold md:text-xl">
          나눔 준비중
        </div>
      )}

      {isOpen && !hasSharing && (
        <div className="text-md f-gmks absolute inset-0 z-20 flex items-center justify-center bg-gray-200/85 text-center font-bold md:text-xl">
          나눔 준비중
        </div>
      )}

      <Image src={imageSrc} fill alt="" style={{ objectFit: "cover" }} />
    </div>
  );
};
