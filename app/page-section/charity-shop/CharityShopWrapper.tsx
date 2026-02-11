import { SectionTitle } from "../shared/SectionTitle";
export const CharityShopWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mt-section-sm-top lg:mt-section-lg-top">
      <div className="wrapper">
        <SectionTitle title="나눔 가게" />
        {children}
      </div>
    </section>
  );
};
