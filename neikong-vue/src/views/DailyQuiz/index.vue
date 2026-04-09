<script setup>
import OptionItem from './OptionItem.vue'
import FeedbackPanel from './FeedbackPanel.vue'
import { useQuiz } from '@/composables/useQuiz'

const question = {
  date: '2024年10月31日 周四',
  day: 25,
  text: '在投保前投经过程中，对于投资人年龄超过60周岁的领单，应进行_复核，并重点关注其健康状况。',
  answer: 'A',
  answerText: '额外核验',
  options: [
    { label: 'A', text: '额外核验' },
    { label: 'B', text: '申请核查' },
    { label: 'C', text: '补齐审核' },
    { label: 'D', text: '上报审批' },
  ],
}

const { selected, isAnswered, feedbackText, feedbackType, selectOption, submit, viewAnswer } =
  useQuiz(question)
</script>

<template>
  <div class="view">

    <div class="scroll-area">
      <div class="quiz-card">
        <!-- 头部：日期 + 天数 -->
        <div class="quiz-header">
          <span class="date">{{ question.date }}</span>
          <span class="day">第{{ question.day }}天</span>
        </div>

        <div class="body">
          <!-- 题干 -->
          <p class="question-text">{{ question.text }}</p>

          <!-- 选项列表（props-down / events-up）-->
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
.quiz-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.quiz-header {
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f3f5;
}
.date { font-size: 13px; color: var(--text-muted); }
.day  { font-size: 13px; font-weight: 600; color: var(--primary); }

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
</style>
