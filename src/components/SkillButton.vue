<script setup>
import { ref } from "vue";
import { useAudio } from "../composables/useAudio";
import { Volume2Icon, BrainIcon, ZapIcon, LockIcon, PlusIcon } from "@lucide/vue";

const props = defineProps({
  skillId: String,
  skillName: String,
  characterId: String,
  faction: String,
  isFirst: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["play"]);

const { playSkill } = useAudio();

const playing = ref(false);
let playTimer = null;

async function handleClick() {
  if (playTimer) {
    clearTimeout(playTimer);
  }
  playTimer = null;

  playing.value = true;
  emit("play", props.skillId, props.characterId);

  const duration = await playSkill(props.skillId, props.characterId);
  const ms = duration > 0 ? duration * 1000 : 2000;

  playTimer = setTimeout(() => {
    playing.value = false;
    playTimer = null;
  }, ms);
}

// Map skill IDs to icons
function getIcon(skillId) {
  const iconMap = {
    fankui: Volume2Icon,
    guicai: BrainIcon,
    fangzhu: ZapIcon,
    juexing: LockIcon,
  };
  return iconMap[skillId] || Volume2Icon;
}
</script>

<template>
  <button
    class="skill-btn"
    :class="[{ active: playing, 'has-accent': isFirst }]"
    @click="handleClick"
  >
    <!-- Skill icon -->
    <component :is="getIcon(skillId)" class="w-3.5 h-3.5 relative z-10" />

    <!-- Skill name -->
    <span class="relative z-10">{{ skillName }}</span>

    <!-- Plus icon for first button (has accent) -->
    <span
      v-if="isFirst && !playing"
      class="absolute -bottom-1 -right-1 size-4 rounded-full bg-[#3D352C] text-white flex items-center justify-center z-30"
    >
      <PlusIcon class="w-2.5 h-2.5" />
    </span>

    <!-- Waveform animation when playing -->
    <div
      v-if="playing"
      class="absolute inset-0 flex items-center justify-center gap-0.5 z-20 pointer-events-none"
    >
      <span class="wave-bar" />
      <span class="wave-bar" />
      <span class="wave-bar" />
      <span class="wave-bar" />
    </div>
  </button>
</template>

<style scoped>
.skill-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #d8d0c8;
  background: #ede7df;
  color: #3d352c;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.skill-btn.has-accent {
  border-left: 3px solid #c8a96e;
  padding-left: 13px;
}

.skill-btn.active {
  background: #c8a96e;
  border-color: #c8a96e;
  color: #ffffff;
}

.skill-btn:hover:not(.active) {
  background: #e4dcd4;
  border-color: #c8c0b8;
}

.skill-btn:active {
  transform: scale(0.95);
}

@keyframes wave {
  0%,
  100% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
}

.wave-bar {
  display: inline-block;
  width: 3px;
  height: 12px;
  background-color: currentColor;
  border-radius: 1px;
  opacity: 0.45;
  animation: wave 0.8s ease-in-out infinite;
  transform-origin: center;
}

.wave-bar:nth-child(2) {
  animation-delay: 0.1s;
}

.wave-bar:nth-child(3) {
  animation-delay: 0.2s;
}

.wave-bar:nth-child(4) {
  animation-delay: 0.3s;
}
</style>
