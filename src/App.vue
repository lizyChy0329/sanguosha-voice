<script setup>
import { provide } from "vue";
import characters from "./data/characters.json";
import { useAudio } from "./composables/useAudio";
import { useProom } from "./composables/useProom";
import { useCache } from "./composables/useCache";

const factions = ["all", "wei", "shu", "wu", "qun"];

const { playSkill, playDie } = useAudio();
const { addCharacter, removeCharacter, saveSession, proom, hasCharacter } = useProom();
const { cacheCharacter } = useCache();

function handlePlaySkill(skillId, characterId) {
  playSkill(skillId, characterId);
}

function handlePlayDie(characterId) {
  playDie(characterId);
}

// Provide shared state and handlers to child pages via inject
provide("characters", characters);
provide("factions", factions);
provide("playSkill", handlePlaySkill);
provide("playDie", handlePlayDie);
provide("addCharacter", addCharacter);
provide("removeCharacter", removeCharacter);
provide("saveSession", saveSession);
provide("hasCharacter", hasCharacter);
provide("cacheCharacter", cacheCharacter);
provide("proom", proom);
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-background">
    <router-view v-slot="{ Component }">
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>
