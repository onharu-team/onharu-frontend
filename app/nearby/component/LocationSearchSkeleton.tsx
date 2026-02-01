import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LocationSearchSkeleton = () => {
  return (
    <div className="my-7.5 px-7">
      <Skeleton height={50} />
    </div>
  );
};
