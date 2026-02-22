import { Suspense } from "react";
import Nearby from "./Nearby";

export default function Page() {
  return (
    <Suspense>
      <Nearby />
    </Suspense>
  );
}
