<script setup>
import { computed } from "vue";
import { CDN_BASE } from "@/constants";
import { useProom } from "../composables/useProom";
import { CheckIcon } from "@lucide/vue";

const props = defineProps({
  characterId: String,
  character: Object,
});

const emit = defineEmits(["select"]);

const { hasCharacter } = useProom();

const avatarUrl = computed(() => `${CDN_BASE}/image/character/${props.characterId}.jpg`);

const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23334155%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%2394a3b8%27 font-size=%2720%27%3E%3F%3C/text%3E%3C/svg%3E";

const inProom = computed(() => hasCharacter(props.characterId));

const factionOverlay = {
  wei: "bg-[hsl(var(--wei-light)/0.2)]",
  shu: "bg-[hsl(var(--shu-light)/0.2)]",
  wu: "bg-[hsl(var(--wu-light)/0.2)]",
  qun: "bg-[hsl(var(--qun-light)/0.2)]",
};

const factionBadgeBg = {
  wei: "bg-wei-light",
  shu: "bg-shu-light",
  wu: "bg-wu-light",
  qun: "bg-qun-light",
};

const lightVar = {
  wei: "wei-light",
  shu: "shu-light",
  wu: "wu-light",
  qun: "qun-light",
};

const borderStyle = computed(() => {
  if (!inProom.value) return {};
  const v = lightVar[props.character.group];
  return { borderColor: `hsl(var(--${v}) / 0.7)`, borderWidth: "1px", borderStyle: "solid" };
});

const avatarStyle = computed(() => {
  if (!inProom.value) return {};
  const v = lightVar[props.character.group];
  return { filter: `brightness(1.1) drop-shadow(0 0 12px hsl(var(--${v})/0.6))` };
});

const pulseGlowStyle = computed(() => {
  if (!inProom.value) return {};
  const v = lightVar[props.character.group];
  return { "--glow-color": `hsl(var(--${v}) / 0.3)` };
});

function handleClick() {
  emit("select", props.characterId);
}
</script>

<template>
  <div
    class="relative overflow-hidden cursor-pointer transition-all duration-200 ease-out rounded-xl bg-card hover:-translate-y-1 active:scale-[0.97] select-none"
    :class="inProom ? 'border animate-pulse-glow' : 'border border-gold/20 hover:border-gold/40'"
    :style="inProom ? { ...borderStyle, ...pulseGlowStyle } : {}"
    @click="handleClick"
  >
    <div class="relative aspect-square bg-muted overflow-hidden rounded-[11px]">
      <img
        :src="avatarUrl"
        :alt="character.name"
        class="size-full object-cover transition-all duration-300"
        :class="inProom ? 'scale-105' : ''"
        :style="avatarStyle"
        loading="lazy"
        @error="$event.target.src = fallbackSvg"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div
        v-if="inProom"
        class="absolute inset-0 opacity-20"
        :class="factionOverlay[character.group] || ''"
      />
      <div
        v-if="inProom"
        class="absolute top-1.5 right-1.5 size-5 rounded-md flex items-center justify-center shadow-sm"
        :class="factionBadgeBg[character.group] || 'bg-gold'"
      >
        <CheckIcon class="size-3 text-white" />
      </div>
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
