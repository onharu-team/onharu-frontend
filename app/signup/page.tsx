import { Suspense } from "react";
import SignupTypePage from "./SignupTypePage";

export default function Page() {
  return (
    <Suspense>
      <SignupTypePage />
    </Suspense>
  );
}
