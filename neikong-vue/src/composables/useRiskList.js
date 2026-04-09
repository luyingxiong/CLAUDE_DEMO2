import { ref, computed } from 'vue'
import { fetchRiskList } from '@/api/matrix'

const PAGE_SIZE = 5

export function useRiskList(code) {
  const riskItems = ref([])
  const columns = ref([])
  const processName = ref('')
  const pageNum = ref(1)
  const loading = ref(false)
  const finished = ref(false)
  const error = ref(null)

  const pageTitle = computed(() =>
    processName.value ? `${processName.value}基本控制流程` : '控制流程详情'
  )

  // van-list 触底时调用；van-list 自身保证 loading=true 期间不重复触发
  async function loadMore() {
    if (finished.value) return
    loading.value = true
    error.value = null
    try {
      const data = await fetchRiskList(code, { pageNum: pageNum.value, pageSize: PAGE_SIZE })
      if (pageNum.value === 1) {
        processName.value = data.processName
        columns.value = data.columns ?? []
      }
      riskItems.value.push(...data.riskItems)
      if (riskItems.value.length >= data.total) {
        finished.value = true
      } else {
        pageNum.value++
      }
    } catch (e) {
      error.value = e.message
      // 加载失败时允许 van-list 重试
      finished.value = false
    } finally {
      loading.value = false
    }
  }

  return { riskItems, columns, pageTitle, loading, finished, error, loadMore }
}
