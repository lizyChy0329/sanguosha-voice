<script setup>
import { ref, watch } from "vue";
import SkillButton from "./SkillButton.vue";

const props = defineProps({
  characterId: String,
  character: Object,
  visible: Boolean,
});

const emit = defineEmits(["playSkill", "closed"]);

const transitioning = ref(false);

watch(
  () => props.character,
  (newChar, oldChar) => {
    if (newChar && oldChar && newChar !== oldChar && props.visible) {
      transitioning.value = true;
    }
  },
);

function onAfterLeave() {
  transitioning.value = false;
  emit("closed");
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
    @after-leave="onAfterLeave"
  >
    <div
      v-if="visible && !transitioning && character"
      class="rounded-xl bg-[#f7f2ec] shadow-sm overflow-hidden"
    >
      <div class="px-4 pt-3.5 pb-3">
        <div class="flex items-baseline gap-1.5 mb-2.5">
          <span class="text-sm font-bold text-[#3D352C]">{{ character.name }}</span>
          <span class="text-[13px] text-[#3D352C] font-normal">技能</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <SkillButton
            v-for="(skill, index) in character.skills"
            :key="skill[0]"
            :skillId="skill[0]"
            :skillName="skill[1]"
            :characterId="characterId"
            :faction="character.group"
            :isFirst="index === 0"
            @play="emit('playSkill', $event, characterId)"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>
