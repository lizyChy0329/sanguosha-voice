# Visual Comparison Report - v5

**Date**: 2026-07-08  
**Reference**: `/mnt/c/Users/Administrator/Documents/Obsidian Vault/sanguosha-voice/UI-1.png`  
**Implementation**: `home-v5.png` and `select-v5.png` (Playwright screenshots)  
**Viewport**: 400×868 (mobile)

---

## Executive Summary

The **select page** matches the reference very closely. The **home page (ProomView)** has a **critical background color mismatch** — it uses a cream/beige background (#F5F0E8) instead of the reference's dark brown/charcoal (#1A1A1A). This is the single largest visual discrepancy.

---

## Page 1: Home (ProomView) — CRITICAL DIFFERENCES

### 🔴 CRITICAL — Background Color Mismatch

| Aspect             | Reference                                   | Implementation        | Severity     |
| ------------------ | ------------------------------------------- | --------------------- | ------------ |
| Page background    | Dark brown/charcoal `#1A1A1A` to `#2D2620`  | Cream/beige `#F5F0E8` | **BLOCKING** |
| Background texture | Subtle noise/grain texture (parchment-like) | Solid flat color      | **HIGH**     |

**Root Cause**: `design-tokens.css` line 3: `--color-bg-page: #F5F0E8`  
**Reference Expectation**: `--color-bg-page` should be `#1A1A1A` or similar dark tone.

**Fix**: Change `--color-bg-page` to a dark value. The entire app's visual identity hinges on this.

### 🔴 CRITICAL — Header Color Mismatch

| Aspect            | Reference           | Implementation                                  | Severity     |
| ----------------- | ------------------- | ----------------------------------------------- | ------------ |
| Header background | Dark (same as page) | Cream (same as page)                            | **BLOCKING** |
| Header text color | White `#FFFFFF`     | Gold `#C8A96E`                                  | **HIGH**     |
| Header border     | No visible border   | `border-b border-gray-200` (visible light line) | **MEDIUM**   |

**Root Cause**:

- ProomView.vue line 58: `bg-bg-page text-gold` — uses page background (cream) + gold text
- Reference expects: dark background + white text

**Fix**: Header should use `bg-bg-deep-nav` or similar dark token, with white text.

### 🟡 MEDIUM — BGM Player Background

| Aspect            | Reference                             | Implementation                          | Severity   |
| ----------------- | ------------------------------------- | --------------------------------------- | ---------- |
| Player background | Dark (matches page)                   | White/cream `bg-white/90`               | **HIGH**   |
| Player border     | No visible border or subtle dark line | `border-t border-gray-200` (light line) | **MEDIUM** |

**Root Cause**: BGMPlayer.vue line 71: `bg-white/90 backdrop-blur-sm border-t border-gray-200`  
**Reference Expectation**: Dark background matching page, no visible light border.

**Fix**: Change to `bg-bg-dark` or `bg-bg-deep-nav` with dark border.

### 🟡 MEDIUM — Skill Panel Styling

| Aspect                  | Reference              | Implementation                           | Severity   |
| ----------------------- | ---------------------- | ---------------------------------------- | ---------- |
| Skill button background | Cream/beige `#F5F0E8`  | Transparent with faction-colored borders | **MEDIUM** |
| Skill button text       | Dark gray/black        | Faction-colored text                     | **MEDIUM** |
| Skill panel card        | Light/cream background | White card (`bg-card`)                   | **MEDIUM** |

**Root Cause**: SkillPanel.vue uses `bg-card` (white) and SkillButton.vue uses faction colors.  
**Reference Expectation**: Cream/beige pill-shaped buttons with dark text on dark background.

**Fix**: Skill buttons should have cream background (`bg-bg-page` or similar) with dark text, on a dark panel.

### 🟢 LOW — Card Design (Partial Match)

| Aspect                    | Reference                      | Implementation                     | Severity |
| ------------------------- | ------------------------------ | ---------------------------------- | -------- |
| Gold border               | ✅ Present                     | ✅ Present                         | —        |
| Battlements/crenellations | ✅ Present                     | ✅ Present                         | —        |
| Card background           | Dark                           | Transparent/cream (due to page bg) | **LOW**  |
| Name banner               | Dark background with gold text | Gradient overlay with white text   | **LOW**  |

The battlements CSS is correctly implemented. The card borders are correct. The only issue is the background color bleeding through.

### 🟢 LOW — Empty State Placeholders

| Aspect            | Reference                                | Implementation          | Severity |
| ----------------- | ---------------------------------------- | ----------------------- | -------- |
| Placeholder style | Not shown (reference shows 8 characters) | Dashed borders with "+" | **N/A**  |
| Placeholder color | N/A                                      | Gray dashed on cream    | **N/A**  |

The empty state is not visible in the reference (it shows 8 selected characters), so this is not a comparison issue.

---

## Page 2: Select (SelectView) — GOOD MATCH

### ✅ Matches Reference

| Aspect            | Reference                | Implementation                | Match    |
| ----------------- | ------------------------ | ----------------------------- | -------- |
| Background        | Dark `#1A1A1A`           | Dark `bg-bg-dark`             | ✅       |
| Header            | Dark with white text     | Dark with gold text           | ⚠️ Minor |
| Tab bar           | Dark with gold active    | Dark with gold active         | ✅       |
| Search bar        | Dark gray                | Dark gray `bg-bg-search`      | ✅       |
| Card grid         | 4-column dark cards      | 4-column dark cards           | ✅       |
| Card borders      | Gold borders             | Gold borders `border-gold/50` | ✅       |
| Card names        | White text with gradient | White text with gradient      | ✅       |
| Bottom bar        | Dark with gold confirm   | Dark with gold confirm        | ✅       |
| Selection counter | Present                  | Present                       | ✅       |
| Help text         | Present                  | Present                       | ✅       |

### ⚠️ Minor Differences

| Aspect                   | Reference             | Implementation | Severity |
| ------------------------ | --------------------- | -------------- | -------- |
| Header text color        | White                 | Gold           | **LOW**  |
| Tab active indicator     | Orange/gold underline | Gold underline | ✅ Close |
| Card selection indicator | Green checkmark       | Gold checkmark | **LOW**  |

These are minor color variations that don't significantly impact the visual identity.

---

## Detailed Color Comparison

### Design Token Comparison

| Token                    | Reference Value         | Implementation Value  | Status          |
| ------------------------ | ----------------------- | --------------------- | --------------- |
| `--color-bg-page`        | `#1A1A1A` (dark)        | `#F5F0E8` (cream)     | ❌ **MISMATCH** |
| `--color-bg-card`        | `#252525` (dark)        | `#FFFFFF` (white)     | ❌ **MISMATCH** |
| `--color-bg-deep-nav`    | `#1A1A1A`               | `#1A1A1A`             | ✅ Match        |
| `--color-bg-dark`        | `#2A2A2A`               | `#2A2A2A`             | ✅ Match        |
| `--color-gold`           | `#C5A55A` / `#D4AF37`   | `#C8A96E`             | ⚠️ Close        |
| `--color-text-primary`   | `#FFFFFF` (white)       | `#1A1A1A` (dark)      | ❌ **MISMATCH** |
| `--color-text-secondary` | `#B8B0A0` (muted beige) | `#999999` (gray)      | ⚠️ Different    |
| `--color-text-muted`     | `#888888` (gray)        | `#666666` (dark gray) | ⚠️ Different    |

### Key Insight

The implementation has an **inverted color scheme** for the home page:

- **Reference**: Dark background + light text (dark mode)
- **Implementation**: Light background + dark text (light mode)

The select page correctly uses dark mode, creating an inconsistent experience.

---

## Remaining Differences (Ranked by Severity)

### 1. 🔴 CRITICAL — Home Page Background Color

**Location**: `src/styles/design-tokens.css:3`, `src/pages/ProomView.vue:56`  
**Issue**: Cream/beige instead of dark brown  
**Impact**: Fundamentally wrong visual identity  
**Fix**: Change `--color-bg-page` to `#1A1A1A` and update text colors accordingly

### 2. 🔴 CRITICAL — Home Page Text Colors

**Location**: `src/styles/design-tokens.css:37-39`, `src/pages/ProomView.vue:58,68`  
**Issue**: Dark text on light background instead of light text on dark background  
**Impact**: Headers, counters, and all text appear wrong  
**Fix**: Invert text color tokens or add dark-mode variants

### 3. 🟡 HIGH — BGM Player Background

**Location**: `src/components/BGMPlayer.vue:71`  
**Issue**: White/cream background instead of dark  
**Impact**: Player looks disconnected from dark theme  
**Fix**: Use dark background token

### 4. 🟡 MEDIUM — Skill Panel Styling

**Location**: `src/components/SkillPanel.vue:49`, `src/components/SkillButton.vue:64`  
**Issue**: White card with faction-colored buttons instead of cream pills on dark  
**Impact**: Skill area looks like light theme  
**Fix**: Dark panel with cream/beige skill buttons

### 5. 🟢 LOW — Header Text Color

**Location**: `src/pages/ProomView.vue:68`  
**Issue**: Gold text instead of white  
**Impact**: Slightly different aesthetic  
**Fix**: Use white text for header title

### 6. 🟢 LOW — Background Texture

**Location**: `src/styles/design-tokens.css:3`  
**Issue**: Solid color instead of subtle noise/grain  
**Impact**: Less visual depth  
**Fix**: Add CSS noise texture or subtle gradient

---

## What Matches Well

1. ✅ **Select page** — Nearly perfect match
2. ✅ **Gold color** — `#C8A96E` is close to reference `#C5A55A`/`#D4AF37`
3. ✅ **Card battlements** — Crenellation CSS pattern correctly implemented
4. ✅ **Gold borders** — Cards have gold borders as expected
5. ✅ **Typography scale** — Font sizes and weights are appropriate
6. ✅ **Spacing** — Padding and gaps match reference
7. ✅ **Tab system** — Faction tabs with gold active state
8. ✅ **Search bar** — Dark gray with proper styling
9. ✅ **Bottom bar** — Dark with gold confirm button
10. ✅ **Character grid** — 4-column layout correct

---

## Suggested Fix Priority

1. **Phase 1 (Critical)**: Fix `--color-bg-page` and text color tokens
2. **Phase 2 (High)**: Update BGMPlayer background
3. **Phase 3 (Medium)**: Restyle SkillPanel for dark theme
4. **Phase 4 (Low)**: Add background texture, fine-tune header text

---

## Screenshots Analyzed

- **Reference**: `/mnt/c/Users/Administrator/Documents/Obsidian Vault/sanguosha-voice/UI-1.png`
- **Home v5**: `/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/home-v5.png`
- **Select v5**: `/home/wsl-ubuntu24/code/sanguosha-voice/test-screenshots/select-v5.png`

---

## Conclusion

The implementation is **~70% complete** for the home page and **~95% complete** for the select page. The single largest issue is the inverted color scheme on the home page (cream vs dark). Fixing the background color and text tokens will bring the home page to ~90% match. The remaining 10% involves skill panel styling and minor color refinements.
