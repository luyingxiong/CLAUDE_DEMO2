import { ref, computed } from 'vue'
import { fetchRiskList } from '@/api/matrix'

export function useRiskList(code) {
  const riskItems = ref([])
  const columns = ref([])
  const processName = ref('')
  const loading = ref(false)
  const error = ref(null)

  const pageTitle = computed(() =>
    processName.value ? `${processName.value}基本控制流程` : '控制流程详情'
  )

  async function load() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchRiskList(code)
      processName.value = data.processName
      columns.value = data.columns ?? []
      riskItems.value = data.riskItems
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { riskItems, columns, pageTitle, loading, error, load }
}
