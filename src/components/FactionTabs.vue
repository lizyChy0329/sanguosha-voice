<script setup>
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps({
  factions: Array,
  active: String,
});

const emit = defineEmits(["select"]);

const labels = { all: "全部", wei: "魏", shu: "蜀", wu: "吴", qun: "群" };
const factionColors = { wei: "text-wei", shu: "text-shu", wu: "text-wu", qun: "text-qun" };
</script>

<template>
  <div class="px-4 pb-3">
    <Tabs :default-value="active" @update:model-value="(v) => emit('select', v)">
      <TabsList class="w-full justify-start gap-1 bg-transparent p-0 h-auto">
        <TabsTrigger
          v-for="f in factions"
          :key="f"
          :value="f"
          :class="[
            'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150',
            f === 'all'
              ? 'data-active:bg-muted data-active:text-foreground text-muted-foreground'
              : `${factionColors[f] || 'text-muted-foreground'} data-active:bg-muted/50`,
            'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:rounded-full after:transition-all after:duration-200',
            f !== 'all' ? 'data-active:after:w-4/5' : 'data-active:after:w-0',
            f !== 'all' ? `data-active:after:bg-current` : '',
          ]"
        >
          {{ labels[f] || f }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
