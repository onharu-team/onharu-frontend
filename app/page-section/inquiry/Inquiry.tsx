import BgrAccordion from "@/components/ui/Accordion";
import { SectionTitle } from "../shared/SectionTitle";
import { InquiryData } from "./data/data";

export const Inquiry = () => {
  return (
    <section className="mt-section-sm-top mb-section-sm-bottom md:mt-section-lg-top md:mb-section-lg-bottom">
      <div className="wrapper">
        <SectionTitle title="자주 묻는 질문" />
        <BgrAccordion items={InquiryData} />
      </div>
    </section>
  );
};
