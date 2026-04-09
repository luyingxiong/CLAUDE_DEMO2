<script setup>
import { ref, computed, onMounted } from 'vue'
import OptionItem from './OptionItem.vue'
import FeedbackPanel from './FeedbackPanel.vue'
import { useQuiz } from '@/composables/useQuiz'
import { fetchTodayQuestion } from '@/api/quiz'

// 当天日期（格式：2026年4月9日 周三）
const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const todayStr = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${WEEKDAYS[d.getDay()]}`
})

// 题目数据
const question = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    question.value = await fetchTodayQuestion()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const { selected, isAnswered, feedbackText, feedbackType, showExplanation, selectOption, submit, viewAnswer } = useQuiz(question)
</script>

<template>
  <div class="view">
    <van-nav-bar title="每日一题" :border="true">
      <template #right>
        <van-icon name="ellipsis" size="18" color="#86909C" />
      </template>
    </van-nav-bar>
    <div class="scroll-area">
      <van-loading v-if="loading" type="spinner" class="loader" />
      <van-empty v-else-if="error" :description="error" image="error" />
      <div v-else class="quiz-card">
        <!-- 头部：日期 -->
        <div class="quiz-header">
          <span class="date">{{ todayStr }}</span>
        </div>

        <div class="body">
          <!-- 题干 -->
          <p class="question-text">{{ question.text }}</p>

          <!-- 选项列表 -->
          <div class="option-list">
            <option-item
              v-for="opt in question.options"
              :key="opt.label"
              :option="opt"
              :selected="selected"
              :is-answered="isAnswered"
              :correct-answer="question.answer"
              @select="selectOption"
            />
          </div>

          <!-- 反馈区 -->
          <feedback-panel v-if="isAnswered" :text="feedbackText" :type="feedbackType" />

          <!-- 操作按钮 -->
          <div class="actions">
            <van-button type="primary" block :disabled="isAnswered" @click="submit">
              提交答案
            </van-button>
            <van-button plain block :disabled="isAnswered" @click="viewAnswer">
              查看答案
            </van-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 答案解析抽屉 -->
    <van-popup
      v-model:show="showExplanation"
      position="bottom"
      round
      :style="{ height: '65%' }"
    >
      <div class="drawer">
        <div class="drawer-header">
          <span class="drawer-title">答案解析</span>
          <van-icon name="cross" size="18" class="drawer-close" @click="showExplanation = false" />
        </div>
        <div class="drawer-body">
          <p v-for="(para, i) in question.explanation.split('\n\n')" :key="i" class="para">
            {{ para }}
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
.view {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-page);
}
.scroll-area {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 16px 32px;
}
.loader {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}
.quiz-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.quiz-header {
  padding: 14px 20px;
  border-bottom: 1px solid #f2f3f5;
}
.date { font-size: 13px; color: var(--text-muted); }

.body { padding: 20px 20px 24px; }
.question-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.7;
  margin-bottom: 20px;
}
.option-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }

.actions { display: flex; gap: 12px; }
.actions .van-button { flex: 1; }

.drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.drawer-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f2f3f5;
}
.drawer-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}
.drawer-close { color: var(--text-muted); }
.drawer-body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 20px 32px;
}
.para {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-primary);
  margin-bottom: 16px;
  white-space: pre-line;
}
.para:last-child { margin-bottom: 0; }
</style>
