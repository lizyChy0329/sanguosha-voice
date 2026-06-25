<script setup>
defineProps({
  factions: Array,
  active: String,
})

const emit = defineEmits(['select'])

const labels = { all: '全部', wei: '魏', shu: '蜀', wu: '吴', qun: '群' }
const colors = { wei: 'border-red-500 text-red-400', shu: 'border-green-500 text-green-400', wu: 'border-blue-500 text-blue-400', qun: 'border-purple-500 text-purple-400' }
</script>

<template>
  <div class="flex gap-1 px-4 py-3 overflow-x-auto">
    <button v-for="f in factions" :key="f"
      @click="emit('select', f)"
      :class="[
        'px-4 py-1.5 text-sm rounded-full border transition-all shrink-0',
        f === 'all' ? 'border-slate-500 text-slate-300' : colors[f] || 'border-slate-600 text-slate-400',
        active === f ? 'bg-slate-700/80 font-bold' : 'bg-transparent'
      ]">
      {{ labels[f] || f }}
    </button>
  </div>
</template>
