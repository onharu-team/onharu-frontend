"use client";
import { useQuery } from "@tanstack/react-query";
import { GetStores } from "@/lib/api/GetStores";
import { SectionTitle } from "../shared/SectionTitle";
import { CharityShopWrapper } from "./CharityShopWrapper";
import { Card } from "@/components/ui/card/Card";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import { Thumbnail } from "@/components/ui/card/Thumbnail";
import { CharityMain } from "./data/type";
import { CardSkeleton } from "@/components/ui/card/CardSkeleton";

export const CharityShop = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stores"],
    queryFn: GetStores,
  });

  if (isLoading) {
    return (
      <CharityShopWrapper>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </CharityShopWrapper>
    );
  }

  if (error) {
    return (
      <CharityShopWrapper>
        <p className="font-gmarketsans text-md text-center font-semibold">
          데이터를 불러오지 못했습니다.
        </p>
      </CharityShopWrapper>
    );
  }

  const stores: CharityMain[] = data?.data?.stores ?? [];

  return (
    <>
      <CharityShopWrapper>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {stores.map(items => (
            <Card
              key={items.id}
              type="charity"
              storeId={items.id}
              storelink={String(items.storelink)}
              storeThumnail={
                <Thumbnail
                  src={""}
                  openTime={items.openTime}
                  closeTime={items.closeTime}
                  isOpen={items.isOpen}
                  hasSharing={items.hasSharing}
                />
              }
              storename={items.name}
              storeIntroduce={items.introduction}
              category={<Category category={items.categoryName} />}
              hashtags={<HashTag tags={items.tags || []} />}
            />
          ))}
        </div>
      </CharityShopWrapper>
    </>
  );
};
