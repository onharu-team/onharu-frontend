import Image from "next/image";

export function ChatRoomEmpty() {
  return (
    <div className="border-border h-[calc(100vh-120px)] w-full rounded-[10px] border">
      <div className="flex min-h-full w-full flex-col items-center justify-center">
        <div className="mb-6 text-center text-base sm:text-xl">
          <div>채팅방을 선택해 </div>
          <div>대화를 확인해보세요.</div>
        </div>

        <Image src="/image/character/squirrel-wink.svg" alt="" width={200} height={200} />
      </div>
    </div>
  );
}
