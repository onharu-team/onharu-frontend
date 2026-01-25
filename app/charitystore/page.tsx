"use client";

import { Navigation } from "@/components/feature/category/Navigation";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";
import { Card } from "@/components/ui/card/Card";
import { Category } from "@/components/ui/card/Category";
import { HashTag } from "@/components/ui/card/HashTag";
import Pagination from "@/components/feature/pagination/Pagination";

export default function CharityStore() {
  const { category, setCategory, filterByCategory } = useCategoryFilter();
  //const filterStore = filterByCategory(store)
  //

  return (
    <section className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom">
      <h2 className="sr-only">나눔 가게 전체 보기</h2>
      <div className="wrapper">
        <Navigation value={category} onChange={setCategory} />
        <div className="mt-section-sm-top md:mt-section-lg-top grid grid-cols-4">
          <Card
            storelink=""
            storename="adfdf"
            storeIntroduce="dff"
            category={<Category category="식당" />}
            hashtags={<HashTag tags={["밥"]} />}
          />
        </div>

        <div className="mt-section-sm-top md:mt-section-lg-top flex justify-center">
          <Pagination
            setCurrentPage={() => {}}
            totalDataCount={5}
            currentPage={1}
            perPageDataCount={3}
          ></Pagination>
        </div>
      </div>
    </section>
  );
}
