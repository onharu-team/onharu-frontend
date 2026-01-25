import { Banner } from "./page-section/banner/Banner";
import { FindStore } from "./page-section/find-store/FindStore";
import { CharityShop } from "./page-section/charity-shop/CharitySopt";
import { ThanksCard } from "./page-section/thanks-card/ThanksCard";
import { Inquiry } from "./page-section/inquiry/Inquiry";

export default function Home() {
  return (
    <>
      <Banner />
      <FindStore />
      <CharityShop />
      <ThanksCard />
      <Inquiry />
    </>
  );
}
