<script setup>
import { computed, ref, onUnmounted } from "vue";
import { CDN_BASE } from "@/constants";

const props = defineProps({
  characterId: String,
  character: Object,
  selected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["select", "longpress"]);

const avatarUrl = computed(() => `${CDN_BASE}/image/character/${props.characterId}.jpg`);

const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23334155%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%2394a3b8%27 font-size=%2720%27%3E%3F%3C/text%3E%3C/svg%3E";

const skillCount = computed(() => props.character.skills?.length || 0);

const pressing = ref(false);
let longPressTimer = null;
let didLongPress = false;

function handlePointerDown() {
  pressing.value = true;
  didLongPress = false;
  longPressTimer = setTimeout(() => {
    didLongPress = true;
    pressing.value = false;
    emit("longpress", props.characterId);
  }, 800);
}

function handlePointerUp() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  pressing.value = false;
  if (!didLongPress) {
    emit("select", props.characterId);
  }
}

function handlePointerLeave() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  pressing.value = false;
}

onUnmounted(() => {
  if (longPressTimer) clearTimeout(longPressTimer);
});
</script>

<template>
  <div
    class="relative overflow-hidden cursor-pointer rounded-lg border-2 select-none touch-none transition-all duration-200 bg-[#2D2D2D]"
    :class="[
      selected ? 'border-[#C8A96E] shadow-[0_0_12px_rgba(200,169,110,0.3)]' : 'border-transparent',
    ]"
    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
    @pointerleave="handlePointerLeave"
  >
    <!-- Skill count badge (top-right) -->
    <div
      v-if="skillCount > 0"
      class="absolute top-1.5 right-1.5 z-10 size-5 rounded-full bg-black/60 text-[10px] font-bold text-white flex items-center justify-center"
    >
      {{ skillCount }}
    </div>

    <!-- Avatar -->
    <div class="relative aspect-[3/4] bg-muted overflow-hidden rounded-t-[6px]">
      <img
        :src="avatarUrl"
        :alt="character.name"
        class="size-full object-cover transition-transform duration-300"
        :class="pressing ? 'scale-95' : ''"
        loading="lazy"
        @error="$event.target.src = fallbackSvg"
      />
    </div>

    <!-- Name overlay at bottom -->
    <div
      class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-1.5 pb-1.5 pt-6"
    >
      <span
        class="block text-center text-[11px] font-semibold text-white/95 truncate leading-tight"
      >
        {{ character.name }}
      </span>
    </div>
  </div>
</template>
