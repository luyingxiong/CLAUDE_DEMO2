<script setup>
import { computed } from 'vue'

// 职责：答题结果反馈展示，纯展示
const props = defineProps({
  text: { type: String, required: true },
  type: { type: String, default: 'info' }, // success | error | info
})

const icon = computed(() => ({
  success: 'success',
  error: 'cross',
  info: 'info-o',
}[props.type] ?? 'info-o'))
</script>

<template>
  <div :class="['feedback', type]">
    <van-icon :name="icon" size="14" class="icon" />
    {{ text }}
  </div>
</template>

<style scoped>
.feedback {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;
}
.feedback.success { background: #f0fdf4; color: #15803d; }
.feedback.error   { background: #fef2f2; color: #dc2626; }
.feedback.info    { background: #eff6ff; color: #1d4ed8; }
</style>
