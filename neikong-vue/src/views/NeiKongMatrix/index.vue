<script setup>
import StatusBar from '@/components/StatusBar.vue'
import SearchSection from './SearchSection.vue'
import ProcessList from './ProcessList.vue'
import { useProcessList } from '@/composables/useProcessList'

const { searchQuery, filteredGroups, indexList } = useProcessList()
</script>

<template>
  <div class="view">
    <status-bar />
    <van-nav-bar title="内控矩阵" :border="true">
      <template #right>
        <van-icon name="ellipsis" size="18" color="#86909C" />
      </template>
    </van-nav-bar>
    <search-section v-model="searchQuery" />
    <div class="scroll-area">
      <process-list :groups="filteredGroups" :index-list="indexList" />
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
</style>
