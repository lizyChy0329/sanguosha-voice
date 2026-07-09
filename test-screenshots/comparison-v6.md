# Visual Comparison Report — v6 (Post-Dark Mode Fix)

**Date:** 2026-07-08
**Screenshots:** `home-v6.png`, `select-v6.png`
**Reference:** `UI-1.png` (Obsidian vault)
**Viewport:** 400×868 @2x device scale

---

## Executive Summary

| Page   | Match vs Reference                                     | Severity |
| ------ | ------------------------------------------------------ | -------- |
| Home   | **~40% match** — Color scheme is INVERTED vs reference | CRITICAL |
| Select | **~85% match** — Good dark theme alignment             | LOW      |

**Overall verdict:** The select page is well-aligned with the reference dark theme. The home page has a **critical color scheme inversion** — the reference shows a light/cream home page, while our implementation uses dark mode throughout.

---

## CRITICAL: Home Page Color Scheme Mismatch

The reference `UI-1.png` shows the home screen (Screen ①) with a **light theme**:

| Element         | Reference (UI-1.png)       | Current (home-v6.png)                     | Match?    |
| --------------- | -------------------------- | ----------------------------------------- | --------- |
| Page background | Cream/beige `#F5F0E8`      | Dark `#1A1A1A`                            | **WRONG** |
| Card background | White `#FFFFFF`            | Dark gray `#2A2A2A` (dashed placeholders) | **WRONG** |
| Title text      | Dark brown/black `#333333` | Gold/amber `#C8A96E`                      | **WRONG** |
| Counter text    | Gray `#888888`             | Gold/amber                                | **WRONG** |
| Menu icon       | Dark lines                 | Light lines                               | **WRONG** |
| Settings icon   | Dark                       | Light                                     | **WRONG** |
| BGM player bg   | Light/cream                | Dark gray                                 | **WRONG** |
| BGM play button | Dark circle                | Gold circle                               | **WRONG** |

### What the reference shows for the home page:

- Warm cream/beige page background (`#F5F0E8`)
- White card backgrounds for character portraits
- Dark text for title, counter, and labels
- Light BGM player with dark play button
- Golden accent only on **selected** skill buttons, not on the header

### What our implementation shows:

- Dark `#1A1A1A` page background
- Dark `#2A2A2A` card placeholders (empty, no characters)
- Gold/amber title and counter text
- Dark BGM player with gold play button

### Root cause

Task 7 changed the CSS variables to dark mode:

```css
--color-bg-page: #1a1a1a; /* was #F5F0E8 (cream) */
--color-bg-card: #2a2a2a; /* was #FFFFFF (white) */
--color-text-primary: #ffffff; /* was dark */
```

But the reference design shows the home page should remain **light-themed**. The dark theme is only for the selection page and detail views.

### Suggested fix

The home page needs a **light color scheme** while keeping the selection page dark:

- `--color-bg-page` should be `#F5F0E8` (cream) for home, `#1A1A1A` for select
- OR use a per-page/section approach (light for home, dark for sub-pages)
- OR the home page uses CSS class overrides to revert to light theme

---

## MEDIUM: Empty Card Placeholders vs Populated Grid

| Aspect         | Reference                                   | Current                         |
| -------------- | ------------------------------------------- | ------------------------------- |
| Character grid | 8 characters shown with portraits           | Empty slots with dashed borders |
| Selected count | "已选 8/8"                                  | "已选 0/8"                      |
| Skill buttons  | 4 skills displayed (反馈, 鬼才, 放逐, 觉醒) | None (no character selected)    |
| Hint text      | "点击头像可更换武将" visible                | Not visible (no content)        |

This is expected — the reference is a mockup with pre-populated data, while the app starts empty. **Not a bug**, but the visual density differs significantly.

---

## MEDIUM: BGM Player Styling

