# Comparison v2: Implementation vs Reference Design

**Date:** 2026-07-08
**Reference:** `UI-1.png` (Obsidian Vault)
**Implementation:** `home-v2.png` (390×844 @2x), `select-v2.png` (390×844 @2x)

---

## Home Page (/) — `home-v2.png` vs Reference Screen ①

### ✅ MATCHES

| Element                    | Detail                                                         |
| -------------------------- | -------------------------------------------------------------- |
| Header title               | "三国杀语音助手" — centered, white text on dark bg             |
| Header hamburger           | Left side hamburger icon (☰) — white                          |
| Header settings gear       | Right side gear icon (⚙) — white                               |
| Header layout              | Left hamburger + center title + right gear — correct structure |
| FAB presence               | Floating action button visible, round, bottom-right position   |
| Bottom nav bar bottom-most | Music controls at bottom of screen in correct position         |

### ❌ STILL DIFFERS

| #   | Element                | Reference Expects                                                                          | Current Implementation                                                              | Severity |
| --- | ---------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------- |
| 1   | **Header background**  | White (#FFFFFF)                                                                            | Black (#000000)                                                                     | HIGH     |
| 2   | **Header counter**     | "已选 8/8" in gray text                                                                    | "已选 0/8" in white text                                                            | HIGH     |
| 3   | **Header text colors** | Title black, counter gray, icons dark                                                      | Title white, counter white, icons white                                             | MEDIUM   |
| 4   | **Character grid**     | 4×2 grid with actual character portraits, colored borders, name overlays, red count badges | 2×4 grid of dashed-border empty placeholders with "+" icon                          | CRITICAL |
| 5   | **Hint text**          | "点击头像可更换武将" in gray (#999) centered below grid                                    | Missing entirely                                                                    | HIGH     |
| 6   | **Skill panel**        | White card with "司马懿 技能" title + 4 skill pills (反馈/鬼才/放逐/觉醒)                  | Missing entirely                                                                    | CRITICAL |
| 7   | **Audio player**       | Circular play button + progress bar + time display                                         | Missing entirely                                                                    | CRITICAL |
| 8   | **Page background**    | White (#FFFFFF)                                                                            | Cream/beige (#F5F5F5)                                                               | MEDIUM   |
| 9   | **FAB purpose**        | Not present in reference home screen — FAB is for the select page workflow                 | FAB is present but shouldn't be on home screen                                      | MEDIUM   |
| 10  | **Bottom nav**         | Not present in reference home screen — reference has skill panel + audio player instead    | Bottom nav with music controls ("选曲", play/pause, time) replaces skill panel area | HIGH     |

### Summary — Home Page

The home page is still showing **empty state** (0 characters, placeholder grid) instead of the **populated state** (8 characters, skill panel, audio player) shown in the reference. This is likely a functional/data issue — without 8 selected characters flowing in from the select page, the home can't render its content. Some styling also needs fixing (header bg, colors).

---

## Select Page (/select) — `select-v2.png` vs Reference Screen ②

### ✅ MATCHES

| Element                 | Detail                                             |
| ----------------------- | -------------------------------------------------- |
| Header back arrow       | ← back arrow, white, left side ✅                  |
| Header title            | "选择武将" in white ✅                             |
| Header filter           | Filter/funnel icon right side ✅                   |
| Tab labels              | 全部 / 魏 / 蜀 / 吴 / 群 — all 5 tabs present ✅   |
| Active tab indicator    | Gold text (#D4A017) + gold underline on "全部" ✅  |
| Search icon             | Magnifying glass (🔍) left of search field ✅      |
| Search placeholder text | "搜索武将名字" (matches reference expectation) ✅  |
| Grid layout             | 4 columns, scrollable with character portraits ✅  |
| Card name labels        | White text overlaid on portraits at bottom edge ✅ |
| Selection indicators    | Top-right circle indicator per card ✅             |
| Character portraits     | Actual Sanguosha character art visible ✅          |

### ❌ STILL DIFFERS

| #   | Element                              | Reference Expects                                                                      | Current Implementation                                                   | Severity           |
| --- | ------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------ |
| 1   | **Header background**                | Dark (#1A1A1A / #222222)                                                               | Black (#000000)                                                          | LOW — close enough |
| 2   | **Tab bar background**               | Dark (#2A2A2A)                                                                         | White/cream (#FFFFFF / #FFFDF5)                                          | HIGH               |
| 3   | **Tab text (inactive)**              | Gray (#888888) on dark bg                                                              | Gray text on white bg                                                    | MEDIUM             |
| 4   | **Search bar background**            | Dark gray (#333333) — search bar is on dark themed page                                | Light beige (#F5F0E6) — search bar looks like it belongs on a light page | HIGH               |
| 5   | **Search bar border-radius**         | Fully rounded (~20px, pill style)                                                      | Slightly rounded (~8dp)                                                  | MEDIUM             |
| 6   | **Selection indicator (selected)**   | Green circle with white checkmark ✓                                                    | Not visible / white circle with border only                              | HIGH               |
| 7   | **Selection indicator (unselected)** | Dark circle outline (empty)                                                            | White semi-transparent circle                                            | MEDIUM             |
| 8   | **Name label color**                 | Gray text, ~12px                                                                       | White text with black stroke/shadow                                      | MEDIUM             |
| 9   | **Bottom bar ("确定" button)**       | Dark bar with "▶ 已选择 8/8" left, "长按可查看技能" subtitle, gold "确定" button right | Not visible — possibly scrolled off or not rendered                      | HIGH               |
| 10  | **Page background**                  | Dark (#1A1A1A)                                                                         | Light cream/beige (#FFF8EE / #FFFDF5)                                    | CRITICAL           |
| 11  | **Card background**                  | Dark (#2A2A2A)                                                                         | Transparent (images fill cards, no bg)                                   | MEDIUM             |

### Summary — Select Page

The select page shows the correct structure (header, tabs, search, grid) but uses an **inverted color theme** — light/cream backgrounds instead of the dark theme shown in the reference. The tab bar, page background, and search bar all need dark theming. Selection indicators need green checkmarks for selected characters.

---

## Overall Assessment

| Metric                          | Count  |
| ------------------------------- | ------ |
| ✅ Matches (home)               | 6      |
| ❌ Differences (home)           | 10     |
| ✅ Matches (select)             | 12     |
| ❌ Differences (select)         | 11     |
| **Total remaining differences** | **21** |

### Critical (must fix before next round):

1. Home page: Character grid shows placeholders, not actual character cards with portraits, badges, borders
2. Home page: Skill panel + audio player missing (empty state vs populated state)
3. Select page: Page/theme is light instead of dark (inverted color scheme)

### Theme consistency issue:

The reference uses two distinct themes:

- **Home page**: Light/white theme (white bg, white header with dark text, white cards)
- **Select page**: Dark theme (#1A1A1A bg, dark header, dark tabs)

The implementation has inverted this: home page has dark header + cream bg, select page has light/cream bg throughout.

### Previous Fixes Status (from v1 report):

- ✅ Design tokens — tabs and active states now use gold (#D4A017)
- ✅ Search bar placeholder text reads "搜索武将名字"
- ❌ Tab bar is light instead of dark
- ❌ Page background inverted
- ❌ Selection indicators lack green checkmarks
