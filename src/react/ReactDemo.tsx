import { useEffect, useRef, useState } from "react";
import type {
  DictionaryEntry,
  CardClickDetail,
  ResultCardElement,
} from "../shared/types";

type Props = {
  entry: DictionaryEntry;
};

export function ReactDemo({ entry }: Props) {
  const cardRef = useRef<ResultCardElement | null>(null);
  const [message, setMessage] = useState("未クリック");
  const [, setCount] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.entry = entry;

    const onClick = (event: Event): void => {
      const customEvent = event as CustomEvent<CardClickDetail>;
      setCount((previous) => {
        const next = previous + 1;
        setMessage(
          `クリック: ${customEvent.detail.entry.japanese}（${next}回）`,
        );
        return next;
      });
    };

    card.addEventListener("card-click", onClick);
    return () => card.removeEventListener("card-click", onClick);
  }, [entry]);

  return (
    <div className="demo-block">
      <result-card ref={cardRef}></result-card>
      <p>{message}</p>
    </div>
  );
}
