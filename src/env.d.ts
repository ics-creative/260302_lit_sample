/// <reference types="vite/client" />

type ResultCardElement = import("./shared/types").ResultCardElement;
type ResultCardProps = import("react").DetailedHTMLProps<
  import("react").HTMLAttributes<ResultCardElement>,
  ResultCardElement
>;
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
    "result-card": ResultCardProps;
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends ReactIntrinsicElements {
      "result-card": ResultCardProps;
    }
  }
}
