import { ref, computed } from 'vue'
import { fetchProcessList } from '@/api/matrix'

export function useProcessList() {
  const searchQuery = ref('')
  const groups = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchProcessList()
      groups.value = data.groups
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const filteredGroups = computed(() => {
    const q = searchQuery.value.trim()
    if (!q) return groups.value
    return groups.value
      .map(g => ({ ...g, items: g.items.filter(i => i.name.includes(q) || i.code.includes(q)) }))
      .filter(g => g.items.length > 0)
  })

  const indexList = computed(() => filteredGroups.value.map(g => g.letter))

  return { searchQuery, filteredGroups, indexList, loading, error, load }
}
