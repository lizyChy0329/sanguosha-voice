<script setup>
import CharacterCard from './CharacterCard.vue'

defineProps({
  characters: Object,
  filter: String,
})

const emit = defineEmits(['playSkill', 'playDie'])
</script>

<template>
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 px-4 pb-24">
    <template v-for="(ch, id) in characters" :key="id">
      <CharacterCard
        v-if="filter === 'all' || ch.group === filter"
        :characterId="id"
        :character="ch"
        @playSkill="(a, b) => emit('playSkill', a, b)"
        @playDie="(id) => emit('playDie', id)"
      />
    </template>
  </div>
</template>
