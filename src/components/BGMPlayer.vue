<script setup>
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import bgmList from "../data/bgm.json";
import { useAudio } from "../composables/useAudio";
import {
  SkipBackIcon,
  SkipForwardIcon,
  PlayIcon,
  PauseIcon,
  ListMusicIcon,
  Volume2Icon,
} from "@lucide/vue";

const { playBGM, setBGMVolume, getBGMVolume } = useAudio();

const currentBgm = ref(null);
const isPlaying = ref(false);
const volume = ref(getBGMVolume() * 100);
const showList = ref(false);

function toggleBGM(item) {
  const result = playBGM(item.id, item.file);
  currentBgm.value = item;
  isPlaying.value = result.playing;
  showList.value = false;
}

function onVolumeChange(values) {
  volume.value = values[0];
  setBGMVolume(values[0] / 100);
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
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border"
  >
    <div class="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        class="text-xs text-muted-foreground shrink-0 max-w-28 truncate gap-1"
        @click="showList = !showList"
      >
        <ListMusicIcon class="size-3.5 shrink-0" />
        {{ currentBgm ? currentBgm.name : "选曲" }}
      </Button>

      <div class="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon-sm" class="btn-press" @click="prevBgm">
          <SkipBackIcon class="size-4" />
        </Button>
        <Button
          size="icon"
          class="size-9 rounded-full btn-press"
          @click="currentBgm && toggleBGM(currentBgm)"
        >
          <PlayIcon v-if="!isPlaying" class="size-4" />
          <PauseIcon v-else class="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" class="btn-press" @click="nextBgm">
          <SkipForwardIcon class="size-4" />
        </Button>
      </div>

      <div class="flex items-center gap-2 flex-1 ml-2">
        <Volume2Icon class="size-4 text-muted-foreground shrink-0" />
        <Slider
          :model-value="[volume]"
          :min="0"
          :max="100"
          :step="5"
          class="flex-1 max-w-28"
          @update:model-value="onVolumeChange"
        />
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
