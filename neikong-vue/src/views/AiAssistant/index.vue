<script setup>
import { ref, watch } from 'vue'
import StatusBar from '@/components/StatusBar.vue'
import ChatList from './ChatList.vue'
import SuggestedQuestions from './SuggestedQuestions.vue'
import ChatInputBar from './ChatInputBar.vue'
import { useChat } from '@/composables/useChat'

const chatListRef = ref(null)
const { messages, inputText, isLoading, sendMessage, selectSuggestion } = useChat()

const suggestions = [
  '销售环节有哪些风险点？',
  '理赔服务的控制措施有哪些？',
  '公共控制措施包括哪些？',
  '个险条线的控制措施有哪些？',
]

// 消息更新时滚动到底部
watch(messages, () => chatListRef.value?.scrollToBottom(), { deep: true })

function onSend() {
  sendMessage(chatListRef)
}

function onSelect(q) {
  selectSuggestion(q)
}
</script>

<template>
  <div class="view">
    <status-bar />
    <van-nav-bar title="AI问答助手" :border="true" />

    <!-- 聊天消息列表 -->
    <chat-list ref="chatListRef" :messages="messages" />

    <!-- 快捷问题 -->
    <suggested-questions :questions="suggestions" @select="onSelect" />

    <!-- 输入栏 -->
    <chat-input-bar v-model="inputText" :sending="isLoading" @send="onSend" />
  </div>
</template>

<style scoped>
.view {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
}
</style>
