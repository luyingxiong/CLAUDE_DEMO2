<script setup>
// 职责：输入框 + 发送按钮，props-down / events-up
defineProps({
  modelValue: { type: String, default: '' },
  sending: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'send'])

function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('send')
  }
}
</script>

<template>
  <div class="input-bar">
    <van-field
      :model-value="modelValue"
      placeholder="请输入您关于内控的问题…"
      :disabled="sending"
      clearable
      :border="false"
      class="field"
      @update:model-value="emit('update:modelValue', $event)"
      @keydown="onKeydown"
    />
    <van-button
      type="primary"
      :loading="sending"
      round
      class="send-btn"
      @click="emit('send')"
    >
      <van-icon v-if="!sending" name="guide-o" size="18" />
    </van-button>
  </div>
</template>

<style scoped>
.input-bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #fff;
  border-top: 1px solid var(--border);
}
.field {
  flex: 1;
  background: #f5f7fa;
  border-radius: 20px;
  padding: 0 16px;
}
.send-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  flex-shrink: 0;
}
</style>
