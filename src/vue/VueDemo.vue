<script setup lang="ts">
import { ref } from "vue";
import type { DictionaryEntry, CardClickDetail } from "../shared/types";

const props = defineProps<{
  /** 表示対象の単語データ */
  entry: DictionaryEntry;
}>();

// 表示メッセージとクリック回数をリアクティブに保持
const message = ref("未クリック");
const count = ref(0);

const onCardClick = (event: Event): void => {
  // CustomEvent に型を付けて detail.entry を安全に扱う
  const customEvent = event as CustomEvent<CardClickDetail>;
  // クリックごとにカウントアップし、表示を更新
  count.value += 1;
  message.value = `クリック: ${customEvent.detail.entry.japanese}（${count.value}回）`;
};
</script>

<template>
  <div class="demo-block">
    <word-card :entry="props.entry" @card-click="onCardClick"></word-card>
    <p>{{ message }}</p>
  </div>
</template>
