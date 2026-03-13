import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MarqueeSkeleton = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-gray-300 bg-white">
      <Skeleton
        width={385}
        height={200}
        style={{ width: "100%", height: "100%", lineHeight: 1.5 }}
      />
    </div>
  );
};
