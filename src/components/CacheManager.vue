<script setup>
import { ref, computed, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCache } from "../composables/useCache";
import { CDN_BASE } from "@/constants";
import characters from "../data/characters.json";
import {
  HardDriveIcon,
  DownloadIcon,
  Trash2Icon,
  RefreshCwIcon,
  CheckIcon,
  XIcon,
} from "@lucide/vue";

const {
  getCacheSize,
  cacheCharacter,
  deleteCharacterCache,
  clearAllCache,
  refreshAllStatus,
  downloading,
  cacheStatus,
} = useCache();

const loading = ref(true);
const cacheInfo = ref({ count: 0, bytes: 0 });
const statusMap = ref({});
const clearDialogOpen = ref(false);
const downloadQueue = ref(new Set());
const activeFaction = ref("wei");

const factionOrder = ["wei", "shu", "wu", "qun"];
const factionLabels = { wei: "魏", shu: "蜀", wu: "吴", qun: "群" };
const factionAccent = { wei: "bg-wei", shu: "bg-shu", wu: "bg-wu", qun: "bg-qun" };
const factionText = { wei: "text-wei", shu: "text-shu", wu: "text-wu", qun: "text-qun" };
const factionGlow = { wei: "glow-wei", shu: "glow-shu", wu: "glow-wu", qun: "glow-qun" };

const totalCharacters = computed(() => Object.keys(characters).length);
const cachedCount = computed(() => Object.values(statusMap.value).filter((s) => s?.cached).length);

onMounted(async () => {
  cacheInfo.value = await getCacheSize();
  statusMap.value = await refreshAllStatus();
  loading.value = false;
});

