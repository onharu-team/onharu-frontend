"use client";

import { SideMenu } from "./component/SideMenu";
import { Map } from "@/components/feature/map/map";
import { Navigation } from "@/components/feature/category/Navigation";
import { useCategoryFilter } from "@/components/feature/category/useCategoryFilter";

export default function Nearby() {
  const { category, setCategory, filterByCategory } = useCategoryFilter();

  return (
    <section>
      <h2 className="sr-only">내 주변 착한가게를 찾을 수 있습니다.</h2>
      <div className="flex h-[100vh]">
        <SideMenu></SideMenu>
        <div className="relative flex-1">
          <div className="absolute top-5 left-[50%] z-50 w-full -translate-x-[50%]">
            <Navigation
              value={category}
              onChange={setCategory}
              InitializePage={() => {}}
            ></Navigation>
          </div>
          <Map type="search" address="경기도 수원시 권선구 세지로 39번길" category="식당"></Map>
        </div>
      </div>
    </section>
  );
}
