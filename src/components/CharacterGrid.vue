<script setup>
import CharacterCard from "./CharacterCard.vue";
import ProomCard from "./ProomCard.vue";
import { computed } from "vue";
import { useProom } from "../composables/useProom";
import { VueDraggable } from "vue-draggable-plus";
import { UsersIcon } from "@lucide/vue";

const props = defineProps({
  characters: Object,
  filter: String,
  mode: String,
});

const emit = defineEmits(["playSkill", "playDie", "selectCharacter", "removeCharacter"]);

const { proom, saveProom } = useProom();

const filteredCharacters = computed(() => {
  return Object.entries(props.characters).filter(
    ([, ch]) => props.filter === "all" || ch.group === props.filter,
  );
});

const proomCharacterIds = computed(() => proom.value);
</script>

<template>
  <div v-if="mode === 'browse'" class="grid grid-cols-5 gap-2 px-4 pt-2 pb-28">
    <CharacterCard
      v-for="([id, ch], idx) in filteredCharacters"
      :key="id"
      :characterId="id"
      :character="ch"
      :style="{ '--i': idx }"
      class="animate-card-enter"
      @select="emit('selectCharacter', $event)"
    />
  </div>

  <div v-else class="pb-36">
    <div
      v-if="proom.length === 0"
      class="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <UsersIcon class="size-16 text-muted-foreground/20 mb-4" />
      <p class="text-sm text-muted-foreground mb-1">面杀池为空</p>
      <p class="text-xs text-muted-foreground/60">在浏览模式中点击武将头像加入面杀池</p>
    </div>

    <VueDraggable
      v-else
      v-model="proom.value"
      @end="saveProom"
      tag="div"
      class="grid grid-cols-2 gap-2.5 px-4"
      item-key="id"
    >
      <ProomCard
        v-for="id in proomCharacterIds"
        :key="id"
        :characterId="id"
        :character="characters[id]"
        @playSkill="(a, b) => emit('playSkill', a, b)"
        @playDie="(id) => emit('playDie', id)"
        @remove="emit('removeCharacter', $event)"
      />
    </VueDraggable>
  </div>
</template>
