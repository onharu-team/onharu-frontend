import { motion } from "framer-motion";

const text = "오늘 하루를 온전히 지켜주는";

export const SplitText = () => {
  return (
    <div className="space-y-4">
      {/* 작은 문구 */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(0)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-sm leading-relaxed text-gray-500"
      >
        오늘 하루를 온전히 지켜주는 <br />
        동네의 따뜻한 도움
      </motion.p>

      {/* 큰 문구 */}
      <motion.h1
        initial={{ opacity: 0, y: 12, filter: "blur(0)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: 0.15,
          duration: 0.7,
          ease: "easeOut",
        }}
        className="text-2xl leading-snug font-semibold"
      >
        돌봄이 필요한 아이들을 위해 <br />
        착한 가게를 한눈에 연결합니다
      </motion.h1>
    </div>
  );
};
