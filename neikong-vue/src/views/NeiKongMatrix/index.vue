<script setup>
import { onMounted } from 'vue'
import SearchSection from './SearchSection.vue'
import ProcessList from './ProcessList.vue'
import { useProcessList } from '@/composables/useProcessList'

const { searchQuery, filteredGroups, indexList, loading, error, load } = useProcessList()

onMounted(load)
</script>

<template>
  <div class="view">
    <van-nav-bar title="内控矩阵" :border="true">
      <template #right>
        <van-icon name="ellipsis" size="18" color="#86909C" />
      </template>
    </van-nav-bar>
    <search-section v-model="searchQuery" />
    <div class="scroll-area">
      <van-loading v-if="loading" type="spinner" class="loader" />
      <van-empty v-else-if="error" :description="error" image="error" />
      <process-list v-else :groups="filteredGroups" :index-list="indexList" />
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
}
.loader {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}
</style>
