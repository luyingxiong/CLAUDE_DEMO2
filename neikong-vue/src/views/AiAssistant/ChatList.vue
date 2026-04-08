<script setup>
import { ref, nextTick } from 'vue'
import ChatMessage from './ChatMessage.vue'

// 职责：消息列表容器，暴露 scrollToBottom 方法供父组件调用
defineProps({
  messages: { type: Array, required: true },
})

const scrollEl = ref(null)

function scrollToBottom() {
  nextTick(() => {
    if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight
  })
}

defineExpose({ scrollToBottom })
</script>

<template>
  <div class="chat-scroll" ref="scrollEl">
    <chat-message v-for="(msg, i) in messages" :key="i" :message="msg" />
  </div>
</template>

<style scoped>
.chat-scroll {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 16px 8px;
  background: #f5f7fa;
}
</style>
