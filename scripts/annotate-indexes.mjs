import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CHAR_DIR = "/tmp/noname_char";
const TRANS_DIR = "/tmp/noname_translate";
const INDEX_DIR = "/home/wsl-ubuntu24/code/sanguosha-voice/src/data/index";

// --- Step 1: Extract all character keys from character.js files ---
const charKeys = new Set();
const charFiles = readdirSync(CHAR_DIR).filter((f) => f.endsWith(".js"));

for (const f of charFiles) {
  const content = readFileSync(join(CHAR_DIR, f), "utf-8");
  const match = content.match(/const\s+characters\s*=\s*\{([\s\S]*?)\};/);
  if (!match) continue;
  const body = match[1];
  for (const line of body.split("\n")) {
    const m = line.match(/^\s*(\w[\w]*)\s*:/);
    if (m) charKeys.add(m[1]);
  }
}

console.log(`Character keys from character.js: ${charKeys.size}`);

// --- Step 2: Build name map from translate files ---
const nameMap = new Map(); // key -> Chinese name

function extractPairs(body) {
  const pairs = [];
  const regex = /(\w[\w]*)\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(body)) !== null) {
    pairs.push([m[1], m[2]]);
  }
  return pairs;
}

const transFiles = readdirSync(TRANS_DIR).filter((f) => f.endsWith(".js"));

for (const f of transFiles) {
  const content = readFileSync(join(TRANS_DIR, f), "utf-8");

  // Format A: const translates = { ... }
  let m = content.match(/const\s+translates\s*=\s*\{([\s\S]*?)\};/);
  if (m) {
    for (const [key, val] of extractPairs(m[1])) {
      if (!nameMap.has(key)) nameMap.set(key, val);
    }
    continue;
  }

  // Format B: translate: { ... } inside game.import
  // Two possible closings:  },  (comma, next key follows)  or  }  (end of object)
  m = content.match(/translate\s*:\s*\{([\s\S]*?)\}\s*,?\s*\n\s*(?:\w|\})/);
  if (m) {
    for (const [key, val] of extractPairs(m[1])) {
      if (!nameMap.has(key)) nameMap.set(key, val);
    }
  }
}

console.log(`Name map entries: ${nameMap.size}`);

// --- Step 3: Determine if a key is a "character" name ---
const charNameKeys = new Set();
const translateOnlyKeys = new Set(); // names from translate that aren't in charKeys
for (const [key, val] of nameMap) {
  if (charKeys.has(key)) {
    charNameKeys.add(key);
  } else {
    // Only add to translateOnlyKeys if it looks like a character name (not skill info)
    if (!key.endsWith("_info") && !key.endsWith("_prefix") && val.length <= 8) {
      translateOnlyKeys.add(key);
    }
  }
}
console.log(`Character name entries: ${charNameKeys.size}`);
console.log(`Translate-only name entries: ${translateOnlyKeys.size}`);

// --- Step 4: Build prefix map for fallback lookups ---
const PREFIXES = [
  "re_",
  "ol_",
  "sb_",
  "sp_",
  "sp2_",
  "dc_",
  "jd_",
  "ns_",
  "scl_",
  "gz_re_",
  "ol_sb_",
  "re_sp_",
  "ly_",
  "boss_",
  "nz_",
  "yj_",
  "xin_",
  "shen_",
  "tw_",
  "jsrg_",
  "clan_",
  "key_",
  "gw_",
  "hs_",
  "gjqt_",
  "jg_",
  "swd_",
  "ow_",
  "mtg_",
  "xia_",
  "yxs_",
  "pal_",
  "db_key_",
  "sgs_",
];
const VERSION_STRS = [
  "神",
  "SP",
  "界",
  "谋",
  "手杀",
  "手杀界",
  "十周年",
  "OL",
  "OL界",
  "国战",
  "新",
  "星",
];

