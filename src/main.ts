import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { createApp } from "vue";
import { mount } from "svelte";
import "./lit-warnings";
import "./styles.css";
import "./components/word-card";
import { demoEntries } from "./shared/entries";
import type { CardClickDetail, WordCardElement } from "./shared/types";
import { ReactDemo } from "./react/ReactDemo";
import VueDemo from "./vue/VueDemo.vue";
import SvelteDemo from "./svelte/SvelteDemo.svelte";

// 素のHTMLで使うword-cardの参照
const mainCard = document.querySelector<WordCardElement>("#main-card");
const mainLog = document.querySelector<HTMLParagraphElement>("#main-log");
const mainState = { count: 0 };

if (mainCard) {
  // 初期表示データをセット
  mainCard.entry = demoEntries[0];

  // クリックイベントを受け取り表示メッセージを更新
  mainCard.addEventListener("card-click", (event) => {
    if (!mainLog) return;
    const customEvent = event as CustomEvent<CardClickDetail>;
    mainState.count += 1;
    mainLog.textContent = `クリック: ${customEvent.detail.entry.japanese}（${mainState.count}回）`;
  });
}

const reactRoot = document.querySelector("#react-demo");
if (reactRoot) {
  // React側に同じword-cardをマウント
  createRoot(reactRoot).render(
    createElement(ReactDemo, { entry: demoEntries[1] }),
  );
}

const vueRoot = document.querySelector("#vue-demo");
if (vueRoot) {
  // Vue側に同じword-cardをマウント
  createApp(VueDemo, { entry: demoEntries[2] }).mount(vueRoot);
}

const svelteRoot = document.querySelector("#svelte-demo");
if (svelteRoot) {
  // Svelte側に同じword-cardをマウント
  mount(SvelteDemo, {
    target: svelteRoot,
    props: { entry: demoEntries[3] },
  });
}
