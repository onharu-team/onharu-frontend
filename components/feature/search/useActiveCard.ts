import { useState, useRef } from "react";

export const useActiveCard = () => {
  const [activeId, setActiveId] = useState("");
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleActiveCard = (id: string) => {
    setActiveId(id);
    const el = cardRefs.current[id];

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return { activeId, setActiveId, handleActiveCard, cardRefs };
};
