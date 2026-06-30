<script setup>
import { computed } from "vue";
import { CDN_BASE } from "@/constants";
import { useProom } from "../composables/useProom";

const props = defineProps({
  characterId: String,
  character: Object,
});

const emit = defineEmits(["select"]);

const { hasCharacter } = useProom();

const avatarUrl = computed(() => `${CDN_BASE}/image/character/${props.characterId}.jpg`);

const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23334155%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%2394a3b8%27 font-size=%2720%27%3E%3F%3C/text%3E%3C/svg%3E";

const factionAccent = {
  wei: "border-wei/40",
  shu: "border-shu/40",
  wu: "border-wu/40",
  qun: "border-qun/40",
};

const factionOverlay = {
  wei: "from-wei/25",
  shu: "from-shu/25",
  wu: "from-wu/25",
  qun: "from-qun/25",
};

const factionGlow = {
  wei: "glow-wei",
  shu: "glow-shu",
  wu: "glow-wu",
  qun: "glow-qun",
};

const inProom = computed(() => hasCharacter(props.characterId));

function handleClick() {
  emit("select", props.characterId);
}
</script>

<template>
  <div
    class="relative overflow-hidden cursor-pointer transition-all duration-200 ease-out rounded-xl border bg-card hover:-translate-y-1 active:scale-[0.97] select-none"
    :class="
      inProom
        ? `${factionGlow[character.group] || ''} ${factionAccent[character.group] || 'border-gold/20'}`
        : 'border-gold/20 hover:border-gold/40'
    "
    @click="handleClick"
  >
    <div class="relative aspect-square bg-muted overflow-hidden">
      <img
        :src="avatarUrl"
        :alt="character.name"
        class="size-full object-cover transition-all duration-300"
        :class="inProom ? 'scale-105' : ''"
        loading="lazy"
        @error="$event.target.src = fallbackSvg"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        :class="inProom ? factionOverlay[character.group] || '' : ''"
      />
      <div class="absolute bottom-0 inset-x-0 px-2 pb-2 pt-6">
        <span
          class="block text-center text-xs font-heading font-bold text-white/90 truncate leading-tight"
        >
          {{ character.name }}
        </span>
      </div>
    </div>
  </div>
</template>
