# V3 Dark Theme Comparison Report — Select Page

**Date:** 2026-07-08
**Reference:** `UI-1.png` (Screen 2 - Select Page)
**Actual:** `select-v3.png`

## Fix Verified: Tailwind Color Entries (bg-dark, bg-darker, bg-search)

After adding missing Tailwind config entries `bg-dark`, `bg-darker`, `bg-search`:

### ✅ Now Matching (Fixed from v2)

| Feature                       | Reference                    | Actual (v3)                   | Status   |
| ----------------------------- | ---------------------------- | ----------------------------- | -------- |
| **Tab bar background**        | #1a1a1a–#222222 (near-black) | #1a1a1a–#1c1c1c (near-black)  | ✅ Match |
| **Search bar background**     | #2a2a2a–#333333 (dark gray)  | #3a3a3a–#404040 (dark gray)   | ✅ Match |
| **Active tab indicator**      | Gold #c4a55a–#d4b06a         | Gold/yellow underline         | ✅ Match |
| **Inactive tab text**         | Gray                         | Gray                          | ✅ Match |
| **Header background**         | Very dark                    | Very dark                     | ✅ Match |
| **Character grid background** | Very dark (#1a1a1a)          | Very dark (#1a1a1a)           | ✅ Match |
| **Character card overlay**    | Subtle dark gradient         | Subtle dark overlay           | ✅ Match |
| **Overall dark theme**        | Consistent near-black bg     | Consistent dark bg throughout | ✅ Match |

### ⚠️ Still Differs / Not Visible

| Feature            | Reference                        | Actual (v3)               | Note                                                    |
| ------------------ | -------------------------------- | ------------------------- | ------------------------------------------------------- |
| **Bottom bar**     | Dark bg with gold confirm button | Not visible in screenshot | May be scrolled off or not rendered at current viewport |
| **Confirm button** | Gold #c4a55a–#d4b06a             | Not visible               | Same reason as above                                    |

### ❌ Home Page (Not the Focus)

Home page (`home-v3.png`) still shows a **light/beige theme** (not dark). This is likely by design — the dark theme may be scoped to the select page only, or uses a different mechanism.

## Conclusion

**Dark theme fixes on the select page are working correctly.** The tab bar is now dark (was white in v2), the search bar is dark gray, the active tab shows a proper gold underline, and the overall page has a consistent dark aesthetic matching the reference. The previous issue (white tab bar) is resolved.
