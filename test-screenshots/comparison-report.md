# Visual Comparison Report: Reference UI-1.png vs Running App

**Date:** 2026-07-08
**Viewport:** 390×844 (mobile)
**Reference:** `UI-1.png` (Screen 1 = 点将台/home, Screen 2 = 选将/select)
**App screenshots:** `home.png`, `select.png`

---

## Summary

The app is in a very early development stage. The **select page** (Screen 2) is closer to the reference but has major styling differences. The **home page** (Screen 1) is essentially a wireframe — 85.1% blank background with only empty card slots and no character content, skills section, or proper audio player.

---

## SCREEN 1 — Home/点将台 (`/`)

### Actual vs Reference

| Aspect                            | Reference (UI-1.png)                                   | Actual App (home.png)                                   | Match?          |
| --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- | --------------- |
| **Header background**             | Dark charcoal `#1a1a1a`–`#2a2a2a` (warm)               | Dark slate blue `#1f2937` (cool)                        | ❌              |
| **Header title**                  | "三国杀语音助手" white                                 | "三国杀语音助手" white                                  | ✅              |
| **Header "已选 8/8"**             | White text, right of title                             | **MISSING**                                             | ❌              |
| **Header settings gear**          | White gear icon                                        | White gear icon                                         | ✅              |
| **Header hamburger**              | White ☰                                               | White ☰                                                | ✅              |
| **Main background**               | Warm cream `#f5f0e6`                                   | Warm cream `#f5f0e8`                                    | ✅ (near match) |
| **Character cards**               | 2×4 grid with character portraits, gold borders, names | 4×2 grid of **empty dashed-border slots** with "+" icon | ❌❌            |
| **Card border style**             | Solid gold `#b8860b`–`#9a7b4f`, 1-2px                  | Dashed light blue-gray `#d1d5db`                        | ❌❌            |
| **Card portrait**                 | Full character illustration                            | **No portraits** — just dashed outline                  | ❌❌            |
| **Card name text**                | White, bold, bottom-center                             | **MISSING**                                             | ❌              |
| **Skill count badge**             | Small circle top-right of card                         | **MISSING**                                             | ❌              |
| **Selection state**               | Gold glow `#c9a84c` on selected card                   | **No selection state**                                  | ❌              |
| **Subtitle "点击头像可更换武将"** | Centered, gray `#666`                                  | **MISSING**                                             | ❌              |
| **Skill section**                 | Dark `#1e1e1e`–`#2d2d2d` background with pill buttons  | **MISSING** (~70% of screen is empty)                   | ❌❌            |
| **Skill section title**           | "司马懿 技能" white bold                               | **MISSING**                                             | ❌              |
| **Skill pill buttons**            | Gold-outlined `#d4a843` text, dark bg                  | **MISSING**                                             | ❌              |
| **Locked skill indicator**        | 🔒 lock icon on locked skills                          | **MISSING**                                             | ❌              |
| **Audio player**                  | Gold play button `#d4a843`, progress bar, time         | **Different** — dark music player with prev/play/next   | ❌              |
| **Play button style**             | Large gold circle ▶                                    | Dark circle with white ▶                                | ❌              |
| **FAB (floating action button)**  | **NOT in reference**                                   | Teal `#26a69a` circle with "+"                          | ❌ (extra)      |
| **Bottom bar text**               | Time display "00:00 / 00:04"                           | "选曲" + music controls                                 | ❌              |
| **Overall density**               | Fully packed with content                              | **85.1% empty** background                              | ❌❌            |

### Itemized Differences (Home Page)

1. **Header BG color wrong**: App uses `#1f2937` (cool slate blue) vs reference `#1a1a1a`–`#2a2a2a` (warm charcoal)
2. **Missing "已选 8/8"**: The header should show selected count to the right of the title
3. **Empty card slots**: Reference has 8 populated character cards (2×4 grid); app shows 8 empty dashed-border rectangles (4×2 grid)
4. **Card border style**: Dashed `#d1d5db` vs solid gold
5. **No character portraits**: All cards are empty outlines
6. **No card name labels**: Reference shows white name at card bottom
7. **No skill count badges**: Reference shows a numbered badge top-right of each card
8. **No selection gold glow**: Reference highlights selected card with gold border glow
9. **Missing subtitle**: "点击头像可更换武将" not present
10. **Entire skill section absent**: ~70% of the screen below cards is blank cream background
11. **Wrong bottom bar**: Reference has gold-accented audio player (play button + progress bar + time); app has dark music player (prev/play/next + "选曲")
12. **Extra FAB button**: Green `#26a69a` "+" button bottom-right → not in reference
13. **Gold accent missing**: Reference uses gold `#d4a843` as primary accent; app has no gold anywhere

---

## SCREEN 2 — Select/选将 (`/select`)

### Actual vs Reference

