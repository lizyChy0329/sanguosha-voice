<script setup>
import { ref } from "vue";

const props = defineProps({
  skillId: String,
  skillName: String,
  characterId: String,
  faction: String,
});

const emit = defineEmits(["play"]);

const factionBorder = {
  wei: "border-wei/50",
  shu: "border-shu/50",
  wu: "border-wu/50",
  qun: "border-qun/50",
};

const factionText = {
  wei: "text-wei",
  shu: "text-shu",
  wu: "text-wu",
  qun: "text-qun",
};

const factionHover = {
  wei: "hover:bg-wei/10",
  shu: "hover:bg-shu/10",
  wu: "hover:bg-wu/10",
  qun: "hover:bg-qun/10",
};

const factionPlaying = {
  wei: "bg-wei/20 border-wei text-wei",
  shu: "bg-shu/20 border-shu text-shu",
  wu: "bg-wu/20 border-wu text-wu",
  qun: "bg-qun/20 border-qun text-qun",
};

const playing = ref(false);

function handleClick() {
  playing.value = true;
  setTimeout(() => {
    playing.value = false;
  }, 800);
  emit("play", props.skillId, props.characterId);
}
</script>

<template>
  <button
    class="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all duration-150 ease-out active:scale-95 hover:-translate-y-0.5 bg-transparent"
    :class="[
      playing
        ? factionPlaying[faction] || 'bg-muted border-muted text-foreground'
        : `${factionBorder[faction] || 'border-muted'} ${factionText[faction] || 'text-muted-foreground'} ${factionHover[faction] || 'hover:bg-muted'}`,
    ]"
    @click="handleClick"
  >
    <span>{{ skillName }}</span>
  </button>
</template>
