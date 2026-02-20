"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetStoreDetail } from "@/lib/api/GetStoreDetail";
import { Heading } from "./components/shared/heading";
import { Like } from "@/components/feature/StoreLike";
import { FramerSlide } from "./components/framerSlide";
import { Map } from "@/components/feature/map/map";
import { Reservation } from "./components/reservation";
import { ReservationBtn } from "./components/ReservationBtn";
import { ThanksCard } from "./components/thanksCard";
//data
import { ThanksData } from "./data/thanksdata";
import { CategoryData } from "@/components/feature/category/data";

import { DetailSkeleton } from "./components/DetailSkeleton";

export default function Detail() {
  const params = useParams();
  const storeId = params.id as string;

  const { data, error, isLoading } = useQuery({
    queryKey: ["stores", storeId],
    queryFn: () => GetStoreDetail(storeId),
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return (
      <>
        <DetailSkeleton />
      </>
    );
  }

  if (!isLoading && error) {
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

  const storedetail = data.data.store;
  const isSlide = storedetail.images.length > 4;
  const storeCategory = CategoryData.filter(val => val.id === storedetail.categoryId);

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <div className="wrapper">
        <article>
          <Heading title={storedetail.name}>
            <Like isLiked={false} />
          </Heading>
          <div className="relative mt-5 h-[110px] md:mt-8 md:h-[340px]">
            <h3 className="sr-only">매장 내부, 음식 사진이 슬라이드 형태로 나열되어 있습니다.</h3>
            {isSlide && <FramerSlide />}
            {!isSlide && (
              <div className="flex h-full gap-3 md:gap-5">
                <div className="relative flex-1">
                  <Image
                    src={"/image/page/test-image.png"}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    className="pointer-events-none"
                  />
                </div>
                <div className="relative flex-1">
                  <Image
                    src={"/image/page/test-image.png"}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    className="pointer-events-none"
                  />
                </div>
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
            <ReservationBtn data={storedetail.storeSchedules} />
          </Heading>
          <div className="mt-3 md:mt-8">
            <Reservation status="short" />
          </div>
        </article>
        <article className="mt-15 md:mt-21">
          <h3 className="sr-only">사장님이 직접 작성한 매장에 대한 설명글입니다.</h3>
          <Heading title="온하루와 함께하는 가게" />
          <div className="mt-3 md:mt-8">
            <p>{storedetail.introduction}</p>
          </div>
        </article>
        {ThanksData && (
          <article className="mt-15 md:mt-21">
            <Heading title="감사 후기" />
            <div className="mt-3 md:mt-8">
              <ThanksCard card={ThanksData} />
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
