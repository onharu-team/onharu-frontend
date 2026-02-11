import { RiPokerHeartsFill } from "@remixicon/react";

export const Like = ({ isLiked = false }: { isLiked: boolean }) => {
  return (
    <button
      onClick={e => {
        e.preventDefault();
        console.log("like");
      }}
    >
      {isLiked ? (
        <RiPokerHeartsFill size={24} color="rgba(235,50,35,1)" />
      ) : (
        <RiPokerHeartsFill size={24} color="rgba(153,153,153,1)" />
      )}
    </button>
  );
};
