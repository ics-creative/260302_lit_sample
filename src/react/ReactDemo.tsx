import { useEffect, useRef, useState } from "react";
import type {
  DictionaryEntry,
  CardClickDetail,
  WordCardElement,
} from "../shared/types";

type Props = {
  /** 表示対象の単語データ */
  entry: DictionaryEntry;
};

/**
 * React から <word-card> を利用するデモ。
 * プロパティ代入とカスタムイベント購読の流れを示す。
 */
export function ReactDemo({ entry }: Props) {
  const cardRef = useRef<WordCardElement | null>(null);
  // 表示中のメッセージ（クリック結果）を保持
  const [message, setMessage] = useState("未クリック");
  // クリック回数だけを管理（UI表示はmessage側で行う）
  const [, setCount] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 属性ではなくプロパティとしてデータを渡す
    card.entry = entry;

    const onClick = (event: Event): void => {
      const customEvent = event as CustomEvent<CardClickDetail>;
      // setStateの関数形式で確実にインクリメント
      setCount((previous) => {
        const next = previous + 1;
        setMessage(
          `クリック: ${customEvent.detail.entry.japanese}（${next}回）`,
        );
        return next;
      });
    };

    // ハイフン付きカスタムイベントはDOMイベントとして購読する
    card.addEventListener("card-click", onClick);
    // アンマウント時に購読を解除してリークを防ぐ
    return () => card.removeEventListener("card-click", onClick);
  }, [entry]);

  return (
    <div className="demo-block">
      <word-card ref={cardRef}></word-card>
      <p>{message}</p>
    </div>
  );
}
