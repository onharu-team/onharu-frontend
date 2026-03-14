import { ChildReservationCardProps } from "../reservations/types";
import CardList from "./CardList";

export default function ChildReviewCard({
  reviewTargets,
}: {
  reviewTargets: ChildReservationCardProps[];
}) {
  return (
    <div className="bg-secondary flex-1 rounded-[10px] p-5 lg:p-7">
      <CardList
        title="사장님께 감사리뷰를 작성해보세요!"
        items={reviewTargets}
        emptyTitle="작성 가능한 리뷰가 없어요."
        emptySubtitle="나눔 가게를 이용하면 감사 리뷰를 남길 수 있어요!"
        emptyButtonText="나눔가게 찾기"
        emptyLink="/charitystore"
      />
    </div>
  );
}
