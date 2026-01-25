"use client";

import { SectionTitle } from "../shared/SectionTitle";
import { Card } from "@/components/ui/card/Card";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import { CardData } from "./data/data";

export const CharityShop = () => {
  return (
    <>
      <section className="mt-section-sm-top lg:mt-section-lg-top">
        <div className="wrapper">
          <SectionTitle title="나눔 가게" />
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
            {CardData.map(items => (
              <Card
                key={items.id}
                storelink={items.storelink}
                storename={items.storename}
                storeIntroduce={items.storeIntroduce}
                category={<Category category={items.category} />}
                hashtags={<HashTag tags={items.tags || []} />}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
