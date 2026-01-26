/* NavItems pathname속성값들은 추후 상세페이지가 만들어진 후 경로 수정해야합니다. */

export const NavItems = [
  {
    id: 1,
    pathname: "/charitystore",
    title: "나눔가게",
    requireAuth: false,
  },
  {
    id: 2,
    pathname: "/",
    title: "지도",
    requireAuth: false,
  },
  {
    id: 3,
    pathname: "",
    title: "채팅",
    requireAuth: true,
  },
];
