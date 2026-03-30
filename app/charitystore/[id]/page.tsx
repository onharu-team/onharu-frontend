"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetStoreDetail } from "@/lib/api/GetStoreDetail";
import { Heading } from "./components/shared/heading";
import LikeButton from "@/components/feature/LikeButton";
import { FramerSlide } from "./components/framerSlide";
import { Map } from "@/components/feature/map/map";
import { Reservation } from "./components/reservation";
import { ReservationBtn } from "./components/ReservationBtn";
import { ThanksCard } from "./components/thanksCard";
import { GetReviewDetail } from "@/lib/api/GetReviewDetail";
import { CategoryData } from "@/components/feature/category/data";
import { DetailSkeleton } from "./components/DetailSkeleton";
import Skeleton from "react-loading-skeleton";
import { GetStoreSchedules } from "@/lib/api/GetStoreSchedules";
import { CharityDetail } from "@/types/store/type";

export default function Detail() {
  const params = useParams();
  const storeId = params.id as string;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const {
    data: storeData,
    error: storeError,
    isLoading: storeLoading,
  } = useQuery({
    queryKey: ["stores", storeId],
    queryFn: () => GetStoreDetail(storeId),
    staleTime: 1000 * 60,
  });

  const { data: reviewData, isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews", storeId],
    queryFn: () => GetReviewDetail(storeId),
    staleTime: 1000 * 60,
    retry: false,
    throwOnError: false,
  });

  const { data: scheduleData, isLoading: scheduleLoading } = useQuery({
    queryKey: ["store-schedules", storeId, year, month],
    queryFn: () => GetStoreSchedules(storeId, year, month),
    enabled: !!storeId,
    staleTime: 1000 * 60,
    retry: false,
  });

  // 스토어 로딩 중
  if (storeLoading) return <DetailSkeleton />;

  // 스토어 데이터 로딩 실패 시에만 전체 에러 처리
  if (storeError) {
    return (
      <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
        <div className="wrapper">
          <p className="font-gmarketsans text-center text-xl">
            일시적으로 데이터를 불러올 수 없습니다.
          </p>
        </div>
      </section>
    );
  }

  const storedetail: CharityDetail = storeData.data.store;
  const isSlide = storedetail.images.length > 4;
  const storeCategory = CategoryData.filter(val => val.id === storedetail.categoryId);

  // 리뷰는 실패해도 빈 배열로 fallback
  const storereview = reviewData?.data.reviews ?? [];

  // 예약 가능 일정
  const reservation = scheduleData?.data.dateSummaries ?? [];
  // const availableDates = reservation.filter(day => day.availableSlots > 0);

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <div className="wrapper">
        <article>
          <Heading title={storedetail.name}>
            <LikeButton storeId={Number(params.id)} isLiked={false} className="static" />
          </Heading>
          <div className="relative mt-5 h-[110px] md:mt-8 md:h-[340px]">
            <h3 className="sr-only">매장 내부, 음식 사진이 나열되어 있습니다.</h3>
            {storedetail.images.length === 0 && (
              <div className="flex h-full gap-3 md:gap-5">
                <div className="relative flex-1 bg-[#eeeeee]">
                  <Image
                    src={"/image/page/no-image.svg"}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    className="pointer-events-none"
                  />
                </div>
              </div>
            )}
            {isSlide && <FramerSlide data={storedetail.images} />}
            {!isSlide && (
              <div className="flex h-full gap-3 md:gap-5">
                {storedetail.images.map((item: string, idx: number) => (
                  <div className="relative flex-1" key={idx}>
                    <Image
                      src={item || "/image/page/test-image.png"}
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                      className="pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
        <article className="mt-15 md:mt-21">
          <Heading title="매장 정보" />
          <div className="mt-3 md:mt-8">
            <p className="lg:text-md text-base">전화번호 : {storedetail.phone}</p>
            <p className="lg:text-md mt-0 text-base md:mt-2">주소 : {storedetail.address}</p>
            <div className="mt-4 h-[150px] w-full md:mt-7 md:h-[200px]">
              <Map type="detail" address={storedetail.address} category={storeCategory[0].name} />
            </div>
          </div>
        </article>
        <article className="mt-15 md:mt-21">
          <Heading title="예약 정보" addClassName="justify-between">
            <ReservationBtn
              reservation={reservation}
              storeName={storedetail.name}
              storeId={storeId}
              storeUserId={storedetail.userId}
              isSharing={storedetail.isSharing}
            />
          </Heading>
          <div className="mt-3 md:mt-8">
            <Reservation data={reservation} />
          </div>
        </article>
        <article className="mt-15 md:mt-21">
          <h3 className="sr-only">사장님이 직접 작성한 매장에 대한 설명글입니다.</h3>
          <Heading title="온하루와 함께하는 가게" />
          <div className="mt-3 md:mt-8">
            <p>{storedetail.introduction}</p>
          </div>
        </article>

        {/* 리뷰 섹션 - 로딩 중이거나 데이터 있을 때만 렌더 */}
        {reviewLoading && <Skeleton />}
        {!reviewLoading && storereview.length > 0 && (
          <article className="mt-15 md:mt-21">
            <Heading title="감사 후기" />
            <div className="mt-3 md:mt-8">
              <ThanksCard card={storereview} />
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
