<script setup>
// 职责：快捷问题 chips，点击 emit 给父组件
defineProps({ questions: { type: Array, required: true } })
defineEmits(['select'])
</script>

<template>
  <div class="suggestions">
    <button
      v-for="q in questions"
      :key="q"
      class="chip"
      @click="$emit('select', q)"
    >
      {{ q }}
    </button>
  </div>
</template>

<style scoped>
.suggestions {
  flex-shrink: 0;
  padding: 8px 16px 6px;
  background: #fff;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  padding: 5px 12px;
  background: #f5f7fa;
  border-radius: 14px;
  font-size: 12px;
  color: var(--text-primary);
  cursor: pointer;
  border: none;
  outline: none;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.chip:active { background: rgba(22, 93, 255, 0.1); color: var(--primary); }
</style>
