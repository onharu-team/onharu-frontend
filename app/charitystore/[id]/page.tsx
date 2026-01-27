"use client";
import { useState } from "react";
import Image from "next/image";
import { Heading } from "./components/shared/heading";
import { Like } from "@/components/feature/StoreLike";
import { FramerSlide } from "./components/framerSlide";
import { Map } from "@/components/feature/map/map";
import { Reservation } from "./components/reservation";
import { ReservationBtn } from "./components/reservation-btn";

export default function Detail() {
  const [isSlide, setisSlide] = useState(false);

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <div className="wrapper">
        <article>
          <Heading title="스토어 네임">
            <Like isLiked />
          </Heading>
          <div className="mt-3 flex gap-3 md:mt-5">
            <button
              className="border-main border"
              onClick={() => {
                setisSlide(false);
              }}
            >
              no slide
            </button>
            <button
              className="border-main border"
              onClick={() => {
                setisSlide(true);
              }}
            >
              use slide
            </button>
          </div>
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
            <p className="lg:text-md text-base">전화번호 : 02-0000-0000</p>
            <p className="lg:text-md mt-0 text-base md:mt-2">주소 : 서울시 강남구 124</p>
            <div className="mt-4 h-[200px] w-full md:mt-7">
              <Map type="detail" address="제주특별자치도 제주시 첨단로 242" category="식당" />
            </div>
          </div>
        </article>
        <article className="mt-15 md:mt-21">
          <Heading title="예약 정보" addClassName="justify-between">
            <ReservationBtn status="short" />
          </Heading>
          <div className="mt-3 md:mt-8">
            <Reservation status="short" />
          </div>
        </article>
      </div>
    </section>
  );
}