async function refresh() {
  loading.value = true;
  cacheInfo.value = await getCacheSize();
  statusMap.value = await refreshAllStatus();
  loading.value = false;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const charactersByFaction = computed(() => {
  const groups = {};
  for (const f of factionOrder) {
    groups[f] = [];
  }
  for (const [id, ch] of Object.entries(characters)) {
    if (groups[ch.group]) {
      groups[ch.group].push({ id, ...ch });
    }
  }
  return groups;
});

const factionCacheStats = computed(() => {
  const stats = {};
  for (const f of factionOrder) {
    const chars = charactersByFaction.value[f] || [];
    let cached = 0;
    for (const ch of chars) {
      if (statusMap.value[ch.id]?.cached) cached++;
    }
    stats[f] = { cached, total: chars.length };
  }
  return stats;
});

async function cacheFaction(faction) {
  const chars = charactersByFaction.value[faction] || [];
  for (const ch of chars) {
    if (!statusMap.value[ch.id]?.cached && !downloading.value.has(ch.id)) {
      downloadQueue.value.add(ch.id);
      await cacheCharacter(ch.id);
      downloadQueue.value.delete(ch.id);
    }
  }
  await refresh();
}

async function clearFactionCache(faction) {
  const chars = charactersByFaction.value[faction] || [];
  for (const ch of chars) {
    if (statusMap.value[ch.id]?.cached) {
      await deleteCharacterCache(ch.id);
    }
  }
  await refresh();
}

async function handleClearAll() {
  await clearAllCache();
  clearDialogOpen.value = false;
  await refresh();
}

async function cacheOne(id) {
  downloadQueue.value.add(id);
  await cacheCharacter(id);
  downloadQueue.value.delete(id);
  await refresh();
}

function isDownloading(id) {
  return downloading.value.has(id) || downloadQueue.value.has(id);
}
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="sm" class="gap-1.5 text-xs">
        <HardDriveIcon class="size-3.5" />
        {{ formatBytes(cacheInfo.bytes) }}
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="w-80 max-w-[85vw] p-0">
      <SheetHeader class="px-4 pt-4 pb-2">
        <SheetTitle>缓存管理</SheetTitle>
      </SheetHeader>

      <div v-if="loading" class="px-4 space-y-3">
        <div class="h-16 bg-muted rounded-lg animate-pulse" />
        <div class="h-24 bg-muted rounded-lg animate-pulse" />
        <div class="h-24 bg-muted rounded-lg animate-pulse" />
      </div>

      <template v-else>
        <div class="px-4 pb-3 flex gap-2">
          <div class="flex-1 bg-muted rounded-lg p-2.5 text-center">
            <div class="text-lg font-bold text-foreground">
              {{ cachedCount }}/{{ totalCharacters }}
            </div>
            <div class="text-[10px] text-muted-foreground">武将已缓存</div>
          </div>
          <div class="flex-1 bg-muted rounded-lg p-2.5 text-center">
            <div class="text-lg font-bold text-foreground">{{ cacheInfo.count }}</div>
            <div class="text-[10px] text-muted-foreground">文件数</div>
          </div>
          <div class="flex-1 bg-muted rounded-lg p-2.5 text-center">
            <div class="text-lg font-bold text-foreground">{{ formatBytes(cacheInfo.bytes) }}</div>
            <div class="text-[10px] text-muted-foreground">总大小</div>
          </div>
        </div>

        <div class="px-4 pb-3">
          <div class="flex gap-1">
            <button
              v-for="f in factionOrder"
              :key="f"
              @click="activeFaction = f"
              :class="[
                'flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150',
                activeFaction === f
                  ? `${factionText[f]} ${factionAccent[f]}/10`
                  : 'text-muted-foreground hover:text-foreground bg-muted/30',
              ]"
            >
              {{ factionLabels[f] }} {{ factionCacheStats[f].cached }}/{{
                factionCacheStats[f].total
              }}
            </button>
          </div>
        </div>

        <div
          v-if="cachedCount === 0"
          class="flex flex-col items-center justify-center py-12 px-4 text-center"
        >
          <HardDriveIcon class="size-12 text-muted-foreground/30 mb-3" />
          <p class="text-sm text-muted-foreground mb-1">还没有缓存</p>
          <p class="text-xs text-muted-foreground/60">点击武将旁的"下载"按钮缓存离线语音</p>
        </div>

        <ScrollArea v-else class="flex-1 px-4 pb-4 h-[calc(100vh-18rem)]">
          <div class="space-y-1">
            <div
              v-for="ch in charactersByFaction[activeFaction]"
              :key="ch.id"
              class="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div class="size-8 rounded bg-muted overflow-hidden shrink-0">
                <img
                  :src="`${CDN_BASE}/image/character/${ch.id}.jpg`"
                  :alt="ch.name"
                  class="size-full object-cover"
                  loading="lazy"
                />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-foreground truncate">{{ ch.name }}</span>
                  <CheckIcon
                    v-if="statusMap[ch.id]?.cached"
                    class="size-3.5 text-green-500 shrink-0"
                  />
                </div>
                <div v-if="isDownloading(ch.id)" class="flex items-center gap-1.5 mt-1">
                  <Progress :model-value="cacheStatus[ch.id]?.progress || 0" class="flex-1 h-1" />
                  <span class="text-[10px] text-muted-foreground shrink-0">
                    {{ cacheStatus[ch.id]?.progress || 0 }}%
                  </span>
                </div>
              </div>

              <div class="flex gap-0.5 shrink-0">
                <Button
                  v-if="statusMap[ch.id]?.cached"
                  variant="ghost"
                  size="icon-xs"
                  class="size-7"
                  @click="deleteCharacterCache(ch.id).then(refresh)"
                >
                  <Trash2Icon class="size-3.5 text-destructive" />
                </Button>
                <Button
                  v-else-if="!isDownloading(ch.id)"
                  variant="ghost"
                  size="icon-xs"
                  class="size-7"
                  @click="cacheOne(ch.id)"
                >
                  <DownloadIcon class="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div class="px-4 pb-4 flex gap-2 mt-auto border-t border-border pt-3">
          <Button variant="outline" size="sm" class="flex-1 gap-1" @click="refresh">
            <RefreshCwIcon class="size-3.5" />
            刷新
          </Button>
          <Button
            variant="destructive"
            size="sm"
            class="flex-1 gap-1"
            @click="clearDialogOpen = true"
          >
            <Trash2Icon class="size-3.5" />
            清空全部
          </Button>
          <Button variant="outline" size="sm" class="gap-1" @click="cacheFaction(activeFaction)">
            <DownloadIcon class="size-3.5" />
            全部
          </Button>
        </div>
      </template>
    </SheetContent>

    <Dialog :open="clearDialogOpen" @update:open="clearDialogOpen = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认清空缓存</DialogTitle>
          <DialogDescription
            >确定要删除所有已缓存的音频和图片吗？此操作不可撤销。</DialogDescription
          >
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="clearDialogOpen = false">取消</Button>
          <Button variant="destructive" @click="handleClearAll">确认清空</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Sheet>
</template>
