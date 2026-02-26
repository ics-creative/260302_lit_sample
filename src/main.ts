import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { createApp } from "vue";
import { mount } from "svelte";
import "./lit-warnings";
import "./styles.css";
import "./components/result-card";
import { demoEntries } from "./shared/entries";
import type { CardClickDetail, ResultCardElement } from "./shared/types";
import { ReactDemo } from "./react/ReactDemo";
import VueDemo from "./vue/VueDemo.vue";
import SvelteDemo from "./svelte/SvelteDemo.svelte";

const mainCard = document.querySelector<ResultCardElement>("#main-card");
const mainLog = document.querySelector<HTMLParagraphElement>("#main-log");
const mainState = { count: 0 };

if (mainCard) {
  mainCard.entry = demoEntries[0];
  mainCard.addEventListener("card-click", (event) => {
    if (!mainLog) return;
    const customEvent = event as CustomEvent<CardClickDetail>;
    mainState.count += 1;
    mainLog.textContent = `クリック: ${customEvent.detail.entry.japanese}（${mainState.count}回）`;
  });
}

const reactRoot = document.querySelector("#react-demo");
if (reactRoot) {
  createRoot(reactRoot).render(
    createElement(ReactDemo, { entry: demoEntries[1] }),
  );
}

const vueRoot = document.querySelector("#vue-demo");
if (vueRoot) {
  createApp(VueDemo, { entry: demoEntries[2] }).mount(vueRoot);
}

const svelteRoot = document.querySelector("#svelte-demo");
if (svelteRoot) {
  mount(SvelteDemo, {
    target: svelteRoot,
    props: { entry: demoEntries[3] },
  });
}
