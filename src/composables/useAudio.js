import { Howl } from "howler";
import { CDN_BASE } from "@/constants";

let bgmHowl = null;
let currentBgmId = null;
let bgmVolume = 0.5;

export function useAudio() {
  function audioUrl(type, file) {
    return `${CDN_BASE}/audio/${type}/${file}`;
  }

  function playBGM(id, file, onload) {
    if (currentBgmId === id && bgmHowl) {
      if (bgmHowl.playing()) {
        bgmHowl.pause();
      } else {
        bgmHowl.play();
      }
      return { playing: bgmHowl.playing() };
    }
    if (bgmHowl) {
      bgmHowl.unload();
    }
    currentBgmId = id;
    bgmHowl = new Howl({
      src: [audioUrl("background", file)],
      loop: true,
      volume: bgmVolume,
      html5: true,
      onload: onload || undefined,
    });
    bgmHowl.play();
    return { playing: true };
  }

  function pauseBGM() {
    if (bgmHowl) bgmHowl.pause();
  }

  function resumeBGM() {
    if (bgmHowl && !bgmHowl.playing()) bgmHowl.play();
  }

  function isBGMPlaying() {
    return bgmHowl ? bgmHowl.playing() : false;
  }

  function getBGMProgress() {
    return bgmHowl ? bgmHowl.seek() : 0;
  }

  function getBGMDuration() {
    return bgmHowl ? bgmHowl.duration() : 0;
  }

  function seekBGM(t) {
    if (bgmHowl) bgmHowl.seek(t);
  }

  function setBGMVolume(v) {
    bgmVolume = v;
    if (bgmHowl) bgmHowl.volume(v);
  }

  function getBGMVolume() {
    return bgmVolume;
  }

  function playSkill(skillId, characterId) {
    const urls = [];
    const base = `${CDN_BASE}/audio/skill`;
    urls.push(`${base}/${skillId}_${characterId}1.mp3`);
    urls.push(`${base}/${skillId}_${characterId}2.mp3`);
    urls.push(`${base}/${skillId}1.mp3`);
    urls.push(`${base}/${skillId}2.mp3`);

    function tryUrl(idx) {
      if (idx >= urls.length) return;
      const h = new Howl({
        src: [urls[idx]],
        volume: 0.8,
        html5: true,
        onloaderror: () => {
          h.unload();
          tryUrl(idx + 1);
        },
        onplayerror: () => {
          h.unload();
          tryUrl(idx + 1);
        },
      });
      h.play();
    }
    tryUrl(0);
  }

  function playDie(characterId) {
    const h = new Howl({
      src: [audioUrl("die", `${characterId}.mp3`)],
      volume: 0.8,
      html5: true,
    });
    h.play();
  }

  return {
    playBGM,
    pauseBGM,
    resumeBGM,
    isBGMPlaying,
    setBGMVolume,
    getBGMVolume,
    getBGMProgress,
    getBGMDuration,
    seekBGM,
    playSkill,
    playDie,
    audioUrl,
  };
}
