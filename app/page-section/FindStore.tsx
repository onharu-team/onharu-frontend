import { SectionTitle } from "./shared/SectionTitle";
import Image from "next/image";
import Link from "next/link";

const StoreMenu = [
  {
    id: "food",
    name: "식당",
    link: "",
    image: {
      src: "/image/page/menu-food.svg",
      width: 82,
      height: 84,
    },
  },
  {
    id: "cafe",
    name: "카페",
    link: "",
    image: {
      src: "/image/page/menu-cafe.svg",
      width: 96,
      height: 79,
    },
  },
  {
    id: "medical",
    name: "의료",
    link: "",
    image: {
      src: "/image/page/menu-medical.svg",
      width: 97,
      height: 69,
    },
  },
  {
    id: "study",
    name: "교육",
    link: "",
    image: {
      src: "/image/page/menu-study.svg",
      width: 92,
      height: 87,
    },
  },
  {
    id: "etc",
    name: "생활",
    link: "",
    image: {
      src: "/image/page/menu-etc.svg",
      width: 86,
      height: 75,
    },
  },
];

export const FindStore = () => {
  return (
    <section className="mt-section-sm-top md:mt-section-lg-top">
      <div className="wrapper">
        <SectionTitle title="동네 속 나눔가게 찾기" />
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-20">
          {StoreMenu.map(items => (
            <Link href={items.link} key={items.id} className="flex flex-col items-center gap-2">
              <div className="bg-sub-sub-100 flex aspect-square w-[50px] items-center justify-center rounded-md p-2 md:w-[110px] md:p-1">
                <Image
                  src={items.image.src}
                  alt={`${items.name} 카테고리로 검색하기`}
                  width={items.image.width}
                  height={items.image.height}
                />
              </div>
              <span className="md:text-md inline-block rounded-full border border-gray-300 px-2.5 py-0.5 text-center text-xs font-bold shadow-[-1px_3px_10px_rgba(0,0,0,0.03)] md:px-7 md:py-1.5">
                {items.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
