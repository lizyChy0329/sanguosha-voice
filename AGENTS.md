<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

# Project-specific Knowledge

## CDN Filename Mismatches

`src/data/characters.json` keys double as CDN filenames for avatars (`image/character/{key}.jpg`) and death sounds (`audio/die/{die}`). The key must match the actual file in the `libccy/noname` repo on jsDelivr CDN.

Known mismatches found and fixed:

- `xuchu` → `xuzhu` (许褚, pinyin is xǔ zhū not xǔ chǔ)
- `yuanshao` → `ol_yuanshao` (袁绍, CDN only has `ol_yuanshao.jpg`)
- `yanliangwenchou` left as-is (CDN has no matching avatar or death sound)

**Always verify new character keys against the CDN** by checking:

```bash
curl -sI "https://cdn.jsdelivr.net/gh/libccy/noname@master/image/character/{key}.jpg"
curl -sI "https://cdn.jsdelivr.net/gh/libccy/noname@master/audio/die/{die}"
```

To list all available images in the repo:

```bash
curl -s "https://api.github.com/repos/libccy/noname/git/trees/master?recursive=1" | \
  python3 -c "import json,sys; [print(p['path']) for p in json.load(sys.stdin)['tree'] if p['path'].startswith('image/character/')]"
```
