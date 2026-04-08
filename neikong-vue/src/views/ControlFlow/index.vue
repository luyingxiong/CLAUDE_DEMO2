<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StatusBar from '@/components/StatusBar.vue'
import RiskRow from './RiskRow.vue'
import { findProcessByCode } from '@/composables/useProcessList'

const route = useRoute()
const router = useRouter()

const process = computed(() => findProcessByCode(route.params.code))
const pageTitle = computed(() => process.value ? `${process.value.name}基本控制流程` : '控制流程详情')

function goBack() {
  router.back()
}

const riskItems = [
  {
    id: 1,
    real: true,
    riskName: '精算评估方法不符合会计准则',
    controlMeasure: '精算部和财务部跟踪相关监管机构发布的会计准则等',
    controlLevel: '总公司',
    details: {
      riskName: '精算评估方法不符合会计准则',
      controlMeasure: '精算部和财务部跟踪相关监管机构发布的会计准则等',
      controlLevel: '总公司',
      headDeptHQ: '精算部',
      headDeptProvince: '无',
      headDeptCity: '无',
      headDeptCounty: '无',
      controlSystem: '日常步骤操作',
      controlDesc: '不适用',
    },
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 2,
    real: false,
    riskName: 'xxxxxxxxxx',
    controlMeasure: 'xxxxxxxxxx',
    controlLevel: 'xxxxxxxxxx',
    details: null,
  })),
]
</script>

<template>
  <div class="view">
    <status-bar />
    <van-nav-bar title="" :border="false" left-arrow @click-left="goBack" />
    <div class="scroll-area">
      <div class="page-title">{{ pageTitle }}</div>
      <div class="risk-card">
        <!-- 表头 -->
        <div class="table-header">
          <span>风险点名称</span>
          <span>控制措施描述</span>
          <span>执行控制层级</span>
        </div>
        <!-- 数据行 -->
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
