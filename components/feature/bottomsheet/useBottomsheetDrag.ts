import { useRef, useEffect, useState } from "react";

type SheetState = "hidden" | "half" | "full";
type DragPhase = "click" | "dragging" | "settling";
type DragState = "sheet" | "content" | null;
type DragSource = "handle" | "content" | null;

interface SheetMetrics {
  hidden: number; // 85px
  half: number; // 40vh or content height
  full: number; // 100vh - 44px
}

export function useBottomSheetDrag({ open }: { open: boolean }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const ScrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<SheetState>("half");
  const [phase, setPhase] = useState<DragPhase>("click");
  const [height, setHeight] = useState(0);

  const dragsourceRef = useRef<DragSource>(null);
  const dragStateRef = useRef<DragState>(null);

  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const contentHeight = useRef(0);
  const metrics = useRef<SheetMetrics>({ hidden: 85, half: 0, full: 0 });
  const canExpand = useRef(false);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!open || !contentRef.current) return;

    const test = () => {
      contentHeight.current = contentRef.current!.offsetHeight + 33;
      //content 높이만큼 content의 높이 설정

      const halfHeight = Math.max(
        Math.min(window.innerHeight * 0.4 + 33, contentHeight.current),
        400
      ); //높이의 40%+33px과 content래퍼 높이중에 작은쪽 선택

      const fullHeight = window.innerHeight - 44;
      //최대 높이는 뷰포트 높이 - 44px

      metrics.current = {
        hidden: 85,
        half: halfHeight,
        full: fullHeight,
      };

      canExpand.current = contentHeight.current > halfHeight + 50;

      setState("half");
      setHeight(halfHeight);
    };

    setTimeout(test, 100);
  }, [open]);

  // 글로벌 마우스 이벤트 리스너 - 마운트 시 한 번만 등록
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaY = dragStartY.current - e.clientY;
      const newHeight = Math.max(
        metrics.current.hidden,
        Math.min(
          canExpand.current ? metrics.current.full : metrics.current.half,
          dragStartHeight.current + deltaY
        )
      );

      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      if (!isDragging.current || !ScrollRef.current) return;

      isDragging.current = false;
      setPhase("settling");

      const { hidden, half, full } = metrics.current;
      const currentHeight = height;

      let targetState: SheetState;
      let targetHeight: number;

      if (!canExpand.current) {
        targetState = currentHeight > (hidden + half) / 2 ? "half" : "hidden";
        targetHeight = targetState === "half" ? half : hidden;
      } else {
        if (currentHeight > (half + full) / 2) {
          targetState = "full";
          targetHeight = full;
          ScrollRef.current.style.overflowY = "auto";
        } else if (currentHeight > (hidden + half) / 2) {
          targetState = "half";
          targetHeight = half;
          ScrollRef.current.style.overflowY = "auto";
        } else {
          targetState = "hidden";
          targetHeight = hidden;
          ScrollRef.current.style.overflowY = "hidden";
        }
      }

      setState(targetState);
      setHeight(targetHeight);
      setTimeout(() => setPhase("click"), 300);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [height]); // height가 변경될 때마다 최신값 캡처

  const handleTouchStart = (e: React.TouchEvent) => {
    const node = e.target as Node;
    const isHandle = handleRef.current?.contains(node);
    const isSheet = sheetRef.current?.contains(node);

    if (isHandle) {
      //클릭한 곳이 핸들러라면 드래그 소스는 handle, 컨테이너라면 content
      dragsourceRef.current = "handle";
    } else if (isSheet) {
      dragsourceRef.current = "content";
    } else {
      dragsourceRef.current = null;
    }

    //if (!isHandle && !isSheet) return;

    dragStartY.current = e.touches[0].clientY;
    dragStartHeight.current = height;
    isDragging.current = true;
    setPhase("dragging");
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !contentRef.current || !ScrollRef.current) return;

    const deltaY = dragStartY.current - e.touches[0].clientY;
    // -는 내리고, +는 올리는 동작
    const scrollPosition = contentRef.current.scrollTop === 0;

    const isMoveSheet =
      dragsourceRef.current === "handle" ||
      (dragsourceRef.current === "content" && scrollPosition && deltaY > 0);

    if (isMoveSheet) {
      dragStateRef.current = "sheet";
    } else {
      dragStateRef.current = "content";
    }

    if (dragStateRef.current === "content") return;

    ScrollRef.current.style.overflowY = "hidden";

    const newHeight = Math.max(
      metrics.current.hidden,
      Math.min(
        canExpand.current ? metrics.current.full : metrics.current.half,
        dragStartHeight.current + deltaY
      )
    );

    setHeight(newHeight);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || !ScrollRef.current) return;

    isDragging.current = false;
    setPhase("settling");

    const { hidden, half, full } = metrics.current;
    const currentHeight = height;

    let targetState: SheetState;
    let targetHeight: number;

    if (!canExpand.current) {
      targetState = height > (hidden + half) / 2 ? "half" : "hidden";
      targetHeight = targetState === "half" ? half : hidden;
    } else {
      if (currentHeight > (half + full) / 2) {
        targetState = "full";
        targetHeight = full;
        ScrollRef.current.style.overflowY = "auto";
      } else if (currentHeight > (hidden + half) / 2) {
        targetState = "half";
        targetHeight = half;
        ScrollRef.current.style.overflowY = "auto";
      } else {
        targetState = "hidden";
        targetHeight = hidden;
        ScrollRef.current.style.overflowY = "hidden";
      }
    }

    setState(targetState);
    setHeight(targetHeight);
    setTimeout(() => setPhase("click"), 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const node = e.target as Node;
    const isHandle = handleRef.current?.contains(node);
    const isSheet = sheetRef.current?.contains(node);

    if (!isHandle && !isSheet) return;

    dragStartY.current = e.clientY;
    dragStartHeight.current = height;
    isDragging.current = true;
    setPhase("dragging");
  };

  return {
    sheetRef,
    ScrollRef,
    contentRef,
    handleRef,
    height,
    phase,
    state,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
    },
  };
}
