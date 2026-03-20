"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RiKeyboardFill } from "@remixicon/react";

export const FramerSlide = ({ data }: { data: string[] }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const maxdragRef = useRef(0);
  const progressRef = useRef(0);
  const [slidearea, setSlidearea] = useState({ left: 0, right: 0 });
  const [tabInfor, setTabInfor] = useState(false);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (!viewportRef.current || !trackRef.current) return;

    const viewportWidth = viewportRef.current.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;

    const maxDrag = trackWidth - viewportWidth;

    const progressInit = (viewportWidth / trackWidth) * 100;

    maxdragRef.current = maxDrag;
    setSlidearea({
      left: -maxDrag,
      right: 0,
    });

    progressRef.current = progressInit;
  }, []);

  const progressWidth = useTransform(smoothX, value => {
    const ratio = -value / maxdragRef.current; // 0 ~ 1
    const widthPercent = progressRef.current + (100 - progressRef.current) * ratio;
    return `${widthPercent}%`;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!slidearea.left) return;

    const step = 200; // 한 번에 이동할 거리 (px)

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const nextX = Math.min(x.get() + step, slidearea.right);
      x.set(nextX);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextX = Math.max(x.get() - step, slidearea.left);
      x.set(nextX);
    } else if (e.key === "Home") {
      e.preventDefault();
      x.set(0);
    } else if (e.key === "End") {
      e.preventDefault();
      x.set(-maxdragRef.current);
    }
  };

  const handleTabInforOpen = () => {
    if (!tabInfor) setTabInfor(true);
  };

  const handleTabInforClose = () => {
    if (tabInfor) setTabInfor(false);
  };

  return (
    <>
      {tabInfor && (
        <p className="text-main absolute -top-4.5 left-0 z-10 flex items-center gap-1.5 text-xs font-bold md:-top-6.5 md:text-sm">
          <RiKeyboardFill size={17} />
          키보드를 좌우로 움직여 매장 사진을 구경하세요!
        </p>
      )}
      <motion.div ref={viewportRef} className="h-full w-full overflow-hidden">
        <motion.div
          ref={testRef}
          drag="x"
          tabIndex={0}
          style={{ x: smoothX }}
          onKeyDown={handleKeyDown}
          role="region"
          dragMomentum={false}
          dragConstraints={slidearea}
          dragElastic={0.1}
          onFocus={() => handleTabInforOpen()}
          onBlur={() => handleTabInforClose()}
          className="h-full"
        >
          <div className="flex h-full gap-3 md:gap-5" ref={trackRef}>
            {data.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative w-[calc(25%-11px)] shrink-0 md:w-[calc(25%-15px)]"
              >
                <Image
                  src={item}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div className="bg-main-400 h-full" style={{ width: progressWidth }} />
      </div>
    </>
  );
};
