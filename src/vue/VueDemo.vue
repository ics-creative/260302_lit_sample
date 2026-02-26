<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import type {
  DictionaryEntry,
  CardClickDetail,
  WordCardElement,
} from "../shared/types";

const props = defineProps<{
  entry: DictionaryEntry;
}>();

const cardEl = ref<WordCardElement | null>(null);
// 表示メッセージとクリック回数をリアクティブに保持
const message = ref("未クリック");
const count = ref(0);

const bindCard = (): void => {
  if (!cardEl.value) return;

  // VueでもWeb Componentsにはプロパティ代入で渡す
  cardEl.value.entry = props.entry;
  cardEl.value.addEventListener("card-click", onCardClick);
};

const onCardClick = (event: Event): void => {
  const customEvent = event as CustomEvent<CardClickDetail>;
  // クリックごとにカウントアップし、表示を更新
  count.value += 1;
  message.value = `クリック: ${customEvent.detail.entry.japanese}（${count.value}回）`;
};

// 初回マウント時にイベント購読を開始
onMounted(bindCard);
// アンマウント時にイベント購読を解除
onBeforeUnmount(() =>
  cardEl.value?.removeEventListener("card-click", onCardClick),
);

watch(
  () => props.entry,
  () => {
    if (!cardEl.value) return;
    // 親の更新内容をword-card側に同期する
    cardEl.value.entry = props.entry;
  },
);
</script>

<template>
  <div class="demo-block">
    <word-card ref="cardEl"></word-card>
    <p>{{ message }}</p>
  </div>
</template>
