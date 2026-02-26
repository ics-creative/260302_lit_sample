export type DictionaryEntry = {
  japanese: string;
  latin: string;
  meaning: string;
};

export type CardClickDetail = {
  entry: DictionaryEntry;
};

export type ResultCardElement = HTMLElement & {
  entry: DictionaryEntry;
};
