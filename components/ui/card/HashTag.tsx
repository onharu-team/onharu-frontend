export const HashTag = ({ tags }: { tags: string[] }) => {
  return (
    <>
      {tags.map(tag => (
        <span
          key={tag}
          className="bg-main fle items-center justify-center rounded-full px-3 py-0.5 text-xs text-white md:py-1 md:text-sm"
        >
          #{tag}
        </span>
      ))}
    </>
  );
};
