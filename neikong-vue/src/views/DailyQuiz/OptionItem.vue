<script setup>
import { computed } from 'vue'

// 职责：渲染单个选项，根据答题状态决定样式
const props = defineProps({
  option: { type: Object, required: true },  // { label, text }
  selected: { type: String, default: null },
  isAnswered: { type: Boolean, default: false },
  correctAnswer: { type: String, required: true },
})
const emit = defineEmits(['select'])

const isSelected = computed(() => props.selected === props.option.label)
const isCorrect = computed(() => props.isAnswered && props.option.label === props.correctAnswer)
const isWrong = computed(() => props.isAnswered && isSelected.value && !isCorrect.value)
</script>

<template>
  <div
    class="option"
    :class="{ selected: isSelected && !isAnswered, correct: isCorrect, wrong: isWrong }"
    @click="emit('select', option.label)"
  >
    <div class="radio" :class="{ correct: isCorrect, wrong: isWrong }">
      <van-icon v-if="isCorrect" name="success" size="11" color="#fff" />
      <van-icon v-else-if="isWrong" name="cross" size="11" color="#fff" />
    </div>
    <span class="label-text">
      <strong>{{ option.label }}.</strong>&nbsp;{{ option.text }}
    </span>
  </div>
</template>

<style scoped>
.option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.18s;
  -webkit-tap-highlight-color: transparent;
}
.option.selected { border-color: var(--primary); background: rgba(22, 93, 255, 0.05); }
.option.correct  { border-color: var(--success); background: rgba(82, 196, 26, 0.06); }
.option.wrong    { border-color: var(--error);   background: rgba(244, 67, 54, 0.06); }

.radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid #c9cdd4;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s;
}
.radio.correct { border-color: var(--success); background: var(--success); }
.radio.wrong   { border-color: var(--error);   background: var(--error); }

.label-text { font-size: 14px; color: var(--text-primary); line-height: 1.5; }
</style>
