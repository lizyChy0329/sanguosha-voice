# UI Redesign Comparison Report

**Date**: 2026-07-09
**Reference**: UI-1.png (4-screen design spec)
**App Screenshot**: home-redesign.png

---

## Summary

| Element              | Reference (UI-1)       | App (home-redesign.png)  | Match?               |
| -------------------- | ---------------------- | ------------------------ | -------------------- |
| Header background    | Dark teal (#1a2a2a)    | White (rgb(255,255,255)) | ❌                   |
| Header border        | None visible           | 1px solid #e8e8e8        | ❌                   |
| Card background      | #2D2D2D (charcoal)     | #2D2D2D (charcoal)       | ✅                   |
| Selected card border | Gold (#d4a853)         | Gold dashed bar at top   | ⚠️ Partial           |
| Card images          | Character portraits    | SVG placeholders ("?")   | ❌                   |
| Skill buttons        | Visible on main screen | Not on home screen       | ⚠️ Context-dependent |
| BGM play button      | Dark teal circle       | Dark green (#2D7D46)     | ⚠️ Close             |
| BGM progress bar     | Visible                | Gradient overlay         | ⚠️ Different style   |
| Layout               | 4×2 grid, 8 characters | 4×2 grid, 8 characters   | ✅                   |
| Character names      | Visible below cards    | Visible below cards      | ✅                   |

---

## Detailed Analysis

### 1. Header (❌ MISMATCH)

**Reference**: Dark teal/dark green-gray background (~#1a2a2a) with white text
**App**: White background (rgb(255,255,255)) with dark text (#1A1A1A)

The header in the app is white with a light border, while the reference shows a dark teal header. This is a significant visual difference.

### 2. Card Background (✅ MATCH)

**Reference**: Dark charcoal cards
**App**: `bg-[#2D2D2D]` — confirmed matching

The card background color matches the specification at `#2D2D2D`.

### 3. Card Images (❌ MISMATCH)

**Reference**: Character portrait images (e.g., 司马懿, 夏侯惇, etc.)
**App**: All 8 cards show SVG data URI placeholders (fallback "?" images)

The CDN images from `libccy/noname` are not loading. All character avatars are showing as placeholder SVGs.

### 4. Selected Card Border (⚠️ PARTIAL)

**Reference**: Solid gold border (#d4a853) around the selected card
**App**: Gold/yellow dashed decorative bar along the top of cards, not a full border

The gold accent is present but styled differently — as a top-edge decoration rather than a full card border.

### 5. Skill Buttons (⚠️ CONTEXT-DEPENDENT)

**Reference**: Skill buttons visible on the main screen (①)
**App**: 3 buttons found in DOM, but the home screen shows a simpler layout

The reference shows skill buttons on the character detail view, while the home screen has a different interaction model (tap to select, then view skills).

### 6. BGM Player (⚠️ CLOSE)

**Reference**: Dark teal/green circle play button with progress bar
**App**: Dark green (#2D7D46) circle play button with gradient overlay

The play button color is close (dark green vs dark teal). The BGM player uses a gradient overlay (`from-black/60 to-transparent`) rather than a solid progress bar.

### 7. Layout (✅ MATCH)

**Reference**: 4×2 grid with 8 characters
**App**: 4×2 grid with 8 characters

Layout structure matches. Characters displayed:

- Row 1: 曹操, 刘备, 孙权, 诸葛亮
- Row 2: 关羽, 张飞, 吕布, 貂蝉

---

## Key Issues to Address

1. **Header color**: Should be dark teal (#1a2a2a), currently white
2. **CDN images not loading**: Character avatars showing as SVG placeholders
3. **Selected card border**: Should be solid gold border, currently dashed top bar

---

## Recommendation

The app structure and layout are correct. The main issues are:

1. CSS not applying the dark header theme (possibly a Tailwind config issue)
2. CDN image URLs may be incorrect or unreachable

No files were modified during this verification.
