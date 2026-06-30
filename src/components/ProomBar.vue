<script setup>
import { computed } from "vue";
import { useProom } from "../composables/useProom";
import { Button } from "@/components/ui/button";
import { SaveIcon, ChevronLeftIcon, UsersIcon, XIcon, ClockIcon } from "@lucide/vue";
import characters from "../data/characters.json";

const props = defineProps({
  mode: String,
});

const emit = defineEmits(["toggleMode", "save", "openHistory"]);

const { proom, removeCharacter } = useProom();

const label = computed(() => `面杀池 (${proom.value.length}/8)`);

const proomCharacters = computed(() =>
  proom.value.map((id) => ({ id, data: characters[id] })).filter((c) => c.data),
);

const factionColor = {
  wei: "bg-wei",
  shu: "bg-shu",
  wu: "bg-wu",
  qun: "bg-qun",
};
</script>

<template>
  <div class="px-4 pb-2">
    <div class="flex items-center justify-between mb-2">
      <button
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
        :class="
          mode === 'proom'
            ? 'bg-gold/15 text-gold border border-gold/30'
            : 'text-muted-foreground hover:text-foreground'
        "
        @click="$emit('toggleMode')"
      >
        <UsersIcon class="size-3.5" />
        {{ label }}
      </button>

      <div class="flex items-center gap-1" v-if="mode === 'proom'">
        <Button variant="ghost" size="icon-xs" class="size-7" @click="$emit('openHistory')">
          <ClockIcon class="size-3.5" />
        </Button>
        <Button variant="ghost" size="sm" class="gap-1 text-xs" @click="$emit('save')">
          <SaveIcon class="size-3.5" />
          保存
        </Button>
        <Button variant="ghost" size="icon-xs" class="size-7" @click="$emit('toggleMode')">
          <ChevronLeftIcon class="size-4" />
        </Button>
      </div>
    </div>

    <div
      v-if="mode === 'proom' && proomCharacters.length > 0"
      class="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
    >
      <div
        v-for="ch in proomCharacters"
        :key="ch.id"
        class="flex items-center gap-2 shrink-0 rounded-lg border border-gold/20 bg-card px-2.5 py-1.5"
      >
        <div class="size-6 rounded-full overflow-hidden shrink-0 ring-1 ring-gold/30">
          <div class="size-full rounded-full" :class="factionColor[ch.data.group] || 'bg-muted'" />
        </div>
        <span class="text-xs font-heading font-bold text-foreground/90 truncate max-w-12">
          {{ ch.data.name }}
        </span>
        <button
          class="size-4 rounded-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
          @click="removeCharacter(ch.id)"
        >
          <XIcon class="size-3" />
        </button>
      </div>
    </div>
  </div>
</template>
