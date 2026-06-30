<script setup>
import { ref, onMounted } from "vue";
import { Button } from "@/components/ui/button";
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
import { HardDriveIcon, Trash2Icon, RefreshCwIcon, SettingsIcon } from "@lucide/vue";

const { getCacheSize, clearAllCache } = useCache();

const loading = ref(true);
const cacheInfo = ref({ count: 0, bytes: 0 });
const clearDialogOpen = ref(false);

onMounted(async () => {
  cacheInfo.value = await getCacheSize();
  loading.value = false;
});

async function refresh() {
  loading.value = true;
  cacheInfo.value = await getCacheSize();
  loading.value = false;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function handleClearAll() {
  try {
    await clearAllCache();
    clearDialogOpen.value = false;
    await refresh();
  } catch (e) {
    console.error("清空缓存失败:", e);
    clearDialogOpen.value = false;
  }
}
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="sm" class="gap-1.5 text-xs">
        <SettingsIcon class="size-3.5" />
        {{ formatBytes(cacheInfo.bytes) }}
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="w-80 max-w-[85vw] p-0">
      <SheetHeader class="px-4 pt-4 pb-2">
        <SheetTitle>缓存管理</SheetTitle>
      </SheetHeader>

      <div v-if="loading" class="px-4 space-y-3">
        <div class="h-16 bg-muted rounded-lg animate-pulse" />
      </div>

      <template v-else>
        <div class="px-4 pb-4 flex gap-2">
          <div class="flex-1 bg-muted rounded-lg p-2.5 text-center">
            <div class="text-lg font-bold text-foreground">{{ cacheInfo.count }}</div>
            <div class="text-[10px] text-muted-foreground">文件数</div>
          </div>
          <div class="flex-1 bg-muted rounded-lg p-2.5 text-center">
            <div class="text-lg font-bold text-foreground">{{ formatBytes(cacheInfo.bytes) }}</div>
            <div class="text-[10px] text-muted-foreground">总大小</div>
          </div>
        </div>

        <div
          v-if="cacheInfo.count === 0"
          class="flex flex-col items-center justify-center py-12 px-4 text-center"
        >
          <HardDriveIcon class="size-12 text-muted-foreground/30 mb-3" />
          <p class="text-sm text-muted-foreground mb-1">还没有缓存</p>
          <p class="text-xs text-muted-foreground/60">加入武将面杀池时自动缓存语音</p>
        </div>

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
