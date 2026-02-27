/// <reference types="vite/client" />

type WordCardElement = import("./shared/types").WordCardElement;
type WordCardProps = import("react").DetailedHTMLProps<
  import("react").HTMLAttributes<WordCardElement>,
  WordCardElement
> & {
  entry?: import("./shared/types").DictionaryEntry;
  "oncard-click"?: (event: Event) => void;
};
type ReactIntrinsicElements = import("react").JSX.IntrinsicElements;

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    unknown
  >;
  export default component;
}

declare module "*.svelte" {
  import type { Component } from "svelte";
  const component: Component<Record<string, unknown>>;
  export default component;
}

declare namespace JSX {
  interface IntrinsicElements extends ReactIntrinsicElements {
    "word-card": WordCardProps;
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends ReactIntrinsicElements {
      "word-card": WordCardProps;
    }
  }
}
