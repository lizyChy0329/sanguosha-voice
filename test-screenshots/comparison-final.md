# Final Visual Comparison: Implementation vs Reference (UI-1.png)

Generated: 2026-07-08

## Files Compared

| Item        | File                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| Reference   | `/mnt/c/Users/Administrator/Documents/Obsidian Vault/sanguosha-voice/UI-1.png` |
| Home page   | `test-screenshots/home-final.png` (390×844, 2× DPR)                            |
| Select page | `test-screenshots/select-final.png` (390×844, 2× DPR)                          |

---

## Page 1: Home Page (首屏)

### Gold Theme

| Element                       | Reference                       | Implementation                          | Verdict                                                                                             |
| ----------------------------- | ------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Header title "三国杀语音助手" | Dark text on cream bg (#F5F0E8) | Gold (#C8A641) on dark header (#1A1A1A) | ⚠️ PARTIAL — Title is gold ✅ but header bg is dark ❌ (ref has cream header bg)                    |
| Header background             | Cream (#F5F0E8)                 | Dark gray (#1A1A1A)                     | ❌ DIFFERS — Reference has light cream header integrated with page; we have a solid dark header bar |
| Hamburger icon                | Dark gray                       | White/gold (#FFFFFF/#C8A641)            | ⚠️ Different color but functional                                                                   |
| Settings gear icon            | Dark gray                       | Gold (#C8A641)                          | ✅ Present                                                                                          |
| Counter "已选 0/8"            | Dark text "已选 8/8" on cream   | Gray text on dark                       | ⚠️ Color differs, but empty state expected                                                          |

**Gold color used:** #C8A641 (RGB: 200, 166, 65)
**Reference gold:** ~#C8A96E (RGB: 200, 169, 110)
**Difference:** Our gold has B=65 vs reference's B=110 — our gold is more yellow/olive, less amber/warm.

### Card Battlements & Borders

| Element                       | Reference                                                | Implementation                            | Verdict                                           |
| ----------------------------- | -------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| Card style                    | Square portraits with rounded corners, full-bleed images | Empty dashed-border slots with "+" symbol | ✅ EXPECTED — Empty state, no characters selected |
| Gold borders on selected card | Golden/amber border glow (#C8A96E)                       | N/A — no cards rendered                   | ✅ EXPECTED — Empty state                         |
| Number badges (1,2,3)         | Small circular badges top-right                          | N/A                                       | ✅ EXPECTED — Empty state                         |
| Character names on cards      | White text on dark gradient overlay                      | N/A                                       | ✅ EXPECTED — Empty state                         |

### BGM Player

| Element            | Reference                                        | Implementation                                                        | Verdict                                               |
| ------------------ | ------------------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------- |
| BGM player visible | Play button + progress bar at bottom of Screen 1 | ❌ NOT VISIBLE in screenshot — entire bottom 150px is cream (#F5F0E8) | ❌ BUG — BGM player is not rendering on the home page |
| Play button        | Circular with triangle, dark outline on cream    | Not rendered                                                          | ❌ BUG                                                |
| Progress bar       | Thin horizontal line with dot                    | Not rendered                                                          | ❌ BUG                                                |
| Time display       | "00:00 / 00:04" in gray                          | Not rendered                                                          | ❌ BUG                                                |

### FAB (Floating Action Button)

| Element | Reference               | Implementation            | Verdict                             |
| ------- | ----------------------- | ------------------------- | ----------------------------------- |
| FAB     | Not present on Screen 1 | Not visible in screenshot | N/A — Either not rendered or hidden |

---

## Page 2: Select Page (选择武将)

### Gold Theme

| Element                  | Reference                        | Implementation                                                              | Verdict                                                                        |
| ------------------------ | -------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Back arrow               | White on dark charcoal           | Dark (#1A1A1A) — not visible                                                | ❌ MISSING — Back arrow should be gold or white on dark. Not visible in pixels |
| Title "选择武将"         | White on dark charcoal           | Gold (#C8A641) ✅ at y=50-70                                                | ✅ PRESENT — Gold title                                                        |
| Filter icon (right)      | White on dark charcoal           | Not found as distinct gold element                                          | ⚠️ Not clearly visible                                                         |
| Active tab "全部"        | Golden/amber text + underline    | Gold (#AC903A / #C8A641) at y=70                                            | ✅ PRESENT                                                                     |
| Inactive tabs            | Muted gray text                  | Dark (#2A2A2A) background                                                   | ✅ Expected                                                                    |
| Character names on cards | White text below portrait        | Gold (#C8A641) at y=180, x=60                                               | ✅ PRESENT — Gold names                                                        |
| Confirm button "确定"    | Golden/amber filled rounded rect | ❌ NOT FOUND — bottom area shows blue-ish (#E4E9F8) and gray tones, no gold | ❌ BUG — Confirm button is not gold                                            |

**Select page gold color:** #C8A641 (R=200, G=166, B=65) for names; #AC903A (R=172, G=144, B=58) for tab
**Reference gold:** ~#C8A96E (more amber)

### Card Battlements & Borders

| Element                           | Reference                                        | Implementation                                                   | Verdict                                                           |
| --------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| Card borders                      | Clean, visible on dark bg                        | Subtle dark borders (#2A2A2A / #3A3A3A) — barely distinguishable | ❌ BUG — Card borders should be gold (#C8A641) per the gold theme |
| Gold card borders/battlements     | Golden/amber decorative border on selected cards | ❌ NOT FOUND — all card edges are #2A2A2A (same as background)   | ❌ BUG — Gold card borders/battlements are NOT implemented        |
| Selection indicators (selected)   | Gold circular checkmark top-right                | ❌ NOT FOUND — all dark (#2A2A2A)                                | ❌ BUG — Selected card indicators should show gold checkmarks     |
| Selection indicators (unselected) | Empty gray circle                                | Dark (#2A2A2A) — not distinguishable                             | ❌ BUG — Need visible circle indicators                           |

### BGM Player

| Element    | Reference                  | Implementation | Verdict                                           |
| ---------- | -------------------------- | -------------- | ------------------------------------------------- |
| BGM player | Not visible on select page | Not visible    | ✅ EXPECTED — Select page doesn't show BGM player |

### Playing State Colors

| Element                       | Reference          | Implementation | Verdict                                     |
| ----------------------------- | ------------------ | -------------- | ------------------------------------------- |
| Green/teal playing indicators | Not on select page | Not found      | ✅ EXPECTED — Not applicable on select page |

---

## Summary of Issues

### Critical Bugs

| #   | Issue                                     | Page   | Evidence                                                                                |
| --- | ----------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| 1   | **BGM player not rendering**              | Home   | Entire bottom 150px is cream bg (#F5F0E8) with no audio controls, text, or progress bar |
| 2   | **Gold card borders/battlements missing** | Select | Card edges measure #2A2A2A (same as bg) — no gold decorative borders                    |
| 3   | **Gold confirm button missing**           | Select | Bottom area has blue/gray colors (#E4E9F8, #8D827E), no gold filled button              |
| 4   | **Selection indicators not gold**         | Select | Top-right of cards measure #2A2A2A — should show gold checkmarks for selected           |

### Moderate Issues

| #   | Issue                       | Page   | Evidence                                                                                                                    |
| --- | --------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| 5   | **Header background color** | Home   | Reference has cream (#F5F0E8) header, we have dark (#1A1A1A)                                                                |
| 6   | **Gold color accuracy**     | Both   | Our gold #C8A641 (B=65) vs reference ~#C8A96E (B=110) — our gold is more yellow, less amber/warm. Target should be ~#C8A96E |
| 7   | **Back arrow not visible**  | Select | At x=30, y=30, all pixels are #1A1A1A — back arrow icon not rendered or wrong color                                         |

### Expected Differences (Not Bugs)

| #   | Difference                           | Reason                                                                          |
| --- | ------------------------------------ | ------------------------------------------------------------------------------- |
| 1   | Empty card slots with dashed borders | Home page has no characters selected (0/8) vs reference's populated state (8/8) |
| 2   | No skill section or skill pills      | No character selected, so no skills to show                                     |
| 3   | "已选 0/8" vs "已选 8/8"             | Direct consequence of empty state                                               |
| 4   | No golden glow on cards              | No card selected, so no highlight needed                                        |

---

## Color Reference

| Color Name       | Reference              | Implementation       | Match?                      |
| ---------------- | ---------------------- | -------------------- | --------------------------- |
| Gold accent      | ~#C8A96E (200,169,110) | #C8A641 (200,166,65) | ❌ Too yellow (B=65 vs 110) |
| Tab gold         | ~#C8A96E               | #AC903A (172,144,58) | ❌ Too dark                 |
| Light bg (home)  | #F5F0E8 (245,240,232)  | #F5F0E8 / #F7F5F2    | ✅ Match                    |
| Dark bg (select) | #2C2C2E (44,44,46)     | #1A1A1A (26,26,26)   | ⚠️ Slightly darker          |
| Card area bg     | ~#3A3A3C               | #2A2A2A (42,42,42)   | ✅ Close                    |
| Header bg (home) | #F5F0E8                | #1A1A1A              | ❌ Completely wrong         |

---

## Recommendations

1. **Fix BGM player rendering** on home page — ensure the component mounts and displays at the bottom of the page
2. **Add gold borders/battlements** to character cards on select page — use `border: 2px solid #C8A96E` or similar
3. **Fix confirm button** on select page — should be a gold-filled (#C8A96E) rounded rectangle with white text
4. **Fix selection indicators** — gold checkmarks (✓) for selected, visible gray circles for unselected
5. **Adjust gold color** — add more blue/white to shift from #C8A641 (yellow-gold) toward #C8A96E (amber-gold)
6. **Fix home header background** — change from dark (#1A1A1A) to cream (#F5F0E8) to match reference
7. **Fix back arrow** on select page — ensure it's rendered in gold (#C8A96E) or white
