import { SectionTitle } from "../shared/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import { StoreMenu } from "./data/data";

export const FindStore = () => {
  return (
    <section className="mt-section-sm-top md:mt-section-lg-top">
      <div className="wrapper">
        <SectionTitle title="동네 속 나눔가게 찾기" />
        <div className="tablet:gap-15 flex flex-wrap justify-center gap-3">
          {StoreMenu.map(items => (
            <Link
              href={items.link}
              key={items.id}
              className="group flex flex-col items-center gap-2"
            >
              <div className="bg-sub-sub-100 mobile:w-[103px] mobile:p-1 flex aspect-square w-[58px] items-center justify-center rounded-md p-2">
                <Image
                  src={items.image.src}
                  alt={`${items.name} 카테고리로 검색하기`}
                  width={items.image.width}
                  height={items.image.height}
                  className="duration-200 group-hover:scale-95"
                />
              </div>
              <span className="mobile:text-md mobile:px-7 mobile:py-1.5 inline-block rounded-full border border-gray-300 px-2.5 py-0.5 text-center text-xs font-bold shadow-[-1px_3px_10px_rgba(0,0,0,0.03)] duration-200 group-hover:bg-gray-50">
                {items.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
