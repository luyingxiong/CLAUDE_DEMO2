<script setup>
import { computed } from 'vue'

// 职责：渲染单条消息（用户 / AI），纯展示
const props = defineProps({
  message: { type: Object, required: true }, // { type, content, time, loading? }
})

const isUser = computed(() => props.message.type === 'user')
</script>

<template>
  <div :class="['msg-row', { user: isUser }]">
    <!-- 头像 -->
    <div :class="['avatar', isUser ? 'user' : 'ai']">
      <van-icon :name="isUser ? 'manager-o' : 'service-o'" size="16" />
    </div>

    <!-- 气泡 -->
    <div class="bubble-wrap">
      <div :class="['bubble', isUser ? 'user' : 'ai']">
        <!-- AI 打字 loading -->
        <div v-if="message.loading" class="typing">
          <span /><span /><span />
        </div>
        <template v-else>{{ message.content }}</template>
      </div>
      <div :class="['time', { right: isUser }]">{{ message.time }}</div>
    </div>
  </div>
</template>

<style scoped>
.msg-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 18px;
}
.msg-row.user { flex-direction: row-reverse; }

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.avatar.ai   { background: var(--primary); color: #fff; }
.avatar.user { background: rgba(22, 93, 255, 0.12); color: var(--primary); }

.bubble-wrap { max-width: 78%; }
.bubble {
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}
.bubble.ai {
  background: #fff;
  color: var(--text-primary);
  border-radius: 0 10px 10px 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.bubble.user {
  background: var(--primary);
  color: #fff;
  border-radius: 10px 0 10px 10px;
}

.time { font-size: 11px; color: var(--text-muted); margin-top: 4px; padding: 0 2px; }
.time.right { text-align: right; }

/* 打字动画 */
.typing {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 20px;
}
.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c9cdd4;
  animation: blink 1.2s infinite;
}
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink {
  0%, 80%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}
</style>
