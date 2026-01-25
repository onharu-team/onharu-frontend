import Link from "next/link";
import Image from "next/image";
import { Like } from "../StoreLike";

interface CardProps {
  storelink: string;
  storeSrc?: string;
  storename: string;
  storeIntroduce: string;
  category?: React.ReactNode;
  operating?: React.ReactNode;
  storeAddress?: React.ReactNode;
  hashtags?: React.ReactNode;
  reservation?: React.ReactNode;
}
/**
 * props에 대한 설명입니다.
 * @param storelink - 상세페이지 이동 url (공통)
 * @param storeSrc - 매장 썸네일 src (공통)
 * @param storename - 가게 이름 (공통)
 * @param storeIntroduce - 가게 소개 (공통)
 * @param category - 카테고리 (메인에만 사용, 별도의 컴포넌트로 받아옴)
 * @param operating - 운영중/운영종료 뱃지 (지도에만 사용, 별도의 컴포넌트로 받아옴)
 * @param storeAddress - 가게주소 (지도에만 사용, 별도의 컴포넌트로 받아옴)
 * @param hashtags - 해쉬태그 (선택, 메인에만 사용, 별도의 컴포넌트로 받아옴)
 * @param reservation - 예약 버튼 (지도에만 사용, 부모에서 별도의 컴포넌트로 받아옴)
 *
 * 지도에서 사용 예시는 다음과 같습니다.
 * @example
 * <Card
      category={<Category category="식당" />}
      storeAddress={<StoreAddress address={"서울시 강남대로 123"} />
      reservation={
        <Button varient="default" fontSize="md" width="lg" height="md">
          예약 하러가기
        </Button>
      }
    />
*/

export const Card = ({
  storelink,
  storeSrc,
  storename,
  storeIntroduce,
  category,
  operating,
  storeAddress,
  hashtags,
  reservation,
}: CardProps) => {
  return (
    <Link href={storelink} className="group inline-block h-full">
      <div className="h-full overflow-hidden rounded-md border border-gray-300">
        <div className="relative h-[110px] md:h-[183px]">
          <div className="h-full w-full duration-300 ease-in-out group-hover:scale-105">
            <Image
              src={storeSrc || "/image/page/no-image.svg"}
              fill
              alt="가게 이미지"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          {category}
        </div>
        <div className="relative bg-white p-2.5 md:p-4">
          <div className="absolute top-2 right-5">
            <Like isLiked={false} />
          </div>
          <p className="md:text-md flex items-center gap-1 pr-6 text-base font-bold">
            <span className="line-clamp-1">{storename}</span>
            {operating}
          </p>
          {storeAddress}
          <p className="text-text mt-2 line-clamp-2 text-sm leading-4.75 md:text-base">
            {storeIntroduce}
          </p>
          {(hashtags || reservation) && (
            <div className="mt-3.5 flex items-center gap-1 md:mt-7.5">
              {hashtags}
              {reservation}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
