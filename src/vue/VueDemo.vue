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
const message = ref("未クリック");
const count = ref(0);

const bindCard = (): void => {
  if (!cardEl.value) return;

  cardEl.value.entry = props.entry;
  cardEl.value.addEventListener("card-click", onCardClick);
};

const onCardClick = (event: Event): void => {
  const customEvent = event as CustomEvent<CardClickDetail>;
  count.value += 1;
  message.value = `クリック: ${customEvent.detail.entry.japanese}（${count.value}回）`;
};

onMounted(bindCard);
onBeforeUnmount(() =>
  cardEl.value?.removeEventListener("card-click", onCardClick),
);

watch(
  () => props.entry,
  () => {
    if (!cardEl.value) return;
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
