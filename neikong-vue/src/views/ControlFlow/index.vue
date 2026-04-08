<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StatusBar from '@/components/StatusBar.vue'
import RiskRow from './RiskRow.vue'
import { useRiskList } from '@/composables/useRiskList'

const route = useRoute()
const router = useRouter()

const { riskItems, pageTitle, loading, error, load } = useRiskList(route.params.code)

onMounted(load)

function goBack() {
  router.back()
}
</script>

<template>
  <div class="view">
    <status-bar />
    <van-nav-bar title="" :border="false" left-arrow @click-left="goBack" />
    <div class="scroll-area">
      <div class="page-title">{{ pageTitle }}</div>

      <van-loading v-if="loading" type="spinner" class="loader" />
      <van-empty v-else-if="error" :description="error" image="error" />
      <div v-else class="risk-card">
        <div class="table-header">
          <span>风险点名称</span>
          <span>控制措施描述</span>
          <span>执行控制层级</span>
        </div>
        <risk-row v-for="item in riskItems" :key="item.id" :item="item" />
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
  padding-bottom: 16px;
}
.page-title {
  padding: 14px 16px 10px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
}
.loader {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}
.risk-card {
  background: #fff;
  border-radius: 8px;
  margin: 0 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.table-header {
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  background: #f2f3f5;
  border-bottom: 1px solid var(--border);
}
.table-header span {
  padding: 8px 6px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.2px;
}
</style>
