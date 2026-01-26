"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Like } from "@/components/feature/StoreLike";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Detail() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const maxdragRef = useRef(0);
  const [slidearea, setSlidearea] = useState({ left: 0, right: 0 });
  const [progressbar, setProgressbar] = useState(0);
  const progressRef = useRef(0);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  //tab 접근성
  const [tabX, setTab] = useState(0);

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

    setProgressbar(progressInit);
    progressRef.current = progressInit;
  }, []);

  const utilProgressCalc = () => {
    if (!testRef.current) return;

    const moveX = x.get() / maxdragRef.current;

    //기준값은 항상 progressbar의 초기값 기준으로하기때문에 state가 아닌 ref로 계산
    const dynamicProgressBar = progressRef.current + (100 - progressRef.current) * -moveX;
    setProgressbar(dynamicProgressBar);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!slidearea.left) return;

    const step = 200; // 한 번에 이동할 거리 (px)

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const nextX = Math.min(x.get() + step, slidearea.right);
      x.set(nextX);
      utilProgressCalc();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextX = Math.max(x.get() - step, slidearea.left);
      x.set(nextX);
      utilProgressCalc();
    } else if (e.key === "Home") {
      e.preventDefault();
      setTab(slidearea.right);
    } else if (e.key === "End") {
      e.preventDefault();
      setTab(slidearea.left);
    }
  };

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <div className="wrapper">
        <div className="mb-7 flex gap-2 border-b border-gray-300 pb-7">
          <p className="text-2xl font-bold">스토어 네임</p>
          <Like isLiked />
        </div>
        <motion.div ref={viewportRef} className="w-full overflow-hidden">
          <motion.div
            ref={testRef}
            drag="x"
            tabIndex={0}
            style={{ x: smoothX }}
            transition={{ type: "tween", duration: 0.4 }}
            onKeyDown={handleKeyDown}
            role="region"
            dragMomentum={false}
            dragConstraints={slidearea}
            dragElastic={0.1}
            onDrag={utilProgressCalc}
          >
            <div className="flex gap-5" ref={trackRef}>
              <motion.div className="relative h-[340px] w-[calc(25%-15px)] shrink-0">
                <Image
                  src={"/image/page/test-image.png"}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </motion.div>
              <motion.div tabIndex={0} className="relative h-[340px] w-[calc(25%-15px)] shrink-0">
                <Image
                  src={"/image/page/test-image.png"}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </motion.div>
              <motion.div tabIndex={0} className="relative h-[340px] w-[calc(25%-15px)] shrink-0">
                <Image
                  src={"/image/page/test-image.png"}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </motion.div>
              <motion.div tabIndex={0} className="relative h-[340px] w-[calc(25%-15px)] shrink-0">
                <Image
                  src={"/image/page/test-image.png"}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </motion.div>
              <motion.div tabIndex={0} className="relative h-[340px] w-[calc(25%-15px)] shrink-0">
                <Image
                  src={"/image/page/test-image.png"}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div className="bg-main-400 h-full" style={{ width: `${progressbar}%` }} />
        </div>
      </div>
    </section>
  );
}
