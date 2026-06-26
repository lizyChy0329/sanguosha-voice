import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TMP_CLONE = join(__dirname, ".tmp-noname");
const OUTPUT_DIR = join(__dirname, "..", "src", "data", "index");
const REPO_URL = "https://github.com/libccy/noname.git";

const TARGETS = {
  "image/character": "character.json",
  "image/background": "background.json",
  "audio/die": "die.json",
  "audio/skill": "skill.json",
  "audio/background": "bgm.json",
  font: "font.json",
};

function run(cmd, opts = {}) {
  return execSync(cmd, { encoding: "utf-8", ...opts }).trim();
}

console.log("Cloning noname repo (shallow, metadata only)...");
if (existsSync(TMP_CLONE)) {
  run(`rm -rf ${TMP_CLONE}`);
}
run(`git clone --depth 1 --filter=blob:none ${REPO_URL} ${TMP_CLONE}`);

console.log("Listing tracked files...");
const allFiles = run(`git -C ${TMP_CLONE} ls-tree -r HEAD --name-only`).split("\n");
const fileSet = new Set(allFiles);

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

for (const [prefix, outputFile] of Object.entries(TARGETS)) {
  const matching = allFiles.filter((f) => f.startsWith(prefix + "/") && fileSet.has(f));
  matching.sort();
  const index = {};
  for (const f of matching) {
    const key = f.slice(prefix.length + 1).replace(/\.\w+$/, "");
    index[key] = f;
  }
  const outPath = join(OUTPUT_DIR, outputFile);
  writeFileSync(outPath, JSON.stringify(index, null, 2) + "\n");
  console.log(`  ${outputFile}: ${Object.keys(index).length} entries`);
}

run(`rm -rf ${TMP_CLONE}`);
console.log("Done.");
