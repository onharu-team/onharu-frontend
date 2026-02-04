import Input from "@/components/ui/Input";

export function PeopleCountInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="mt-2.5 mb-1.75 text-sm font-medium sm:mt-5 sm:mb-3.75 sm:text-base">
        몇 명에게 나눔할까요?
      </div>
      <Input
        id="peopleCount"
        value={value}
        onChange={e => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder="숫자만 입력해 주세요. ex) 3"
      />
    </div>
  );
}
