import { SectionTitle } from "./shared/SectionTitle";
import { Card } from "@/components/ui/card/Card";

export const CharityShop = () => {
  return (
    <>
      <section className="mt-section-lg-top">
        <div className="wrapper">
          <SectionTitle title="나눔 가게" />
          <div className="mt-9">
            <Card></Card>
          </div>
        </div>
      </section>
    </>
  );
};
