/** 単語カードに表示する辞書エントリーデータ */
export type DictionaryEntry = {
  japanese: string;
  latin: string;
  meaning: string;
};

/** word-card が dispatch する card-click イベントの詳細 */
export type CardClickDetail = {
  entry: DictionaryEntry;
};

/** カスタム要素 <word-card> の型（プロパティ entry を持つ） */
export type WordCardElement = HTMLElement & {
  entry: DictionaryEntry;
};
