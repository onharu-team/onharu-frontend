type FormLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function FormLayout({ title, children }: FormLayoutProps) {
  return (
    <>
      <h2 className="mb-5 text-xl sm:text-2xl">{title}</h2>
      <div className="mb-1.25 text-right">
        <span className="text-danger">*</span>는 필수 입력사항입니다.
      </div>
      {children}
    </>
  );
}
