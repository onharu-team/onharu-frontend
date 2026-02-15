import { CharityMain } from "@/types/store/type";

/**
 * 내 주변 페이지에서만 사용됩니다.
 * 직접 검색어를 통해 매장을 검색합니다.
 * 해당 함수 수정 예정임!!
 */

export function searchStores({ stores, keyword }: { stores: CharityMain[]; keyword: string }) {
  if (!keyword.trim()) return stores;

  return stores.filter(store => store.name.includes(keyword) || store.address.includes(keyword));
}
