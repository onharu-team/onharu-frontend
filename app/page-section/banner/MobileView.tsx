import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MobileView = () => {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className={cn(
              "mobile:-top-26 mobile:h-32 mobile:w-32 absolute -top-18 left-[50%] h-20 w-20 -translate-x-[50%]"
            )}
          >
            <div className="relative" style={{ aspectRatio: 1 }}>
              <Image
                src={"/image/banner/paper-plane.svg"}
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src={"/image/banner/mobile-letter.svg"}
              alt="돌봄이 필요한 아이들을 위해 책한 가게를 한눈에 "
              width={946}
              height={324}
              style={{
                width: "600px",
                maxWidth: "calc(100% - 40px)",
                height: "auto",
                margin: "auto",
              }}
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-3 w-full">
        <div className="relative h-20 w-full">
          <Image
            src={"/image/banner/letter-logo.svg"}
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
};
