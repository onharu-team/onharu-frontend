export const Category = ({ category }: { category: string }) => {
  return (
    <div className="bg-main absolute top-2 right-4.5 rounded-sm px-3 py-0.5 text-sm text-white md:px-5 md:py-1 md:text-base">
      {category}
    </div>
  );
};