| Aspect                      | Reference (UI-1.png)                                                       | Actual App (select.png)                                   | Match?            |
| --------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------- |
| **Header background**       | Warm dark `#1a1a1a`–`#2a2a2a`                                              | Cool slate blue `#1f2937`                                 | ❌                |
| **Header back arrow**       | White ←                                                                    | White ←                                                   | ✅                |
| **Header title**            | "选择武将" white                                                           | "选择武将" white                                          | ✅                |
| **Header filter icon**      | White funnel ▼                                                             | White funnel icon                                         | ✅                |
| **Tab bar background**      | Dark `#2a2a2a`–`#333333`                                                   | **White** `#ffffff`                                       | ❌❌              |
| **Tab bar selected color**  | Gold `#d4a843`                                                             | **Green** `#10b981`                                       | ❌❌              |
| **Tab bar unselected text** | Light gray `#999`–`#aaa`                                                   | Medium gray `#666`                                        | ❌                |
| **Tab underline**           | Gold line, 2-3px                                                           | Green line, ~2px, `#10b981`                               | ❌                |
| **Tab items**               | 全部 魏 蜀 吴 群                                                           | 全部 魏 蜀 吴 群                                          | ✅                |
| **Search bar background**   | Dark gray `#3a3a3a`–`#404040`                                              | Light gray `#f3f4f6`                                      | ❌❌              |
| **Search bar border**       | Subtle lighter gray 1px                                                    | **No visible border** (pill shape)                        | ❌                |
| **Search bar text**         | "搜索武将名你" gray `#888`                                                 | "搜索武将名字"                                            | ❌ (text differs) |
| **Search bar shape**        | Rounded ~8px                                                               | Fully rounded pill ~20dp                                  | ❌                |
| **Main content BG**         | Cream `#f5f0e6`                                                            | Cream `#f5f0e8`                                           | ✅ (near match)   |
| **Character grid**          | 4 columns, scrollable                                                      | 4 columns, scrollable                                     | ✅                |
| **Character cards**         | Full-bleed portraits                                                       | Full-bleed portraits                                      | ✅                |
| **Card layout**             | ~75×75px square-ish                                                        | ~80×90dp portrait                                         | ⚠️ slight         |
| **Card spacing**            | 10-12px gaps                                                               | 4-6px gaps (tighter)                                      | ❌                |
| **Name labels**             | White text, bottom, bold, ~12sp                                            | White text, bottom, bold                                  | ✅                |
| **Name bg gradient**        | Semi-transparent dark overlay                                              | Semi-transparent dark gradient                            | ✅                |
| **Selection indicator**     | Top-right: green filled circle ✓ for selected, gray outline for unselected | Top-right: gray circle outline (**all unselected** shown) | ❌                |
| **Selected check count**    | ~8-9 characters with green checkmarks                                      | **No green checks visible**                               | ❌                |
| **Bottom summary bar**      | Dark bg, "已选择 8/8" + green dot + gold "确定" button                     | **Not visible** (off-screen, page scrolls)                | ❌                |
| **Gold accent**             | Gold for selected tab, buttons                                             | **No gold** — green accent instead                        | ❌❌              |
| **Background cream**        | `#f5f0e6`                                                                  | `#f5f0e8`                                                 | ✅ (near exact)   |

### Itemized Differences (Select Page)

1. **Header BG color wrong**: `#1f2937` (cool slate blue) vs warm dark charcoal in reference
2. **Tab bar completely inverted**: Reference has DARK tab bar (`#2a2a2a`–`#333333`) with gold text; app has WHITE tab bar (`#ffffff`) with gray text
3. **Tab accent color wrong**: Reference uses GOLD `#d4a843` for selected tab; app uses GREEN `#10b981`
4. **Tab underline wrong**: Green underline vs gold underline
5. **Tab text color for unselected**: `#666` (medium gray) vs `#999`–`#aaa` (light gray)
6. **Search bar inverted**: Reference uses DARK search bar (`#3a3a3a`–`#404040`); app uses LIGHT gray (`#f3f4f6`)
7. **Search bar shape**: Pill shape vs rounded rectangle in reference
8. **Search placeholder text**: "搜索武将名字" vs "搜索武将名你" (typo or abbreviation difference)
9. **Card grid spacing tighter**: ~4-6px gaps vs ~10-12px in reference
10. **No selected state indicators**: All characters show gray outline circles (none selected). Reference shows ~8 characters with green filled checkmarks
11. **Bottom selection bar missing**: "已选择 8/8" with green dot and gold "确定" button not visible in screenshot (page scrolls, but should be sticky)
12. **No gold accent anywhere**: The reference uses gold as the primary accent color throughout this screen

---

## Priority Ranking (What to Fix First)

### P0 — Critical (foundation)

| #   | Issue                               | Screen | Why                                                                                                                                  |
| --- | ----------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Home page is 85% empty**          | Home   | The reference shows a fully populated character grid + skills section. The app only shows empty card slots. This is the biggest gap. |
| 2   | **Missing character cards on home** | Home   | Need character portraits, names, gold borders, selection glow                                                                        |
| 3   | **Missing skill section**           | Home   | ~70% of screen below cards is blank; reference shows skill buttons                                                                   |
| 4   | **Tab bar color inversion**         | Select | Reference has dark tabs with gold accent; app has white tabs with green accent — completely wrong color scheme                       |

