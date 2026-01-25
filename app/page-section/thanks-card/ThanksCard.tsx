"use client";

import Image from "next/image";
import { VerticalMarquee } from "./verticalMarquee/VerticalMarquee";

export const ThanksCard = () => {
  return (
    <section className="mt-section-sm-top lg:mt-section-lg-top overflow-hidden bg-gradient-to-b from-white/15 to-[rgba(255,241,205,0.18)]">
      <div className="wrapper block justify-between gap-5 lg:flex">
        <div className="m-auto flex max-w-[190px] flex-col items-center justify-center lg:ml-0 lg:max-w-none lg:min-w-[300px]">
          <Image
            src={"/image/page/thanks-letter.svg"}
            alt="아이의 오늘을 지켜준 따뜻한 손길, 그 마음 그대로 전합니다."
            width={426}
            height={110}
          />
          <Image
            src={"/image/page/thanks-image.png"}
            alt=""
            width={200}
            height={166}
            className="mt-6"
          />
        </div>
        <div className="max-w-full lg:max-w-[60%]">
          <VerticalMarquee />
        </div>
      </div>
    </section>
  );
};
