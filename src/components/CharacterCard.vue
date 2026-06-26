<script setup>
import { ref, computed, onMounted } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import SkillButton from "./SkillButton.vue";
import { CDN_BASE } from "@/constants";
import { useCache } from "../composables/useCache";
import { CheckIcon, DownloadIcon } from "@lucide/vue";

const props = defineProps({
  characterId: String,
  character: Object,
});

const emit = defineEmits(["playSkill", "playDie"]);

const { cacheCharacter, getCharacterCacheStatus, downloading, cacheStatus, refreshOneStatus } =
  useCache();

const avatarUrl = computed(() => `${CDN_BASE}/image/character/${props.characterId}.jpg`);

const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23334155%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%2394a3b8%27 font-size=%2720%27%3E%3F%3C/text%3E%3C/svg%3E";

const factionBorder = {
  wei: "border-wei/50",
  shu: "border-shu/50",
  wu: "border-wu/50",
  qun: "border-qun/50",
};

const factionGlow = {
  wei: "glow-wei",
  shu: "glow-shu",
  wu: "glow-wu",
  qun: "glow-qun",
};

const cached = ref(false);
const progress = ref(0);
const isDownloading = ref(false);

onMounted(async () => {
  const status = await getCharacterCacheStatus(props.characterId);
  cached.value = status.cached;
});

async function handleAvatarClick() {
  if (isDownloading.value || cached.value) return;
  isDownloading.value = true;
  await cacheCharacter(props.characterId);
  progress.value = 100;
  cached.value = true;
  isDownloading.value = false;
}

const strokeColor = computed(() => {
  const map = {
    wei: "hsl(224 85% 55%)",
    shu: "hsl(0 85% 55%)",
    wu: "hsl(145 70% 42%)",
    qun: "hsl(280 80% 60%)",
  };
  return map[props.character.group] || "hsl(224 85% 55%)";
});
</script>

<template>
  <Card
    :class="['overflow-hidden flex flex-row', factionBorder[character.group] || 'border-border']"
  >
    <div class="relative shrink-0 cursor-pointer" @click="handleAvatarClick">
      <img
        :src="avatarUrl"
        :alt="character.name"
        :class="[
          'size-20 sm:size-24 object-cover bg-muted',
          cached ? 'avatar-cached' : 'avatar-uncached',
        ]"
        loading="lazy"
        @error="$event.target.src = fallbackSvg"
      />
      <div v-if="isDownloading" class="avatar-progress-ring">
        <svg viewBox="0 0 36 36" class="size-8">
          <circle cx="18" cy="18" r="15" stroke="rgba(255,255,255,0.2)" />
          <circle
            cx="18"
            cy="18"
            r="15"
            :stroke="strokeColor"
            :stroke-dasharray="94.248"
            :stroke-dashoffset="94.248 - (94.248 * (cacheStatus[characterId]?.progress || 0)) / 100"
          />
        </svg>
      </div>
      <div
        v-else-if="!cached"
        class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/30"
      >
        <DownloadIcon class="size-5 text-white" />
      </div>
    </div>

    <CardContent class="flex-1 min-w-0 p-2.5 sm:p-3 flex flex-col justify-between gap-1">
      <div class="flex items-center gap-1.5 min-w-0">
        <span class="text-sm font-semibold text-foreground truncate">{{ character.name }}</span>
        <CheckIcon v-if="cached" class="size-3.5 text-green-500 shrink-0" />
      </div>
      <div class="flex flex-wrap items-center gap-1">
        <SkillButton
          v-for="[skillId, skillName] in character.skills"
          :key="skillId"
          :skillId="skillId"
          :skillName="skillName"
          :characterId="characterId"
          :faction="character.group"
          @play="emit('playSkill', $event, characterId)"
        />
        <button
          @click="emit('playDie', characterId)"
          class="btn-press inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-md bg-destructive/15 hover:bg-destructive/25 text-destructive/80 hover:text-destructive transition-all duration-150 ease-out active:scale-95 shrink-0"
        >
          阵亡
        </button>
      </div>
    </CardContent>
  </Card>
</template>
