import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CHAR_DIR = "/tmp/noname_char";
const TRANS_DIR = "/tmp/noname_translate";
const INDEX_DIR = "/home/wsl-ubuntu24/code/sanguosha-voice/src/data/index";

// --- Step 1: Extract all character keys from character.js files ---
const charKeys = new Set();
for (const f of readdirSync(CHAR_DIR).filter((f) => f.endsWith(".js"))) {
  const content = readFileSync(join(CHAR_DIR, f), "utf-8");
  const match = content.match(/const\s+characters\s*=\s*\{([\s\S]*?)\};/);
  if (!match) continue;
  for (const line of match[1].split("\n")) {
    const m = line.match(/^\s*(\w[\w]*)\s*:/);
    if (m) charKeys.add(m[1]);
  }
}

// --- Step 2: Build name map from translate files ---
const nameMap = new Map();

function extractPairs(body) {
  const pairs = [];
  const regex = /(\w[\w]*)\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(body)) !== null) pairs.push([m[1], m[2]]);
  return pairs;
}

for (const f of readdirSync(TRANS_DIR).filter((f) => f.endsWith(".js"))) {
  const content = readFileSync(join(TRANS_DIR, f), "utf-8");

  let m = content.match(/const\s+translates\s*=\s*\{([\s\S]*?)\};/);
  if (m) {
    for (const [key, val] of extractPairs(m[1])) {
      if (!nameMap.has(key)) nameMap.set(key, val);
    }
    continue;
  }

  m = content.match(/translate\s*:\s*\{([\s\S]*?)\}\s*,?\s*\n\s*(?:\w|\})/);
  if (m) {
    for (const [key, val] of extractPairs(m[1])) {
      if (!nameMap.has(key)) nameMap.set(key, val);
    }
  }
}

// --- Step 3: Try to resolve a key to a Chinese name ---
// CDN-to-noname key aliases for known pinyin/name mismatches
const KEY_ALIASES = {
  xuchu: "xuzhu", // 许褚, CDN uses wrong pinyin
  jiangqin: "jiangqing", // 蒋钦, CDN uses wrong romanization
  xiangrang: "xianglang", // 向朗, CDN uses wrong romanization
};

// Alternative names (style/courtesy name → character ID)
const ALT_NAMES = {
  caizhaoji: "caiwenji", // 蔡昭姬 = 蔡琰
  jinxuandi: "liuxie", // 汉献帝 = 刘协
  panglingming: "pangde", // 庞令明 = 庞德
  luboyan: "luxun", // 陆伯言 = 陆逊
  jiawenhe: "jiaxu", // 贾文和 = 贾诩
  zhongshiji: "zhonghui", // 钟士季 = 钟会
  dengshizai: "dengai", // 邓士载 = 邓艾
};

// Compound character names (two characters combined)
const COMPOUND_NAMES = {
  jiangwanfeiyi: ["jiangwan", "feiyi"],
  chenwudongxi: ["chenwu", "dongxi"],
};

// Bare names that need a specific prefix to be found in noname repo
// CDN key → prefixed noname key
const BARE_NAME_PREFIX = {
  dongzhao: "ol_dongzhao",
  huban: "ol_huban",
  liuqi: "sp_liuqi",
  mengda: "ol_mengda",
  wenqin: "ol_wenqin",
  tangzi: "xf_tangzi",
  sunchen: "ol_sunchen",
  pengyang: "sp_pengyang",
  lidian: "old_re_lidian",
};

