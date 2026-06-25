<script setup>
import { ref, computed } from 'vue'
import bgmList from '../data/bgm.json'
import { useAudio } from '../composables/useAudio'

const { playBGM, setBGMVolume, getBGMVolume } = useAudio()

const currentBgm = ref(null)
const isPlaying = ref(false)
const volume = ref(getBGMVolume())
const showList = ref(false)

function toggleBGM(item) {
  const result = playBGM(item.id, item.file)
  currentBgm.value = item
  isPlaying.value = result.playing
  showList.value = false
}

function onVolumeChange(e) {
  volume.value = parseFloat(e.target.value)
  setBGMVolume(volume.value)
}

const currentIndex = computed(() => {
  if (!currentBgm.value) return -1
  return bgmList.findIndex(b => b.id === currentBgm.value.id)
})

function nextBgm() {
  if (currentIndex.value < bgmList.length - 1) {
    toggleBGM(bgmList[currentIndex.value + 1])
  } else {
    toggleBGM(bgmList[0])
  }
}

function prevBgm() {
  if (currentIndex.value > 0) {
    toggleBGM(bgmList[currentIndex.value - 1])
  } else {
    toggleBGM(bgmList[bgmList.length - 1])
  }
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-t border-slate-700">
    <div class="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
      <button @click="showList = !showList" class="text-xs text-slate-400 shrink-0">
        {{ currentBgm ? currentBgm.name : '选曲' }}
      </button>

      <div class="flex items-center gap-2 shrink-0">
        <button @click="prevBgm" class="text-slate-300 hover:text-white text-lg leading-none">⏮</button>
        <button @click="currentBgm && toggleBGM(currentBgm)" class="text-white text-xl leading-none w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button @click="nextBgm" class="text-slate-300 hover:text-white text-lg leading-none">⏭</button>
      </div>

      <div class="flex items-center gap-2 flex-1 ml-2">
        <span class="text-xs text-slate-400">🔊</span>
        <input type="range" min="0" max="1" step="0.05" :value="volume" @input="onVolumeChange"
          class="w-20 h-1 accent-amber-500 cursor-pointer" />
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showList" class="absolute bottom-full left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700 max-h-48 overflow-y-auto">
        <button v-for="item in bgmList" :key="item.id"
          @click="toggleBGM(item)"
          :class="['w-full text-left px-4 py-2 text-sm hover:bg-slate-800', currentBgm?.id === item.id ? 'text-amber-400 bg-slate-800/50' : 'text-slate-300']">
          {{ item.name }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
input[type=range] { -webkit-appearance: none; appearance: none; background: #334155; border-radius: 2px; outline: none; }
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; cursor: pointer; }
</style>
