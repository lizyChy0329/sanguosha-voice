<script setup>
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps({
  factions: Array,
  active: String,
});

const emit = defineEmits(["select"]);

const labels = { all: "全部", wei: "魏", shu: "蜀", wu: "吴", qun: "群" };
const factionColors = {
  all: "text-gold",
  wei: "text-wei",
  shu: "text-shu",
  wu: "text-wu",
  qun: "text-qun",
};
const factionUnderline = {
  all: "after:bg-gold",
  wei: "after:bg-wei",
  shu: "after:bg-shu",
  wu: "after:bg-wu",
  qun: "after:bg-qun",
};
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
            'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground',
            'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:rounded-full after:transition-all after:duration-200',
            `data-active:${factionColors[f] || 'text-gold'} data-active:${factionUnderline[f] || 'after:bg-gold'}`,
            'data-active:after:w-4/5',
          ]"
        >
          {{ labels[f] || f }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
