<script setup>
import { computed } from "vue";
import { useProom } from "../composables/useProom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CDN_BASE } from "@/constants";
import characters from "../data/characters.json";
import { ClockIcon, RotateCwIcon, Trash2Icon } from "@lucide/vue";
import { ref } from "vue";

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(["update:open"]);

const { history, loadSession, deleteHistoryEntry, proom } = useProom();

const confirmSession = ref(null);
const confirmOpen = ref(false);

function dominantGroup(charIds) {
  const counts = {};
  for (const id of charIds) {
    const ch = characters[id];
    if (ch) counts[ch.group] = (counts[ch.group] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "wei";
}

const factionBarBg = {
  wei: "bg-wei/80",
  shu: "bg-shu/80",
  wu: "bg-wu/80",
  qun: "bg-qun/80",
};

const factionBorder = {
  wei: "border-wei/60",
  shu: "border-shu/60",
  wu: "border-wu/60",
  qun: "border-qun/60",
};

const factionLabel = {
  wei: "魏",
  shu: "蜀",
  wu: "吴",
  qun: "群",
};

function formatTime(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "昨天";
  if (diffDays <= 7) return `${diffDays}天前`;
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}

const avatarUrl = (id) => `${CDN_BASE}/image/character/${id}.jpg`;

function promptLoad(session) {
  if (proom.value.length === 0) {
    doLoad(session);
    return;
  }
  confirmSession.value = session;
  confirmOpen.value = true;
}

function doLoad(session) {
  loadSession(session);
  confirmOpen.value = false;
  emit("update:open", false);
}
</script>

<template>
  <Sheet :open="open" @update:open="(v) => $emit('update:open', v)">
    <SheetContent side="bottom" class="p-0 rounded-t-xl max-h-[70dvh]">
      <SheetHeader class="px-4 pt-4 pb-3 shrink-0">
        <SheetTitle>历史记录</SheetTitle>
      </SheetHeader>

      <div
        v-if="history.length === 0"
        class="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <ClockIcon class="size-10 text-muted-foreground/30 mb-3" />
        <p class="text-sm text-muted-foreground">还没有历史记录</p>
        <p class="text-xs text-muted-foreground/60 mt-1">在面杀池中保存阵容后记录会出现在这里</p>
      </div>

      <div v-else class="overflow-y-auto px-4 pb-4 space-y-2">
        <div
          v-for="session in history"
          :key="session.id"
          class="rounded-lg overflow-hidden border border-border bg-card"
        >
          <div
            class="h-7 flex items-center justify-center text-xs font-medium text-white"
            :class="factionBarBg[dominantGroup(session.characters)]"
          >
            {{ factionLabel[dominantGroup(session.characters)] }} ·
            {{ session.characters.length }}人局
          </div>

          <div class="flex items-center p-3 gap-3">
            <div class="flex -space-x-3 flex-1 min-w-0">
              <div
                v-for="(chId, i) in session.characters.slice(0, 5)"
                :key="chId"
                class="size-12 rounded-lg overflow-hidden ring-2 shrink-0"
                :class="[
                  factionBorder[characters[chId]?.group] || 'border-muted',
                  i === 0 ? 'ring-background' : '',
                ]"
              >
                <img
                  :src="avatarUrl(chId)"
                  :alt="chId"
                  class="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                v-if="session.characters.length > 5"
                class="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0 ring-2 ring-background text-[11px] text-muted-foreground font-medium"
              >
                +{{ session.characters.length - 5 }}
              </div>
            </div>

            <div class="flex flex-col gap-1.5 shrink-0">
              <Button variant="outline" size="xs" class="gap-1 h-7" @click="promptLoad(session)">
                <RotateCwIcon class="size-3" />
                加载
              </Button>
              <Button
                variant="ghost"
                size="xs"
                class="gap-1 h-7 text-destructive hover:text-destructive"
                @click="deleteHistoryEntry(session.id)"
              >
                <Trash2Icon class="size-3" />
                删除
              </Button>
            </div>
          </div>

          <div class="px-3 pb-2 text-[11px] text-muted-foreground/60">
            {{ formatTime(session.timestamp) }}
          </div>
        </div>
      </div>
    </SheetContent>

    <Dialog :open="confirmOpen" @update:open="confirmOpen = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>替换当前阵容？</DialogTitle>
          <DialogDescription>
            当前面杀池中有 {{ proom.length }} 名武将，加载历史阵容将替换它们。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="confirmOpen = false">取消</Button>
          <Button variant="default" @click="doLoad(confirmSession)">替换</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Sheet>
</template>
