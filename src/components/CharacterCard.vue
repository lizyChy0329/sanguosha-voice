<script setup>
import { computed } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillButton from "./SkillButton.vue";

const props = defineProps({
  characterId: String,
  character: Object,
});

const emit = defineEmits(["playSkill", "playDie"]);

const CDN_BASE = "https://cdn.jsdelivr.net/gh/libccy/noname@master";

const avatarUrl = computed(() => `${CDN_BASE}/image/character/${props.characterId}.jpg`);

const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23334155%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%2394a3b8%27 font-size=%2720%27%3E%3F%3C/text%3E%3C/svg%3E";

const factionBorder = {
  wei: "border-wei",
  shu: "border-shu",
  wu: "border-wu",
  qun: "border-qun",
};

const factionGlow = {
  wei: "glow-wei",
  shu: "glow-shu",
  wu: "glow-wu",
  qun: "glow-qun",
};

const factionLabel = {
  wei: "魏",
  shu: "蜀",
  wu: "吴",
  qun: "群",
};
</script>

<template>
  <Card :class="['overflow-hidden', factionBorder[character.group] || 'border-border']" size="sm">
    <div :class="['relative', factionGlow[character.group] || '']">
      <img
        :src="avatarUrl"
        :alt="character.name"
        class="w-full aspect-square object-cover bg-muted"
        loading="lazy"
        @error="$event.target.src = fallbackSvg"
      />
      <Badge
        variant="secondary"
        class="absolute top-2 left-2 text-[11px] px-2 py-0.5 pointer-events-none font-bold rounded-md"
      >
        {{ factionLabel[character.group] || character.group }}
      </Badge>
    </div>

    <CardContent class="p-3 flex flex-col gap-2">
      <div class="text-sm font-semibold text-foreground truncate text-center">
        {{ character.name }}
      </div>
      <div class="flex flex-col gap-1.5">
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
          class="btn-press flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-destructive/15 hover:bg-destructive/25 text-destructive transition-all duration-150 ease-out active:scale-95 w-full justify-center"
        >
          <span>阵亡</span>
        </button>
      </div>
    </CardContent>
  </Card>
</template>
