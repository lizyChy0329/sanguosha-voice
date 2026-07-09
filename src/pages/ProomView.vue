<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProom } from "../composables/useProom";
import { useAudio } from "../composables/useAudio";
import { useCache } from "../composables/useCache";
import characters from "../data/characters.json";
import CharacterPlayCard from "../components/CharacterPlayCard.vue";
import SkillPanel from "../components/SkillPanel.vue";
import BGMPlayer from "../components/BGMPlayer.vue";
import { MenuIcon, SettingsIcon } from "@lucide/vue";

const router = useRouter();
const { proom, removeCharacter } = useProom();

// Demo characters matching the reference image
if (proom.value.length === 0) {
  proom.value = [
    "simayi",
    "xiahoudun",
    "zhangliao",
    "xuzhu",
    "zhaoyun",
    "guanyu",
    "liubei",
    "sunquan",
  ];
}

const { playSkill, playDie } = useAudio();
const { cacheCharacter } = useCache();

// Default to first character selected
const currentSelectedId = ref("simayi");

const selectedCharacter = computed(() => {
  if (!currentSelectedId.value) return null;
  return characters[currentSelectedId.value] || null;
});

function handleSelectCharacter(characterId) {
  if (currentSelectedId.value === characterId) {
    currentSelectedId.value = null;
  } else {
    currentSelectedId.value = characterId;
  }
}

function handleLongpress(characterId) {
  playDie(characterId);
}

function handlePlaySkill(skillId, characterId) {
  playSkill(skillId, characterId);
}

function handleSkillPanelClosed() {
  currentSelectedId.value = null;
}

function handleOpenMenu() {
  // Menu action - placeholder for hamburger menu
}

function handleOpenSettings() {
  // Settings action - placeholder for gear icon
}
</script>

<style scoped>
.app-header {
  background: var(--color-bg-page);
}

.app-title {
  color: var(--color-text-primary);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.app-subtitle {
  color: var(--color-text-muted);
  font-size: 12px;
  letter-spacing: 0.05em;
}

.hint-text {
  color: var(--color-text-muted);
  font-size: 13px;
}
</style>

<template>
  <div class="flex flex-col min-h-dvh bg-[#F7F2EC]">
    <!-- Header: fixed height -->
    <header class="app-header shrink-0 px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Left: hamburger + title -->
        <div class="flex items-center gap-3">
          <button
            @click="handleOpenMenu"
            class="inline-flex items-center justify-center size-8 rounded-lg hover:bg-black/5 transition-colors"
          >
            <MenuIcon class="size-5 text-[#3D352C]" />
          </button>
          <div class="flex flex-col">
            <h1 class="app-title font-bold leading-tight">三国杀语音助手</h1>
            <span class="app-subtitle">智能语音 · 武将台词 · 战场辅助</span>
          </div>
        </div>
        <!-- Right: count + gear settings -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-[#3D352C]">已选 {{ proom.length }}/8</span>
          <button
            @click="handleOpenSettings"
            class="inline-flex items-center justify-center size-8 rounded-lg hover:bg-black/5 transition-colors"
          >
            <SettingsIcon class="size-5 text-[#3D352C]" />
          </button>
        </div>
      </div>
    </header>

    <!-- Content: scrollable -->
    <main class="flex-1 flex flex-col overflow-y-auto pb-4">
      <!-- Character grid: 4x2 -->
      <div v-if="proom.length > 0" class="grid grid-cols-4 gap-2.5 px-4">
        <CharacterPlayCard
          v-for="id in proom"
          :key="id"
          :characterId="id"
          :character="characters[id]"
          :selected="currentSelectedId === id"
          class="animate-card-enter"
          :style="{ '--i': proom.indexOf(id) }"
          @select="handleSelectCharacter"
          @longpress="handleLongpress"
        />
      </div>

      <!-- Hint text -->
      <p v-if="proom.length > 0" class="hint-text text-center mt-3 mb-2">点击头像可更换武将</p>

      <!-- SkillPanel: always visible for selected character -->
      <div class="px-4 mt-2">
        <SkillPanel
          :characterId="currentSelectedId"
          :character="selectedCharacter"
          :visible="currentSelectedId !== null"
          @playSkill="handlePlaySkill"
          @closed="handleSkillPanelClosed"
        />
      </div>
    </main>

    <!-- Footer: BGM Player -->
    <footer class="shrink-0">
      <BGMPlayer />
    </footer>
  </div>
</template>
