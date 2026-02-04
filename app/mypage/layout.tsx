import Sidebar from "./components/Sidebar";

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
  const user = { role: "owner" as const };

  return (
    <section className="lg:mt-section-lg-top mb-section-sm-bottom lg:mb-section-lg-bottom">
      <div className="wrapper flex min-h-screen flex-col lg:flex-row">
        <Sidebar role={user.role} />
        <main className="flex-1 py-4 sm:p-6">{children}</main>
      </div>
    </section>
  );
}
