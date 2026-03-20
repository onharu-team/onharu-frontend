// 멀티 선택 토글
// list 배열에서 value가 있으면 제거, 없으면 추가
export const toggleMultiSelect = (
  value: string,
  list: string[],
  setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setter(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
};
