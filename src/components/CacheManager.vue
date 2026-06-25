<script setup>
import { ref, onMounted } from 'vue'
import { useCache } from '../composables/useCache'
import characters from '../data/characters.json'

const { getCacheSize, cacheCharacter, deleteCharacterCache, clearAllCache, refreshAllStatus, downloading } = useCache()

const showPanel = ref(false)
const cacheInfo = ref({ count: 0, bytes: 0 })
const statusMap = ref({})

onMounted(async () => {
  cacheInfo.value = await getCacheSize()
  statusMap.value = await refreshAllStatus()
})

async function refresh() {
  cacheInfo.value = await getCacheSize()
  statusMap.value = await refreshAllStatus()
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<template>
  <button @click="showPanel = !showPanel" class="text-sm text-slate-300 hover:text-white">
    📦 {{ formatBytes(cacheInfo.bytes) }}
  </button>

  <Transition name="slide">
    <div v-if="showPanel" class="fixed inset-0 z-50 flex justify-end">
      <div class="absolute inset-0 bg-black/50" @click="showPanel = false" />
      <div class="relative w-80 max-w-[85vw] bg-slate-900 h-full overflow-y-auto p-4 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">缓存管理</h2>
          <div class="flex gap-2">
            <button @click="refresh" class="text-xs text-slate-400 hover:text-white">🔄</button>
            <button @click="showPanel = false" class="text-slate-400 hover:text-white text-lg leading-none">✕</button>
          </div>
        </div>

        <div class="bg-slate-800 rounded-lg p-3 mb-4 text-sm text-slate-300">
          <div>已缓存: {{ cacheInfo.count }} 文件</div>
          <div>总大小: {{ formatBytes(cacheInfo.bytes) }}</div>
        </div>

        <div class="mb-4">
          <button @click="clearAllCache().then(refresh)"
            class="w-full py-2 text-sm text-red-300 bg-red-900/30 hover:bg-red-800/50 rounded-lg transition-colors">
            🗑️ 清空全部缓存
          </button>
        </div>

        <div class="space-y-2">
          <div v-for="(ch, id) in characters" :key="id"
            class="flex items-center justify-between bg-slate-800/50 rounded px-3 py-2 text-sm">
            <span class="text-slate-200 truncate">{{ ch.name }}</span>
            <div class="flex items-center gap-2 shrink-0">
              <span v-if="downloading.has(id)" class="text-xs text-amber-400 animate-pulse">下载中...</span>
              <span v-else-if="statusMap[id]?.cached" class="text-xs text-green-400">✓</span>
              <span v-else class="text-xs text-slate-500">○</span>
              <button v-if="statusMap[id]?.cached"
                @click="deleteCharacterCache(id).then(refresh)"
                class="text-xs text-red-400 hover:text-red-300">删除</button>
              <button v-else-if="!downloading.has(id)"
                @click="cacheCharacter(id).then(refresh)"
                class="text-xs text-amber-400 hover:text-amber-300">缓存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
