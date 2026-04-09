import { ref, isRef } from 'vue'
import { showToast } from 'vant'

/**
 * 答题状态管理，与 UI 完全解耦
 * @param {object | Ref<object>} questionOrRef  题目对象或其 ref
 */
export function useQuiz(questionOrRef) {
  const selected = ref(null)
  const isAnswered = ref(false)
  const feedbackText = ref('')
  const feedbackType = ref('info') // 'success' | 'error' | 'info'
  const showExplanation = ref(false)

  const q = () => (isRef(questionOrRef) ? questionOrRef.value : questionOrRef)

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
    if (selected.value === q().answer) {
      feedbackText.value = `回答正确！正确答案：${q().answerText}`
      feedbackType.value = 'success'
    } else {
      feedbackText.value = `回答错误！正确答案：${q().answerText}`
      feedbackType.value = 'error'
    }
  }

  function viewAnswer() {
    if (isAnswered.value) return
    isAnswered.value = true
    selected.value = q().answer
    feedbackText.value = `正确答案：${q().answerText}`
    feedbackType.value = 'info'
    showExplanation.value = true
  }

  return { selected, isAnswered, feedbackText, feedbackType, showExplanation, selectOption, submit, viewAnswer }
}
