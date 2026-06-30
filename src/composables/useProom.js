import { ref } from "vue";

const STORAGE_KEY = "sanguosha-proom";
const HISTORY_KEY = "sanguosha-history";
const MAX_PROOM_SIZE = 8;

const proom = ref([]);
const history = ref([]);

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  try {
    proom.value = JSON.parse(saved);
  } catch {}
}
const savedHistory = localStorage.getItem(HISTORY_KEY);
if (savedHistory) {
  try {
    history.value = JSON.parse(savedHistory);
  } catch {}
}

export function useProom() {
  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(proom.value));
  }

  function addCharacter(id) {
    if (proom.value.length >= MAX_PROOM_SIZE) return false;
    if (proom.value.includes(id)) return false;
    proom.value.push(id);
    persist();
    return true;
  }

  function removeCharacter(id) {
    proom.value = proom.value.filter((c) => c !== id);
    persist();
  }

  function hasCharacter(id) {
    return proom.value.includes(id);
  }

  function reorderProom(newOrder) {
    proom.value = newOrder;
    persist();
  }

  function saveSession() {
    const session = {
      id: Date.now().toString(),
      characters: [...proom.value],
      timestamp: Date.now(),
    };
    history.value.unshift(session);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value));
    return session;
  }

  function loadSession(session) {
    proom.value = [...session.characters];
    persist();
  }

  function deleteHistoryEntry(id) {
    history.value = history.value.filter((s) => s.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value));
  }

  function clearProom() {
    proom.value = [];
    persist();
  }

  function saveProom() {
    persist();
  }

  return {
    proom,
    history,
    addCharacter,
    removeCharacter,
    hasCharacter,
    reorderProom,
    saveSession,
    loadSession,
    deleteHistoryEntry,
    clearProom,
    saveProom,
    MAX_PROOM_SIZE,
  };
}
