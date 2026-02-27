<script lang="ts">
  import type { CardClickDetail, DictionaryEntry, WordCardElement } from "../shared/types";

  // 親から受け取る単語データ（Svelte 5 の $props）
  let { entry }: { entry: DictionaryEntry } = $props();
  let cardEl = $state<WordCardElement | null>(null);
  // 表示用メッセージとクリック回数
  let message = $state("未クリック");
  let count = $state(0);

  const onCardClick = (event: Event): void => {
    // CustomEvent の detail から選択データを取り出す
    const customEvent = event as CustomEvent<CardClickDetail>;
    // クリック時にカウントアップして表示更新
    count += 1;
    message = `クリック: ${customEvent.detail.entry.japanese}（${count}回）`;
  };

  $effect(() => {
    if (!cardEl) return;

    // Svelteでも同じくプロパティ経由でデータを渡す
    cardEl.entry = entry;
  });
</script>

<div class="demo-block">
  <word-card bind:this={cardEl} oncard-click={onCardClick}></word-card>
  <p>{message}</p>
</div>
