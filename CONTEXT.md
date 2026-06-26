# 三国杀音效助手 (Sanguosha Sound Effect Assistant)

A mobile-first PWA for playing character voice lines and background music during in-person Sanguosha ("Kill") card game sessions.

## Language

**Character** (武将):
A game character belonging to a Faction, with Skills and a death sound.
_Avoid_: Hero, person, card

**Faction** (势力):
An allegiance group that a Character belongs to: 魏 (Wei), 蜀 (Shu), 吴 (Wu), 群 (Qun).
_Avoid_: Team, color, faction group

**Skill** (技能):
An ability of a Character, identified by a skill ID and displayed with a Chinese name. Each skill has an associated audio file for its voice line.

**Death Sound** (阵亡):
The audio played when a Character is defeated.

**BGM** (背景音乐):
Background music tracks selected from a playlist, played with loop and volume control.

**Offline Fallback**:
The Service Worker's ability to serve cached assets when the network is unavailable, ensuring the app still loads and functions.

**Pre-download**:
User-initiated download of a Character's audio and image assets to the local cache for offline use, with progress indication.

**Audio Cache**:
Locally stored audio and image assets managed via the Cache API, grouped by Character and Faction, with size tracking and bulk management operations.

**Cache Panel**:
A slide-in drawer (shadcn Sheet) showing per-Faction and per-Character cache status, storage usage, and controls for download/delete operations.
_Avoid_: CacheManager
