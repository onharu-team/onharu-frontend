import Image from "next/image";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export const DesktopView = () => {
  const path = "M10,50 C40,44 80,44 100,50 S150,56 190,50";

  const planeControls = useAnimation();
  const seedControls = useAnimation();
  const planeX = "calc(((100vw - 1200px)/2) + 10px)";
  const seedX = "calc(((100vw - 1200px)/2) - 110px)";
  const smallDesktopQuery = useMediaQuery("(max-width:1410px)");
  const smallDesktopPlaneX = "calc(50% - 440px)";
  const smallDesktopSeedX = "calc(50% - 450px)";

  useEffect(() => {
    planeControls
      .start({
        offsetDistance: "100%",
        opacity: 1,
        transition: { delay: 0.7, duration: 3, ease: "linear" },
      })
      .then(() => {
        planeControls.start({
          y: [0, -8, 0],
          transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          },
        });
      });

    seedControls
      .start({
        opacity: 1,
        y: 0,
        transition: { delay: 1, duration: 0.7, ease: "easeInOut" },
      })
      .then(() => {
        seedControls.start({
          y: [0, -18, 0],
          transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          },
        });
      });
  }, []);

  return (
    <>
      <div className="absolute inset-0">
        <div className="relative -top-9 h-full w-full">
          <div
            className={cn("absolute top-35 z-3")}
            style={{
              right: smallDesktopQuery ? smallDesktopPlaneX : planeX,
              transform: `scale(${smallDesktopQuery ? 0.65 : 1})`,
            }}
          >
            <svg width="300" height="261" viewBox="0 0 275 100">
              <path d={path} stroke="transparent" strokeWidth="2" fill="none" />
              <motion.image
                href={"/image/banner/paper-plane.svg"}
                width={261}
                height={261}
                initial={{ offsetDistance: "30%", opacity: 0 }}
                animate={planeControls}
                transition={{ delay: 0.7, duration: 3, ease: "linear" }}
                style={{
                  offsetPath: `path("${path}")`,
                  offsetRotate: "auto",
                  transform: "translate(-130px, -130px)",
                }}
              />
            </svg>
          </div>
          <div
            className={cn(
              "flex h-full flex-col items-center justify-center gap-9",
              smallDesktopQuery && "gap-2"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Image
                src={"/image/banner/letter-1.svg"}
                alt="오늘 하루를 온전히 지켜주는 동네의 따뜻한 도움"
                width={534}
                height={100}
                style={{
                  width: smallDesktopQuery ? 320 : 534,
                  height: "auto",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className={cn("relative h-45 w-236.5 max-w-[95%]", smallDesktopQuery && "h-32 w-150")}
            >
              <div className={cn("absolute -top-7 left-13", smallDesktopQuery && "-top-5 left-8")}>
                <svg width={25} height={40} viewBox="0 0 25 25">
                  <motion.image
                    href={"/image/banner/dot.svg"}
                    width={smallDesktopQuery ? 18 : 25}
                    height={smallDesktopQuery ? 18 : 25}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      delay: 1.5,
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </div>
              <div
                className={cn("absolute -top-7 left-29.5", smallDesktopQuery && "-top-5 left-18.5")}
              >
                <svg width={25} height={40} viewBox="0 0 25 25">
                  <motion.image
                    href={"/image/banner/dot.svg"}
                    width={smallDesktopQuery ? 18 : 25}
                    height={smallDesktopQuery ? 18 : 25}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      delay: 2,
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </div>
              <div
                className={cn(
                  "absolute right-40 -bottom-5",
                  smallDesktopQuery && "right-7 -bottom-1"
                )}
              >
                <svg width={209} height={42}>
                  <motion.image
                    href={"/image/banner/line.svg"}
                    width={smallDesktopQuery ? 120 : 209}
                    height={42}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      y: 10,
                    }}
                    transition={{
                      delay: 1.2,
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </div>
              <Image
                src={"/image/banner/letter-2.svg"}
                alt="돌봄이 필요한 아이들을 위해 착한 가게를 한눈에 연결합니다"
                fill
                className="object-fill"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={seedControls}
            transition={{
              delay: 1,
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="bg-amber absolute bottom-32 z-3"
            style={{
              left: smallDesktopQuery ? smallDesktopSeedX : seedX,
            }}
          >
            <Image
              src={"/image/banner/seed.svg"}
              alt=""
              width={352}
              height={213}
              style={{
                width: smallDesktopQuery ? 180 : 252,
                height: "auto",
              }}
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-[50%] z-3 -translate-x-[50%]">
        <div className="relative h-37 w-159.5">
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