### P1 — High (visual identity)

| #   | Issue                                   | Screen | Why                                                                       |
| --- | --------------------------------------- | ------ | ------------------------------------------------------------------------- |
| 5   | **Gold accent missing everywhere**      | Both   | Gold `#d4a843` is the primary brand accent — app uses green/teal instead  |
| 6   | **Header "已选 8/8" missing**           | Home   | Selection count is a key UI element                                       |
| 7   | **Search bar inverted (light vs dark)** | Select | Completely different visual treatment                                     |
| 8   | **Tab accent green instead of gold**    | Select | Changes the entire color identity                                         |
| 9   | **Header darker/warmer color**          | Both   | `#1f2937` is cool slate; reference is warmer charcoal `#1a1a1a`–`#2a2a2a` |

### P2 — Medium (details)

| #   | Issue                                 | Screen | Why                                                                |
| --- | ------------------------------------- | ------ | ------------------------------------------------------------------ |
| 10  | **Home bottom bar wrong type**        | Home   | Music player vs audio player with progress bar                     |
| 11  | **Green FAB button is extra**         | Home   | Not in reference — decide whether to keep or remove                |
| 12  | **Card spacing too tight on select**  | Select | 4-6px vs 10-12px in reference                                      |
| 13  | **No selection checkmarks on select** | Select | Gray outlines only; no green checks shown                          |
| 14  | **Bottom selection bar not visible**  | Select | Should be sticky/tab-bar-like at bottom                            |
| 15  | **Tab text color wrong shade**        | Select | `#666` vs `#999`                                                   |
| 16  | **Search bar shape incorrect**        | Select | Pill vs rounded rectangle                                          |
| 17  | **Card grid orientation on home**     | Home   | Reference: 2 rows × 4 cols (landscape cards); App: 4 rows × 2 cols |

### P3 — Low (polish)

| #   | Issue                               | Screen | Why                              |
| --- | ----------------------------------- | ------ | -------------------------------- |
| 18  | **Search placeholder text differs** | Select | "搜索武将名字" vs "搜索武将名你" |
| 19  | **Missing subtitle text**           | Home   | "点击头像可更换武将" not present |
| 20  | **Home card dashed borders**        | Home   | Should be solid gold             |

---

## Color Palette Comparison

| Role                       | Reference                                      | App                                                        | Match                   |
| -------------------------- | ---------------------------------------------- | ---------------------------------------------------------- | ----------------------- |
| **Header BG**              | `#1a1a1a`–`#2a2a2a` (warm charcoal)            | `#1f2937` (cool slate blue)                                | ❌                      |
| **Main BG**                | `#f5f0e6` (warm cream)                         | `#f5f0e8` (warm cream)                                     | ✅ near-exact           |
| **Primary accent**         | `#d4a843` (gold)                               | `#10b981` (green, select tab) / `#26a69a` (teal, home FAB) | ❌                      |
| **Card border (selected)** | `#c9a84c` gold glow                            | N/A (no cards)                                             | ❌                      |
| **Card border (default)**  | `#9a7b4f` dark gold                            | `#d1d5db` light gray                                       | ❌                      |
| **Tab bar BG**             | `#2a2a2a`–`#333333` (dark)                     | `#ffffff` (white)                                          | ❌                      |
| **Search bar BG**          | `#3a3a3a`–`#404040` (dark)                     | `#f3f4f6` (light gray)                                     | ❌                      |
| **Search text**            | `#888` gray                                    | ~`#9ca3af` gray                                            | ⚠️ close but bg differs |
| **Bottom bar BG**          | `#1a1a1a`–`#252525`                            | `#171717`–`#1a1a1a`                                        | ⚠️ close                |
| **Button BG**              | Gold `#d4a843` (select) / dark `#333` (skills) | Green `#26a69a` (FAB)                                      | ❌                      |
| **Selection indicator**    | Green filled `#4caf50` ✓                       | Gray outline `#999` ○                                      | ❌                      |

---

## Methodology

1. Started dev server on `http://localhost:5199/`
2. Launched Playwright (Chromium 1228) with viewport 390×844
3. Navigated to `/` → screenshot `home.png`
4. Navigated to `/select` → screenshot `select.png`
5. Analyzed reference `UI-1.png` via `look_at` tool (detailed visual description)
6. Analyzed both screenshots via `look_at` tool + pixel-level color sampling
7. Pixel measurements: `#1f2937` header, `#f5f0e8` main bg, `#10b981` tab accent, `#ffffff` tab bar, `#f3f4f6` search bar
8. Home page: 85.1% blank background, only 14.9% content pixels
9. Select page: 80.5% content pixels (much richer)
