<script setup>
import { ref, computed } from 'vue'
import characters from './data/characters.json'
import FactionTabs from './components/FactionTabs.vue'
import CharacterGrid from './components/CharacterGrid.vue'
import BGMPlayer from './components/BGMPlayer.vue'
import CacheManager from './components/CacheManager.vue'
import { useAudio } from './composables/useAudio'

const { playSkill, playDie } = useAudio()

const activeFaction = ref('all')

const factions = ['all', 'wei', 'shu', 'wu', 'qun']

function handlePlaySkill(skillId, characterId) {
  playSkill(skillId, characterId)
}

function handlePlayDie(characterId) {
  playDie(characterId)
}

const characterCount = computed(() => {
  if (activeFaction.value === 'all') return Object.keys(characters).length
  return Object.values(characters).filter(c => c.group === activeFaction.value).length
})
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-slate-900">
    <header class="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700">
      <div class="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto w-full">
        <div class="flex items-center gap-2">
          <h1 class="text-base font-bold text-amber-400">🎴 三国杀音效</h1>
          <span class="text-xs text-slate-500">{{ characterCount }} 武将</span>
        </div>
        <div class="flex items-center gap-3">
          <CacheManager />
        </div>
      </div>
      <FactionTabs :factions="factions" :active="activeFaction" @select="activeFaction = $event" />
    </header>

    <main class="flex-1 pt-2">
      <CharacterGrid
        :characters="characters"
        :filter="activeFaction"
        @playSkill="handlePlaySkill"
        @playDie="handlePlayDie"
      />
    </main>

    <BGMPlayer />
  </div>
</template>
