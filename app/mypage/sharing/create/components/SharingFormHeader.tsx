import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";

export function SharingFormHeader({
  storeName,
  content,
  onContentChange,
}: {
  storeName: string;
  content: string;
  onContentChange: (value: string) => void;
}) {
  return (
    <div className="mb-3 flex flex-col gap-2 sm:mb-6 sm:gap-5">
      <Input label="상호명" id="storeName" placeholder={storeName} disabled />

      <div className="flex flex-col font-medium">
        <div className="sm:text-md mb-1.25 text-base sm:mb-2.5">내용</div>
        <Textarea
          className="w-full"
          name="content"
          value={content}
          onChange={e => onContentChange(e.target.value)}
          placeholder="아이들에게 전하고싶은 말을 입력해주세요."
          maxLength={500}
        />
      </div>
    </div>
  );
}
