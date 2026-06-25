<script setup>
import { ref } from 'vue'

const props = defineProps({
  skillId: String,
  skillName: String,
  characterId: String,
})

const emit = defineEmits(['play'])
const showText = ref(false)
let timer = null

function handleClick() {
  emit('play', props.skillId, props.characterId)
  showText.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { showText.value = false }, 1500)
}
</script>

<template>
  <div class="relative">
    <button @click="handleClick"
      class="flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-slate-700/60 hover:bg-slate-600/80 text-slate-200 transition-colors active:scale-95 whitespace-nowrap w-full justify-center">
      <span>🔊</span>
      <span class="truncate">{{ skillName }}</span>
    </button>
    <Transition name="pop">
      <div v-if="showText" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-amber-300 bg-slate-900/90 rounded whitespace-nowrap z-10 pointer-events-none shadow-lg">
        {{ skillName }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.pop-enter-active { transition: all 0.2s ease-out; }
.pop-leave-active { transition: all 0.3s ease-in; }
.pop-enter-from { opacity: 0; transform: translateX(-50%) translateY(4px); }
.pop-leave-to { opacity: 0; transform: translateX(-50%) translateY(-4px); }
</style>