// --- Step 5: Annotate a single index file ---
function annotateIndex(fileName) {
  const filePath = join(INDEX_DIR, fileName);
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  let filled = 0,
    total = 0;

  for (const [key, entry] of Object.entries(data)) {
    total++;
    if (entry.description && entry.description !== "") continue;

    let name = "";

    // Try direct lookup (any nameMap entry first, then restrict to charNames)
    if (nameMap.has(key)) {
      name = nameMap.get(key);
    } else if (translateOnlyKeys.has(key)) {
      name = nameMap.get(key);
    }

    // Try stripping prefixes
    if (!name) {
      let stripped = key;
      for (const p of PREFIXES) {
        if (stripped.startsWith(p)) {
          stripped = stripped.slice(p.length);
          break;
        }
      }
      if (stripped !== key) {
        if (nameMap.has(stripped)) {
          name = nameMap.get(stripped);
        } else if (charNameKeys.has(stripped)) {
          name = nameMap.get(stripped);
        }
      }
    }

    // Try shen_ prefix pattern (e.g., shen_caocao -> 神曹操)
    if (!name && key.startsWith("shen_")) {
      const base = key.slice(5);
      if (charNameKeys.has(base)) {
        const baseName = nameMap.get(base);
        if (baseName) name = "神" + baseName;
      }
    }

    // Try sp_ prefix pattern
    if (!name && key.startsWith("sp_")) {
      const base = key.slice(3);
      if (charNameKeys.has(base)) {
        const baseName = nameMap.get(base);
        if (baseName) name = "SP" + baseName;
      }
    }

    // Try sb_ prefix pattern
    if (!name && key.startsWith("sb_")) {
      const base = key.slice(3);
      if (charNameKeys.has(base)) {
        const baseName = nameMap.get(base);
        if (baseName) name = "谋" + baseName;
      }
    }

    // Try ol_ prefix pattern
    if (!name && key.startsWith("ol_")) {
      const base = key.slice(3);
      if (charNameKeys.has(base)) {
        const baseName = nameMap.get(base);
        if (baseName) name = "OL" + baseName;
      }
    }

    // Try re_ prefix pattern
    if (!name && key.startsWith("re_")) {
      const base = key.slice(3);
      if (charNameKeys.has(base)) {
        const baseName = nameMap.get(base);
        if (baseName) name = "界" + baseName;
      }
    }

    // Try dc_ prefix pattern
    if (!name && key.startsWith("dc_")) {
      const base = key.slice(3);
      if (charNameKeys.has(base)) {
        const baseName = nameMap.get(base);
        if (baseName) name = "D" + baseName;
      }
    }

    // Try cross-IP prefixed (gw_, hs_, key_, gjqt_, jg_, swd_, ow_, mtg_, yxs_, pal_)
    if (!name) {
      const ipPrefixes = {
        gw_: "巫师之昆特牌",
        hs_: "炉石传说",
        key_: "Key社",
        gjqt_: "古剑奇谭",
        jg_: "剑阁",
        swd_: "轩辕剑",
        ow_: "守望先锋",
        mtg_: "万智牌",
        yxs_: "游戏王",
        pal_: "仙剑奇侠传",
        xia_: "侠客风云传",
        db_key_: "Key社",
        sgs_: "手游",
      };
      for (const [p, label] of Object.entries(ipPrefixes)) {
        if (key.startsWith(p)) {
          const base = key.slice(p.length);
          if (charNameKeys.has(base)) {
            const baseName = nameMap.get(base);
            if (baseName) name = `${baseName} (${label})`;
          }
          break;
        }
      }
    }

    // Try clan prefix
    if (!name && key.startsWith("clan_")) {
      const base = key.slice(5);
      if (charNameKeys.has(base)) {
        const baseName = nameMap.get(base);
        if (baseName) name = "族" + baseName;
      }
    }

    if (name) {
      data[key].description = name;
      filled++;
    }
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`${fileName}: ${filled}/${total} descriptions filled`);
}

// --- Run annotation ---
console.log("\n--- Annotating character.json ---");
annotateIndex("character.json");

console.log("\n--- Annotating die.json ---");
annotateIndex("die.json");

// For skill.json, skip for now — skill descriptions need a different approach
console.log("\n--- Annotating skill.json ---");
annotateIndex("skill.json");
