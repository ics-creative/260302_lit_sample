<script lang="ts">
  import type { CardClickDetail, DictionaryEntry, WordCardElement } from "../shared/types";

  let { entry }: { entry: DictionaryEntry } = $props();
  let cardEl = $state<WordCardElement | null>(null);
  // 表示用メッセージとクリック回数
  let message = $state("未クリック");
  let count = $state(0);

  const onCardClick = (event: Event): void => {
    const customEvent = event as CustomEvent<CardClickDetail>;
    // クリック時にカウントアップして表示更新
    count += 1;
    message = `クリック: ${customEvent.detail.entry.japanese}（${count}回）`;
  };

  $effect(() => {
    if (!cardEl) return;

    // Svelteでも同じくプロパティ経由でデータを渡す
    cardEl.entry = entry;
    // ハイフン付きイベント名はDOMイベントとして購読する
    cardEl.addEventListener("card-click", onCardClick);

    // effectのクリーンアップで購読を解除
    return () => cardEl?.removeEventListener("card-click", onCardClick);
  });
</script>

<div class="demo-block">
  <word-card bind:this={cardEl}></word-card>
  <p>{message}</p>
</div>
