<script setup>
import { computed } from 'vue'
import SkillButton from './SkillButton.vue'

const props = defineProps({
  characterId: String,
  character: Object,
})

const emit = defineEmits(['playSkill', 'playDie', 'cache'])

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/libccy/noname@master'

const avatarUrl = computed(() =>
  `${CDN_BASE}/image/character/${props.characterId}.jpg`
)

const factionColors = {
  wei: 'border-red-700 bg-red-950/30',
  shu: 'border-green-700 bg-green-950/30',
  wu: 'border-blue-700 bg-blue-950/30',
  qun: 'border-purple-700 bg-purple-950/30',
}

const factionBadge = {
  wei: '魏', shu: '蜀', wu: '吴', qun: '群',
}
</script>

<template>
  <div :class="['rounded-lg border overflow-hidden flex flex-col', factionColors[character.group] || 'border-slate-700 bg-slate-800/50']">
    <div class="relative">
      <img :src="avatarUrl" :alt="character.name"
        class="w-full aspect-square object-cover bg-slate-800"
        loading="lazy"
        @error="$event.target.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23334155%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%2394a3b8%22 font-size=%2220%22>?</text></svg>'"
      />
      <span class="absolute top-1 left-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white">
        {{ factionBadge[character.group] || character.group }}
      </span>
    </div>

    <div class="p-2 flex flex-col gap-1.5 flex-1">
      <div class="text-xs font-bold text-white truncate text-center">{{ character.name }}</div>
      <div class="flex flex-col gap-1">
        <SkillButton
          v-for="[skillId, skillName] in character.skills"
          :key="skillId"
          :skillId="skillId"
          :skillName="skillName"
          :characterId="characterId"
          @play="emit('playSkill', $event, characterId)"
        />
        <button @click="emit('playDie', characterId)"
          class="flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-red-900/40 hover:bg-red-800/60 text-red-300 transition-colors active:scale-95 w-full justify-center">
          <span>💀</span>
          <span>阵亡</span>
        </button>
      </div>
    </div>
  </div>
</template>
