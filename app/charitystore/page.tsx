import { Suspense } from "react";
import CharityStore from "./CharityStore";

export default function Page() {
  return (
    <Suspense>
      <CharityStore />
    </Suspense>
  );
}
