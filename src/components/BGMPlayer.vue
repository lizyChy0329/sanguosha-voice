<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import bgmList from "../data/bgm.json";
import { useAudio } from "../composables/useAudio";
import { SkipBackIcon, SkipForwardIcon, PlayIcon, PauseIcon, ListMusicIcon } from "@lucide/vue";

const { playBGM, getBGMProgress, getBGMDuration, seekBGM } = useAudio();

const currentBgm = ref(null);
const isPlaying = ref(false);
const showList = ref(false);
const progress = ref(0);
const duration = ref(0);
let tickTimer = null;

function toggleBGM(item) {
  const result = playBGM(item.id, item.file);
  currentBgm.value = item;
  isPlaying.value = result.playing;
  showList.value = false;
}

function togglePlay() {
  if (!currentBgm.value) return;
  const result = playBGM(currentBgm.value.id, currentBgm.value.file);
  isPlaying.value = result.playing;
}

const currentIndex = computed(() => {
  if (!currentBgm.value) return -1;
  return bgmList.findIndex((b) => b.id === currentBgm.value.id);
});

function nextBgm() {
  if (currentIndex.value < bgmList.length - 1) {
    toggleBGM(bgmList[currentIndex.value + 1]);
  } else {
    toggleBGM(bgmList[0]);
  }
}

function prevBgm() {
  if (currentIndex.value > 0) {
    toggleBGM(bgmList[currentIndex.value - 1]);
  } else {
    toggleBGM(bgmList[bgmList.length - 1]);
  }
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
    if (isPlaying.value) {
      duration.value = getBGMDuration();
      progress.value = getBGMProgress();
    }
  }, 250);
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
  <div
    class="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border"
  >
    <div
      class="h-1 bg-muted relative cursor-pointer group"
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
        class="absolute inset-y-0 left-0 bg-gold transition-[width] duration-200 ease-linear"
        :style="{ width: duration ? `${(progress / duration) * 100}%` : '0%' }"
      />
      <div
        class="absolute top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity"
        :style="{ left: duration ? `${(progress / duration) * 100}%` : '0%' }"
      />
    </div>

    <div class="flex items-center px-4 py-2 max-w-3xl mx-auto">
      <div class="w-[72px] shrink-0">
        <Button
          variant="ghost"
          size="sm"
          class="text-xs text-muted-foreground truncate gap-1 -ml-2"
          @click="showList = !showList"
        >
          <ListMusicIcon class="size-3.5 shrink-0" />
          {{ currentBgm ? currentBgm.name : "选曲" }}
        </Button>
      </div>

      <div class="flex-1 flex items-center justify-center gap-1">
        <Button variant="ghost" size="icon-sm" class="btn-press" @click="prevBgm">
          <SkipBackIcon class="size-4" />
        </Button>
        <Button size="icon" class="size-9 rounded-full btn-press" @click="togglePlay">
          <PlayIcon v-if="!isPlaying" class="size-4" />
          <PauseIcon v-else class="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" class="btn-press" @click="nextBgm">
          <SkipForwardIcon class="size-4" />
        </Button>
      </div>

      <div class="w-[72px] shrink-0 flex items-center justify-end">
        <span class="text-base text-muted-foreground tabular-nums font-medium">
          {{ formatTime(progress) }}
        </span>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="showList"
        class="absolute bottom-full left-0 right-0 bg-background/95 backdrop-blur border-t border-border max-h-48"
      >
        <ScrollArea class="h-full max-h-48">
          <button
            v-for="item in bgmList"
            :key="item.id"
            @click="toggleBGM(item)"
            :class="[
              'w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors duration-150',
              currentBgm?.id === item.id
                ? 'text-foreground font-medium bg-muted/50'
                : 'text-muted-foreground',
            ]"
          >
            {{ item.name }}
          </button>
        </ScrollArea>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
