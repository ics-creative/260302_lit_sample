import { useState } from "react";
import type { DictionaryEntry, CardClickDetail } from "../shared/types";

type Props = {
  /** 表示対象の単語データ */
  entry: DictionaryEntry;
};

/**
 * React から <word-card> を利用するデモ。
 * プロパティ代入とカスタムイベント購読の流れを示す。
 */
export function ReactDemo({ entry }: Props) {
  // 表示中のメッセージ（クリック結果）を保持
  const [message, setMessage] = useState("未クリック");
  // クリック回数だけを管理（UI表示はmessage側で行う）
  const [, setCount] = useState(0);

  const onCardClick = (event: Event): void => {
    const customEvent = event as CustomEvent<CardClickDetail>;
    // setStateの関数形式で確実にインクリメント
    setCount((previous) => {
      const next = previous + 1;
      setMessage(`クリック: ${customEvent.detail.entry.japanese}（${next}回）`);
      return next;
    });
  };

  return (
    <div className="demo-block">
      <word-card entry={entry} oncard-click={onCardClick}></word-card>
      <p>{message}</p>
    </div>
  );
}
