import Image from "next/image";
export const SearchNoResult = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-43 w-50">
        <Image src={"/image/character/squirrel-noresult.png"} alt="" fill></Image>
      </div>
      <p className="text-md mt-7 font-bold md:text-xl">주변에 가게가 없어요.</p>
    </div>
  );
};
