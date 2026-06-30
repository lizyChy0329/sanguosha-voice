<script setup>
import { ref, computed } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import SkillButton from "./SkillButton.vue";
import { CDN_BASE } from "@/constants";
import { XIcon, GripVerticalIcon } from "@lucide/vue";

const props = defineProps({
  characterId: String,
  character: Object,
});

const emit = defineEmits(["playSkill", "playDie", "remove"]);

const avatarUrl = computed(() => `${CDN_BASE}/image/character/${props.characterId}.jpg`);

const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23334155%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%2394a3b8%27 font-size=%2720%27%3E%3F%3C/text%3E%3C/svg%3E";

const factionBorder = {
  wei: "border-wei/50",
  shu: "border-shu/50",
  wu: "border-wu/50",
  qun: "border-qun/50",
};

const diePlaying = ref(false);

function handlePlayDie() {
  diePlaying.value = true;
  setTimeout(() => {
    diePlaying.value = false;
  }, 800);
  emit("playDie", props.characterId);
}
</script>

<template>
  <Card
    :class="['overflow-hidden flex flex-row', factionBorder[character.group] || 'border-border']"
  >
    <div
      class="flex items-center justify-center px-1 cursor-grab active:cursor-grabbing touch-none text-muted-foreground/40 hover:text-muted-foreground transition-colors"
    >
      <GripVerticalIcon class="size-4" />
    </div>

    <div class="relative shrink-0">
      <img
        :src="avatarUrl"
        :alt="character.name"
        class="size-16 sm:size-20 object-cover bg-muted"
        loading="lazy"
        @error="$event.target.src = fallbackSvg"
      />
    </div>

    <CardContent class="flex-1 min-w-0 p-2.5 sm:p-3 flex flex-col justify-between gap-1">
      <div class="flex items-center justify-between min-w-0">
        <div class="flex items-center gap-1.5 min-w-0">
          <span class="text-sm font-semibold text-foreground truncate">{{ character.name }}</span>
          <span class="text-[10px] text-muted-foreground shrink-0">{{
            character.groupLabel || ""
          }}</span>
        </div>
        <button
          class="shrink-0 size-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          @click="emit('remove', characterId)"
        >
          <XIcon class="size-3.5" />
        </button>
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
          @click="handlePlayDie"
          class="btn-press inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-md transition-all duration-150 ease-out active:scale-95 shrink-0"
          :class="
            diePlaying
              ? 'bg-destructive/40 text-destructive border border-destructive/40'
              : 'bg-destructive/15 hover:bg-destructive/25 text-destructive/80 hover:text-destructive border border-transparent'
          "
        >
          阵亡
        </button>
      </div>
    </CardContent>
  </Card>
</template>