const PREFIX_RULES = [
  // Order matters: more specific prefixes first
  [
    "gz_jun_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "国战君" + n : "";
    },
  ],
  [
    "ol_sb_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "OL谋" + n : "";
    },
  ],
  [
    "gz_re_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "国界" + n : "";
    },
  ],
  [
    "re_sp_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "界SP" + n : "";
    },
  ],
  [
    "db_key_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (Key社)" : "";
    },
  ],
  [
    "yj_sb_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "谋" + n + " (移)" : "";
    },
  ],
  [
    "dc_sb_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "新杀谋" + n : "";
    },
  ],
  [
    "clan_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "族" + n : "";
    },
  ],
  [
    "gz_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "国战" + n : "";
    },
  ],
  [
    "jun_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "君" + n : "";
    },
  ],
  [
    "shen_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "神" + n : "";
    },
  ],
  [
    "sp_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "SP" + n : "";
    },
  ],
  [
    "sb_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "谋" + n : "";
    },
  ],
  [
    "ol_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "OL" + n : "";
    },
  ],
  [
    "re_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "界" + n : "";
    },
  ],
  [
    "dc_",
    (base) => {
      const n = resolveSimple(base);
      return n ? "D" + n : "";
    },
  ],
  [
    "noname_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (Noname)" : "";
    },
  ],
  [
    "mb_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (谋崩)" : "";
    },
  ],
  [
    "scs_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (十常侍)" : "";
    },
  ],
  [
    "boss_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (Boss)" : "";
    },
  ],
  [
    "neo_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (Neo)" : "";
    },
  ],
  [
    "st_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (ST)" : "";
    },
  ],
  [
    "wis_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (智)" : "";
    },
  ],
  [
    "gw_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (巫师之昆特牌)" : "";
    },
  ],
  [
    "hs_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (炉石传说)" : "";
    },
  ],
  [
    "key_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (Key社)" : "";
    },
  ],
  [
    "gjqt_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (古剑奇谭)" : "";
    },
  ],
  [
    "jg_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (剑阁)" : "";
    },
  ],
  [
    "swd_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (轩辕剑)" : "";
    },
  ],
  [
    "ow_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (守望先锋)" : "";
    },
  ],
  [
    "mtg_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (万智牌)" : "";
    },
  ],
  [
    "yxs_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (游戏王)" : "";
    },
  ],
  [
    "pal_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (仙剑奇侠传)" : "";
    },
  ],
  [
    "xia_",
    (base) => {
      const n = resolveSimple(base);
      return n ? n + " (侠客风云传)" : "";
    },
  ],
];

function resolveSimple(key) {
  if (nameMap.has(key)) return nameMap.get(key);
  if (KEY_ALIASES[key]) return resolveSimple(KEY_ALIASES[key]);
  if (ALT_NAMES[key]) return resolveSimple(ALT_NAMES[key]);
  if (BARE_NAME_PREFIX[key]) {
    const prefixed = BARE_NAME_PREFIX[key];
    if (nameMap.has(prefixed)) return nameMap.get(prefixed);
  }
  return "";
}

function resolveName(key) {
  // Direct lookup
  if (nameMap.has(key)) return nameMap.get(key);

  // Alternative name lookup (style names)
  if (ALT_NAMES[key]) {
    const n = resolveName(ALT_NAMES[key]);
    if (n) return n;
  }

  // Key alias (CDN pinyin mismatch)
  if (KEY_ALIASES[key]) {
    const n = resolveName(KEY_ALIASES[key]);
    if (n) return n;
  }

  // Bare name that needs a prefix in noname repo
  if (BARE_NAME_PREFIX[key]) {
    const prefixed = BARE_NAME_PREFIX[key];
    if (nameMap.has(prefixed)) return nameMap.get(prefixed);
  }

  // Compound name (two characters combined)
  if (COMPOUND_NAMES[key]) {
    const parts = COMPOUND_NAMES[key].map((k) => resolveName(k)).filter(Boolean);
    if (parts.length > 0) return parts.join("");
  }

  // Strip numeric suffix (_2, _3, 2, 3 etc.) and re-try
  let stripped = key.replace(/[_]?\d+$/, "");
  if (stripped !== key) {
    const n = resolveName(stripped);
    if (n) return n;
  }

  // Strip Rest suffix
  stripped = key.replace(/Rest$/, "");
  if (stripped !== key) {
    const n = resolveName(stripped);
    if (n) return n;
  }

  // Suffixes: _shadow, _dead, _tiger
  const suffixMatch = key.match(/^(.+?)(?:_shadow|_dead|_tiger)$/);
  if (suffixMatch) {
    const base = suffixMatch[1];
    const n = resolveName(base);
    if (n) return n;
  }

  // Try each prefix rule
  for (const [prefix, resolver] of PREFIX_RULES) {
    if (key.startsWith(prefix)) {
      const base = key.slice(prefix.length);
      const n = resolver(base);
      if (n) return n;
    }
  }

  // Check _skill suffix (equipment skills like bagua_skill, baiyin_skill)
  const skillSuffixMatch = key.match(/^(.+)_skill$/);
  if (skillSuffixMatch) {
    const n = resolveName(skillSuffixMatch[1]);
    if (n) return n;
  }

  // Try lowercasing first letter (for Ivxin → ivxin pattern)
  if (key.length > 0 && key[0] >= "A" && key[0] <= "Z") {
    const lowered = key[0].toLowerCase() + key.slice(1);
    const n = resolveName(lowered);
    if (n) return n;
  }

  return "";
}

