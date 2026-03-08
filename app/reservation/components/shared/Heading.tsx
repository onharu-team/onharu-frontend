import Image from "next/image";

export const Heading = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div className="relative h-[25px] w-[30px] md:h-[33px] md:w-[38px]">
        <Image src="/image/page/reservation-img2.svg" alt="" fill style={{ objectFit: "cover" }} />
      </div>
      <p className="md:text-md text-sm font-semibold">{title}</p>
    </div>
  );
};
