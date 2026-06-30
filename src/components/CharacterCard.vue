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

const factionGlow = {
  wei: "glow-wei",
  shu: "glow-shu",
  wu: "glow-wu",
  qun: "glow-qun",
};

const borderAccent = {
  wei: "border-wei/70",
  shu: "border-shu/70",
  wu: "border-wu/70",
  qun: "border-qun/70",
};

function handleClick() {
  emit("select", props.characterId);
}
</script>

<template>
  <div
    class="relative overflow-hidden cursor-pointer transition-all duration-200 ease-out rounded-xl border bg-card active:scale-[0.97] select-none"
    :class="
      inProom
        ? `${factionGlow[character.group] || 'glow-gold'} ${borderAccent[character.group] || 'border-gold/70'}`
        : 'border-gold/20 hover:border-gold/40 hover:scale-[1.02]'
    "
    @click="handleClick"
  >
    <div
      class="absolute -top-1 -right-1 z-10 size-5 rounded-full bg-green-500 flex items-center justify-center shadow-xs"
      v-if="inProom"
    >
      <CheckIcon class="size-3 text-white" />
    </div>
    <div class="relative aspect-square bg-muted overflow-hidden rounded-[11px]">
      <img
        :src="avatarUrl"
        :alt="character.name"
        class="size-full object-cover transition-all duration-300"
        :class="inProom ? 'scale-105 brightness-105' : ''"
        loading="lazy"
        @error="$event.target.src = fallbackSvg"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        :class="inProom ? 'from-black/50' : ''"
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