// --- Step 4: Try to resolve a skill key to a Chinese name ---
// Skill keys have patterns like:
//   aocai_gz_zhugeke1   (skillname_prefix_charname_number)
//   baonue2_re_dongzhuo1 (skillname2_prefix_charname_number)
//   boss_abi             (boss_ prefix)
//   Ivxin1               (skillname_number)
//   bagua_skill          (skillname_skill)
function resolveSkillName(key) {
  // First try the generic name resolver (handles direct matches, aliases, suffixes)
  const generic = resolveName(key);
  if (generic) return generic;

  // Strip trailing _?\d+ and re-try
  let stripped = key.replace(/[_]?\d+$/, "");
  if (stripped !== key) {
    const n = resolveSkillName(stripped);
    if (n) return n;
  }

  // Handle _skill suffix
  const skillSuffixMatch = key.match(/^(.+)_skill$/);
  if (skillSuffixMatch) {
    const n = resolveSkillName(skillSuffixMatch[1]);
    if (n) return n;
  }

  // Try each prefix rule (for boss_abi etc.)
  for (const [prefix, resolver] of PREFIX_RULES) {
    if (key.startsWith(prefix) && !key.startsWith("boss_")) {
      const base = key.slice(prefix.length);
      const n = resolveSkillName(base);
      if (n) return n;
    }
  }

  // For boss_ prefix skill: strip prefix and re-try
  if (key.startsWith("boss_")) {
    const n = resolveSkillName(key.slice(5));
    if (n) return n + " (Boss)";
  }

  // Try split-based resolution for compound keys
  // Patterns: skill_prefix_charname, prefix_skillname, charname_subskill
  const parts = key.split("_");

  // Strategy 1: try progressively shorter left-to-right prefixes
  for (let i = parts.length - 1; i >= 1; i--) {
    const candidate = parts.slice(0, i).join("_");
    if (nameMap.has(candidate)) {
      return nameMap.get(candidate);
    }
  }

  // Strategy 2: try progressively shorter right-to-left suffixes
  for (let i = 1; i < parts.length; i++) {
    const candidate = parts.slice(i).join("_");
    if (nameMap.has(candidate)) {
      return nameMap.get(candidate);
    }
  }

  // Strategy 3: try each individual part
  for (const part of parts) {
    if (nameMap.has(part)) {
      return nameMap.get(part);
    }
    // Try lowercased
    if (part.length > 0 && part[0] >= "A" && part[0] <= "Z") {
      const lowered = part[0].toLowerCase() + part.slice(1);
      if (nameMap.has(lowered)) {
        return nameMap.get(lowered);
      }
    }
  }

  return "";
}

// --- Step 5: Annotate a single index file ---
function annotateIndex(fileName) {
  const filePath = join(INDEX_DIR, fileName);
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  let filled = 0,
    total = 0;

  const isSkill = fileName === "skill.json";
  for (const [key, entry] of Object.entries(data)) {
    total++;
    if (isSkill && entry.description && entry.description !== "") continue;

    const name = isSkill ? resolveSkillName(key) : resolveName(key);
    if (name) {
      data[key].description = name;
      filled++;
    }
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(
    `${fileName}: ${filled}/${total - (total - Object.keys(data).length)} descriptions filled (${total} total)`,
  );
  return { filled, total };
}

// --- Run ---
console.log("=== character.json ===");
annotateIndex("character.json");

console.log("\n=== die.json ===");
annotateIndex("die.json");

console.log("\n=== skill.json ===");
annotateIndex("skill.json");
