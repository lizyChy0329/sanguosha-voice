<script setup>
import { Button } from "@/components/ui/button";

const props = defineProps({
  skillId: String,
  skillName: String,
  characterId: String,
  faction: String,
});

const emit = defineEmits(["play"]);

const factionVariant = {
  wei: "wei",
  shu: "shu",
  wu: "wu",
  qun: "qun",
};

function handleClick() {
  emit("play", props.skillId, props.characterId);
}
</script>

<template>
  <Button
    :data-faction="factionVariant[faction] || 'default'"
    class="btn-press w-full text-sm gap-1 h-auto py-1.5 px-3 font-medium rounded-md transition-all duration-150 ease-out hover:-translate-y-0.5 active:scale-95"
    @click="handleClick"
  >
    <span>{{ skillName }}</span>
  </Button>
</template>

<style scoped>
[data-slot="button"][data-faction="wei"] {
  background: color-mix(in srgb, var(--wei) 18%, transparent);
  color: var(--wei);
}
[data-slot="button"][data-faction="wei"]:hover {
  background: color-mix(in srgb, var(--wei) 28%, transparent);
}
[data-slot="button"][data-faction="shu"] {
  background: color-mix(in srgb, var(--shu) 18%, transparent);
  color: var(--shu);
}
[data-slot="button"][data-faction="shu"]:hover {
  background: color-mix(in srgb, var(--shu) 28%, transparent);
}
[data-slot="button"][data-faction="wu"] {
  background: color-mix(in srgb, var(--wu) 18%, transparent);
  color: var(--wu);
}
[data-slot="button"][data-faction="wu"]:hover {
  background: color-mix(in srgb, var(--wu) 28%, transparent);
}
[data-slot="button"][data-faction="qun"] {
  background: color-mix(in srgb, var(--qun) 18%, transparent);
  color: var(--qun);
}
[data-slot="button"][data-faction="qun"]:hover {
  background: color-mix(in srgb, var(--qun) 28%, transparent);
}
</style>
