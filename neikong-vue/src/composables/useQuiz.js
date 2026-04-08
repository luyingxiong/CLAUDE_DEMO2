import { ref } from 'vue'
import { showToast } from 'vant'

/**
 * 答题状态管理，与 UI 完全解耦
 * @param {{ answer: string, answerText: string }} question
 */
export function useQuiz(question) {
  const selected = ref(null)
  const isAnswered = ref(false)
  const feedbackText = ref('')
  const feedbackType = ref('info') // 'success' | 'error' | 'info'

  function selectOption(label) {
    if (isAnswered.value) return
    selected.value = label
  }

  function submit() {
    if (!selected.value) {
      showToast({ message: '请先选择一个答案', position: 'bottom' })
      return
    }
    isAnswered.value = true
    if (selected.value === question.answer) {
      feedbackText.value = `回答正确！正确答案：${question.answerText}`
      feedbackType.value = 'success'
    } else {
      feedbackText.value = `回答错误！正确答案：${question.answerText}`
      feedbackType.value = 'error'
    }
  }

  function viewAnswer() {
    if (isAnswered.value) return
    isAnswered.value = true
    selected.value = question.answer
    feedbackText.value = `正确答案：${question.answerText}`
    feedbackType.value = 'info'
  }

  return { selected, isAnswered, feedbackText, feedbackType, selectOption, submit, viewAnswer }
}
