<script setup>
import { ref, watch, onUnmounted } from "vue";
import bgmList from "../data/bgm.json";
import { useAudio } from "../composables/useAudio";
import { PlayIcon, PauseIcon } from "@lucide/vue";

const { playBGM, getBGMProgress, getBGMDuration, seekBGM } = useAudio();

const currentBgm = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const duration = ref(0);
let tickTimer = null;

function toggleBGM(item) {
  const result = playBGM(item.id, item.file);
  currentBgm.value = item;
  isPlaying.value = result.playing;
}

function togglePlay() {
  if (!currentBgm.value) {
    toggleBGM(bgmList[0]);
    return;
  }
  const result = playBGM(currentBgm.value.id, currentBgm.value.file);
  isPlaying.value = result.playing;
}

function onSeek(values) {
  seekBGM(values[0]);
  progress.value = values[0];
}

function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function startTick() {
  stopTick();
  tickTimer = setInterval(() => {
    const d = getBGMDuration();
    if (d && d > 0) duration.value = d;
    if (isPlaying.value) progress.value = getBGMProgress();
  }, 200);
}

function stopTick() {
  if (tickTimer) {
    clearInterval(tickTimer);
    tickTimer = null;
  }
}

watch(isPlaying, (v) => {
  if (v) {
    startTick();
  } else {
    stopTick();
  }
});

onUnmounted(() => {
  stopTick();
});
</script>

<template>
  <div class="bg-[#1a1410] select-none">
    <div class="flex items-center px-4 py-4 gap-4">
      <!-- Play/Pause button: large gold circle -->
      <button
        @click="togglePlay"
        class="shrink-0 size-12 rounded-full bg-[#C8A96E] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all duration-150 shadow-lg"
      >
        <PlayIcon v-if="!isPlaying" class="size-5 text-white ml-0.5" />
        <PauseIcon v-else class="size-5 text-white" />
      </button>

      <!-- Progress bar -->
      <div
        class="flex-1 h-1 bg-[#3D352C] rounded-full overflow-hidden relative cursor-pointer"
        @click="
          (e) => {
            if (!duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            onSeek([pct * duration]);
          }
        "
      >
        <div
          class="absolute inset-0 bg-[#C8A96E] rounded-full origin-left transition-transform duration-100"
          :style="{
            transform: `scaleX(${duration ? progress / duration : 0})`,
          }"
        />
        <!-- Scrub handle -->
        <div
          class="absolute top-1/2 -translate-y-1/2 size-3.5 bg-[#C8A96E] rounded-full shadow-md pointer-events-none transition-transform duration-100"
          :style="{
            left: `calc(${duration ? (progress / duration) * 100 : 0}% - 7px)`,
          }"
        />
      </div>

      <!-- Time display -->
      <span class="shrink-0 text-xs text-[#F7F2EC] tabular-nums opacity-80">
        {{ formatTime(progress) }} / {{ formatTime(duration) }}
      </span>
    </div>
  </div>
</template>
