import { OwnerMyPage } from "./components/OwnerMyPage";
import { ChildMyPage } from "./components/ChildMyPage";
import { ownerUser } from "./data/mockData";
import { User } from "./types";

export default function MyPage() {
  const user = ownerUser;

  if (user.role === "owner") {
    return <OwnerMyPage user={user as User & { role: "owner" }} />;
  }

  return <ChildMyPage user={user as User & { role: "child" }} />;
}
