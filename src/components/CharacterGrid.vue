<script setup>
import CharacterCard from "./CharacterCard.vue";
import { computed } from "vue";

const props = defineProps({
  characters: Object,
  filter: String,
});

const emit = defineEmits(["playSkill", "playDie"]);

const filteredCharacters = computed(() => {
  return Object.entries(props.characters).filter(
    ([, ch]) => props.filter === "all" || ch.group === props.filter,
  );
});
</script>

<template>
  <div class="grid grid-cols-2 gap-2.5 px-4 pb-28">
    <TransitionGroup name="card">
      <CharacterCard
        v-for="[id, ch] in filteredCharacters"
        :key="id"
        :characterId="id"
        :character="ch"
        @playSkill="(a, b) => emit('playSkill', a, b)"
        @playDie="(id) => emit('playDie', id)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition: all 0.25s ease-out;
}
.card-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.card-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.card-move {
  transition: transform 0.3s ease-out;
}
</style>
