<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProom } from "../composables/useProom";
import { useCache } from "../composables/useCache";
import characters from "../data/characters.json";
import { CDN_BASE } from "../constants";
import { ChevronLeftIcon, SearchIcon, FilterIcon, CheckIcon } from "@lucide/vue";

const router = useRouter();
const { proom, addCharacter, removeCharacter, hasCharacter } = useProom();
const { cacheCharacter } = useCache();

const activeTab = ref("all");
const searchQuery = ref("");
const selectedIds = ref([...proom.value]); // Initialize from proom

const tabs = [
  { key: "all", label: "全部" },
  { key: "wei", label: "魏" },
  { key: "shu", label: "蜀" },
  { key: "wu", label: "吴" },
  { key: "qun", label: "群" },
];

const filteredCharacters = computed(() => {
  return Object.entries(characters).filter(([id, ch]) => {
    const matchesTab = activeTab.value === "all" || ch.group === activeTab.value;
    const matchesSearch = !searchQuery.value || ch.name.includes(searchQuery.value);
    return matchesTab && matchesSearch;
  });
});

function avatarUrl(id) {
  return `${CDN_BASE}/image/character/${id}.jpg`;
}

function isSelected(id) {
  return selectedIds.value.includes(id);
}

function toggleSelect(id) {
  if (isSelected(id)) {
    selectedIds.value = selectedIds.value.filter((x) => x !== id);
  } else if (selectedIds.value.length < 8) {
    selectedIds.value.push(id);
  }
}
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-bg-page">
    <!-- Nav bar: dark background -->
    <header class="bg-bg-deep-nav text-gold px-4 py-3">
      <div class="flex items-center justify-between max-w-3xl mx-auto">
        <div class="flex items-center gap-3">
          <button
            @click="router.back()"
            class="inline-flex items-center justify-center size-8 rounded-button hover:bg-white/10 transition-colors"
          >
            <ChevronLeftIcon class="size-5" />
          </button>
          <h1 class="text-title font-bold">选择武将</h1>
        </div>
        <button
          class="inline-flex items-center justify-center size-8 rounded-button hover:bg-white/10 transition-colors"
        >
          <FilterIcon class="size-5" />
        </button>
      </div>
    </header>

    <!-- Faction tabs -->
    <div class="flex gap-2 px-4 py-3 bg-bg-dark">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-3 py-1.5 text-body font-medium transition-colors border-b-2',
          activeTab === tab.key
            ? 'text-gold border-gold'
            : 'text-text-secondary border-transparent',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Search bar -->
    <div class="px-4 py-2 bg-bg-dark">
      <div class="flex items-center gap-2 px-3 py-2 rounded-button bg-bg-search">
        <SearchIcon class="size-4 text-text-muted" />
        <input
          v-model="searchQuery"
          placeholder="搜索武将名字"
          class="flex-1 bg-transparent outline-none text-body text-text-white placeholder:text-text-muted"
        />
      </div>
    </div>

    <!-- Character grid: 4 columns -->
    <main class="flex-1 overflow-y-auto px-4 py-2">
      <div class="grid grid-cols-4 gap-[10px]">
        <div
          v-for="[id, ch] in filteredCharacters"
          :key="id"
          class="relative aspect-square rounded-lg border-2 border-gold/50 overflow-hidden cursor-pointer hover:border-gold transition-colors"
          @click="toggleSelect(id)"
        >
          <img :src="avatarUrl(id)" :alt="ch.name" class="size-full object-cover" />
          <div
            class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-1.5 pt-4"
          >
            <span class="text-xs font-semibold text-white truncate block">{{ ch.name }}</span>
          </div>
          <!-- Selection overlay -->
          <div
            v-if="isSelected(id)"
            class="absolute top-1.5 right-1.5 size-6 rounded-full flex items-center justify-center"
            style="background-color: #d4a843"
          >
            <CheckIcon class="size-4 text-white" />
          </div>
          <div
            v-else
            class="absolute top-1.5 right-1.5 size-6 rounded-full border-2 border-white/30"
            style="background-color: rgba(0, 0, 0, 0.2)"
          ></div>
        </div>
      </div>
    </main>

    <!-- Bottom bar -->
    <footer class="shrink-0 bg-bg-dark px-4 py-3">
      <div class="flex items-center justify-between">
        <span class="text-body text-text-secondary">已选择 {{ selectedIds.length }}/8</span>
        <button
          @click="router.back()"
          class="px-6 py-2 rounded-button text-white font-medium text-body"
          style="background-color: #d4a843"
        >
          确定
        </button>
      </div>
      <p class="text-xs text-text-muted mt-2 text-center">长按可查看技能</p>
    </footer>
  </div>
</template>
