<script setup>
import { ref } from "vue";
import characters from "./data/characters.json";
import FactionTabs from "./components/FactionTabs.vue";
import CharacterGrid from "./components/CharacterGrid.vue";
import ProomBar from "./components/ProomBar.vue";
import BGMPlayer from "./components/BGMPlayer.vue";
import CacheManager from "./components/CacheManager.vue";
import HistoryPanel from "./components/HistoryPanel.vue";
import { useAudio } from "./composables/useAudio";
import { useProom } from "./composables/useProom";
import { useCache } from "./composables/useCache";
import { UsersIcon } from "@lucide/vue";

const { playSkill, playDie } = useAudio();
const { addCharacter, removeCharacter, saveSession, proom, hasCharacter } = useProom();
const { cacheCharacter } = useCache();

const activeFaction = ref("all");
const mode = ref("browse");
const showHistory = ref(false);

const factions = ["all", "wei", "shu", "wu", "qun"];

function handlePlaySkill(skillId, characterId) {
  playSkill(skillId, characterId);
}

function handlePlayDie(characterId) {
  playDie(characterId);
}

function handleSelectCharacter(characterId) {
  if (hasCharacter(characterId)) {
    removeCharacter(characterId);
  } else {
    addCharacter(characterId);
    cacheCharacter(characterId);
  }
}

function handleRemoveCharacter(characterId) {
  removeCharacter(characterId);
  if (proom.value.length === 0) {
    mode.value = "browse";
  }
}

function handleToggleMode() {
  if (mode.value === "browse" && proom.value.length > 0) {
    mode.value = "proom";
  } else {
    mode.value = "browse";
  }
}

function handleSave() {
  saveSession();
}
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-background">
    <header class="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div class="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto w-full">
        <div class="flex items-center gap-3">
          <h1 class="text-base font-bold font-heading tracking-wider text-foreground">
            三国杀音效
          </h1>
          <button
            v-if="mode === 'browse' && proom.length > 0"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            @click="handleToggleMode"
          >
            <UsersIcon class="size-3" />
            {{ proom.length }}/8
          </button>
        </div>
        <CacheManager />
      </div>

      <div v-if="mode === 'browse'">
        <FactionTabs
          :factions="factions"
          :active="activeFaction"
          @select="activeFaction = $event"
        />
      </div>

      <div v-else>
        <ProomBar
          :mode="mode"
          @toggleMode="handleToggleMode"
          @save="handleSave"
          @openHistory="showHistory = true"
        />
      </div>
    </header>

    <main class="flex-1">
      <CharacterGrid
        :characters="characters"
        :filter="activeFaction"
        :mode="mode"
        @playSkill="handlePlaySkill"
        @playDie="handlePlayDie"
        @selectCharacter="handleSelectCharacter"
        @removeCharacter="handleRemoveCharacter"
      />
    </main>

    <BGMPlayer />

    <HistoryPanel :open="showHistory" @update:open="(v) => (showHistory = v)" />
  </div>
</template>