| Element        | Reference                  | Current               | Match? |
| -------------- | -------------------------- | --------------------- | ------ |
| Container bg   | Light/cream, subtle shadow | Dark gray `#2A2A2A`   | **NO** |
| Play button    | Dark circle (~40px)        | Gold circle           | **NO** |
| Progress track | Gray thin line             | Gray thin line        | ✅ OK  |
| Time text      | Gray `#888888`             | Light gray `#AAAAAA`  | Close  |
| "选曲" text    | Dark text on light bg      | Light text on dark bg | **NO** |

---

## LOW: Home Page Layout Details

| Element           | Reference    | Current      | Notes              |
| ----------------- | ------------ | ------------ | ------------------ |
| Header height     | ~56px        | ~56px        | ✅ Match           |
| Grid layout       | 2×4          | 2×4 (empty)  | ✅ Match           |
| Card aspect ratio | 1:1 square   | 1:1 square   | ✅ Match           |
| Grid gap          | ~10-12px     | ~12-16px     | ⚠️ Slightly larger |
| Page padding      | ~16px        | ~16px        | ✅ Match           |
| FAB button        | Not visible  | Gold "+" FAB | ⚠️ Extra element   |
| Bottom player     | Fixed bottom | Fixed bottom | ✅ Match           |

---

## Select Page — Good Match ✅

The select page aligns well with the reference:

| Element               | Reference                        | Current             | Match? |
| --------------------- | -------------------------------- | ------------------- | ------ |
| Background            | Dark charcoal `#1A1A1A`-#2A2A2A` | Dark `#1A1A1A`      | ✅     |
| Header                | Dark, white title, back arrow    | Same                | ✅     |
| Tab bar               | Gold active tab underline        | Gold active tab     | ✅     |
| Search bar            | Darker gray `#3A3A3A`            | `#3A3A3A`           | ✅     |
| Character cards       | 4-col grid, dark bg              | 4-col grid, dark bg | ✅     |
| Card art              | Character portraits              | Character portraits | ✅     |
| Bottom bar            | Dark, gold confirm button        | Dark, gold confirm  | ✅     |
| "已选择 X/8" text     | White                            | White               | ✅     |
| "确定" button         | Gold bg, dark text               | Gold bg, dark text  | ✅     |
| Hint "长按可查看技能" | Gray, centered                   | Gray, centered      | ✅     |
| Filter icon           | Gold funnel                      | Gold filter         | ✅     |

### Minor differences on select page:

- Card border-radius may be slightly different (~8px ref vs ~10px current)
- Card gap may be slightly wider in current
- Selection indicator (green checkmark) not visible when 0 selected (expected)

---

## Suggested Priority Fixes

### 1. CRITICAL — Home page light theme (blocks visual match)

The home page CSS needs to use light colors. Options:

- **A.** Revert home page to light theme with CSS variables scoped to the home route
- **B.** Add `.home-light` class that overrides `--color-bg-page`, `--color-bg-card`, text colors
- **C.** Create separate `--color-home-bg`, `--color-home-card` tokens

### 2. MEDIUM — BGM player theme per page

The BGM player should be light-themed on the home page to match reference.

### 3. LOW — Grid gap tuning

Minor spacing adjustments on the home grid.

---

## Current Design Tokens (from `design-tokens.css`)

```css
--color-bg-page: #1a1a1a; /* REF expects #F5F0E8 on home */
--color-bg-card: #2a2a2a; /* REF expects #FFFFFF on home */
--color-gold: #c8a96e; /* ✅ Match */
--color-text-primary: #ffffff; /* REF expects dark on home */
--color-text-secondary: #cccccc; /* REF expects #888888 on home */
--color-text-muted: #999999; /* ✅ Close to ref */
--color-accent-green: #4caf50; /* ✅ Match */
```

---

## Artifacts

| File              | Path                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| Home screenshot   | `test-screenshots/home-v6.png`                                                 |
| Select screenshot | `test-screenshots/select-v6.png`                                               |
| Reference         | `/mnt/c/Users/Administrator/Documents/Obsidian Vault/sanguosha-voice/UI-1.png` |
| This report       | `test-screenshots/comparison-v6.md`                                            |
