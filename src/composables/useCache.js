import { ref } from "vue";
import characters from "../data/characters.json";

const CACHE_NAME = "sanguosha-audio";

const cacheStatus = ref({});
const downloading = ref(new Set());

export function useCache() {
  async function getCacheStore() {
    return await caches.open(CACHE_NAME);
  }

  async function getCacheSize() {
    const cache = await getCacheStore();
    const keys = await cache.keys();
    let total = 0;
    for (const req of keys) {
      const res = await cache.match(req);
      if (res) {
        const blob = await res.blob();
        total += blob.size;
      }
    }
    return { count: keys.length, bytes: total };
  }

  async function getCharacterCacheStatus(characterId) {
    const ch = characters[characterId];
    if (!ch) return { cached: false, size: 0 };
    const urls = getCharacterUrls(characterId);
    const cache = await getCacheStore();
    let cached = 0;
    for (const url of urls) {
      const res = await cache.match(url);
      if (res) cached++;
    }
    return {
      cached: cached > 0,
      progress: Math.round((cached / urls.length) * 100),
      total: urls.length,
      cachedCount: cached,
    };
  }

  function getCharacterUrls(characterId) {
    const ch = characters[characterId];
    if (!ch) return [];
    const urls = [];
    const base = "https://cdn.jsdelivr.net/gh/libccy/noname@master";
    urls.push(`${base}/image/character/${characterId}.jpg`);
    for (const [skillId] of ch.skills) {
      urls.push(`${base}/audio/skill/${skillId}1.mp3`);
      urls.push(`${base}/audio/skill/${skillId}2.mp3`);
    }
    urls.push(`${base}/audio/die/${ch.die}`);
    return urls;
  }

  async function cacheCharacter(characterId) {
    if (downloading.value.has(characterId)) return;
    downloading.value.add(characterId);
    const urls = getCharacterUrls(characterId);
    const cache = await getCacheStore();
    let completed = 0;
    for (const url of urls) {
      try {
        const res = await fetch(url, { mode: "cors" });
        if (res.ok) {
          await cache.put(url, res);
        }
      } catch {
        /* ignore */
      }
      completed++;
      cacheStatus.value[characterId] = {
        progress: Math.round((completed / urls.length) * 100),
        total: urls.length,
        cachedCount: completed,
      };
    }
    downloading.value.delete(characterId);
    return true;
  }

  async function deleteCharacterCache(characterId) {
    const urls = getCharacterUrls(characterId);
    const cache = await getCacheStore();
    for (const url of urls) {
      await cache.delete(url);
    }
    delete cacheStatus.value[characterId];
  }

  async function clearAllCache() {
    const cache = await getCacheStore();
    const keys = await cache.keys();
    for (const req of keys) {
      await cache.delete(req);
    }
    cacheStatus.value = {};
  }

  async function refreshAllStatus() {
    const ids = Object.keys(characters);
    const results = {};
    for (const id of ids) {
      results[id] = await getCharacterCacheStatus(id);
    }
    return results;
  }

  return {
    cacheStatus,
    downloading,
    getCacheSize,
    getCharacterCacheStatus,
    getCharacterUrls,
    cacheCharacter,
    deleteCharacterCache,
    clearAllCache,
    refreshAllStatus,
    getCacheStore,
  };
}
