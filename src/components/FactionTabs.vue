<script setup>
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps({
  factions: Array,
  active: String,
});

const emit = defineEmits(["select"]);

const labels = { all: "全部", wei: "魏", shu: "蜀", wu: "吴", qun: "群" };
</script>

<template>
  <div class="px-4 pb-3">
    <Tabs :default-value="active" @update:model-value="(v) => emit('select', v)">
      <TabsList class="w-full justify-start gap-1 bg-transparent p-0 h-auto">
        <TabsTrigger
          v-for="f in factions"
          :key="f"
          :value="f"
          :data-faction="f === 'all' ? null : f"
          class="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:rounded-full after:transition-all after:duration-200 data-active:after:w-4/5"
        >
          {{ labels[f] || f }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>

<style scoped>
[data-state="active"] {
  color: hsl(var(--gold));
}
[data-state="active"]::after {
  background-color: hsl(var(--gold));
}
[data-faction="wei"][data-state="active"] {
  color: hsl(var(--wei));
}
[data-faction="wei"][data-state="active"]::after {
  background-color: hsl(var(--wei));
}
[data-faction="shu"][data-state="active"] {
  color: hsl(var(--shu));
}
[data-faction="shu"][data-state="active"]::after {
  background-color: hsl(var(--shu));
}
[data-faction="wu"][data-state="active"] {
  color: hsl(var(--wu));
}
[data-faction="wu"][data-state="active"]::after {
  background-color: hsl(var(--wu));
}
[data-faction="qun"][data-state="active"] {
  color: hsl(var(--qun));
}
[data-faction="qun"][data-state="active"]::after {
  background-color: hsl(var(--qun));
}
</style>
