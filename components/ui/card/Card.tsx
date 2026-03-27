import Link from "next/link";
import LikeButton from "@/components/feature/LikeButton";
import { CardProps } from "./type/type";
import { cn } from "@/lib/utils";
import { useAuthProfile } from "@/hooks/useAuth";
import { useFavoritesQuery } from "@/hooks/useFavorite";

/**
 * @param storelink - 상세페이지 이동 url (공통)
 * @param storeSrc - 매장 썸네일 src (공통)
 * @param storename - 가게 이름 (공통)
 * @param storeIntroduce - 가게 소개 (공통)
 * @param category - 카테고리 (메인에만 사용, 별도의 컴포넌트로 받아옴)
 * @param operating - 운영중/운영종료 뱃지 (지도에만 사용, 별도의 컴포넌트로 받아옴)
 * @param storeAddress - 가게주소 (지도에만 사용, 별도의 컴포넌트로 받아옴)
 * @param hashtags - 해쉬태그 (선택, 메인에만 사용, 별도의 컴포넌트로 받아옴)
 * @param reservation - 예약 버튼 (지도에만 사용, 부모에서 별도의 컴포넌트로 받아옴)
 */

export const Card = (props: CardProps) => {
  const activeId = props.type === "nearby" ? props.activeId : "";
  const operating = props.type === "nearby" ? props.operating : null;
  const storeAddress = props.type === "nearby" ? props.storeAddress : null;
  const reservation = props.type === "nearby" ? props.reservation : null;
  const category = props.type === "charity" ? props.category : null;
  const hashtags = props.type === "charity" ? props.hashtags : null;
  const { data: user } = useAuthProfile();

  const isChild = user?.userType === "CHILD";

  const { data: favorites } = useFavoritesQuery({ pageNum: 1, perPage: 9999 });
  const isLiked =
    favorites?.favorites?.some(f => String(f.storeId) === String(props.storeId)) ?? false;

  return (
    <Link
      href={`/charitystore/${props.storelink}`}
      id={props.storeId}
      className={cn(
        "inline-block h-full min-h-60.5 duration-300 ease-in-out hover:-translate-y-1.5 md:min-h-89.5",
        props.type === "nearby" && "h-fit w-full"
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-md border border-gray-300",
          activeId === props.storeId && "outline-main-400 outline outline-2",
          props.type === "nearby" && "h-fit"
        )}
      >
        <div className="relative h-[110px] md:h-[183px]">
          <div className="h-full w-full">{props.storeThumnail}</div>
          {category}
        </div>
        <div className="relative flex-1 bg-white p-2.5 md:p-4">
          {isChild && (
            <div className="absolute top-2 right-5 z-5">
              <LikeButton storeId={Number(props.storeId)} isLiked={isLiked} className="static" />
            </div>
          )}
          <p className="md:text-md flex items-center gap-2 pr-6 text-base font-bold">
            <span className="line-clamp-1">{props.storename}</span>
            {operating}
          </p>
          {storeAddress}
          <p className="text-text mt-2 line-clamp-2 text-sm md:text-base">{props.storeIntroduce}</p>
          {hashtags && (
            <div className="w-[calc(100% - 20px)] absolute bottom-4 left-2.5 mt-3.5 flex h-[22px] flex-wrap items-center gap-1 overflow-hidden md:mt-7.5 md:h-[29px]">
              {hashtags}
            </div>
          )}
          {reservation && (
            <div className="mt-3.5 flex flex-wrap items-center gap-1 md:mt-7.5">{reservation}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
