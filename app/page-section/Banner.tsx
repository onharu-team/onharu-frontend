import Image from "next/image";

export const Banner = () => {
  return (
    <div className="max-h-[916px]">
      <Image src={"/image/page/landing-x2.png"} alt="" width={1920} height={916} loading="eager" />
    </div>
  );
};
