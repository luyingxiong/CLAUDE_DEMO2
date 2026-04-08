<script setup>
import { computed } from 'vue'

const props = defineProps({
  details: { type: Object, required: true },
})

const fields = computed(() => [
  { label: '风险点名称', value: props.details.riskName },
  { label: '控制措施描述', value: props.details.controlMeasure },
  { label: '执行控制的层级', value: props.details.controlLevel },
  { label: '总部牵头部门', value: props.details.headDeptHQ },
  { label: '省公司牵头部门', value: props.details.headDeptProvince },
  { label: '地市公司牵头部门', value: props.details.headDeptCity },
  { label: '县支公司牵头部门', value: props.details.headDeptCounty },
  { label: '控制制度名称', value: props.details.controlSystem },
  { label: '控制制度描述', value: props.details.controlDesc },
])
</script>

<template>
  <div class="detail-panel">
    <div v-for="field in fields" :key="field.label" class="detail-item">
      <div class="accent" />
      <div class="content">
        <div class="label">{{ field.label }}</div>
        <div class="value">{{ field.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-panel {
  background: #f9fbff;
  border-bottom: 1px solid var(--border);
  padding: 12px 16px;
}
.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}
.detail-item:last-child { margin-bottom: 0; }
.accent {
  width: 3px;
  min-height: 36px;
  background: var(--primary);
  border-radius: 2px;
  flex-shrink: 0;
}
.label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 2px;
}
.value { font-size: 13px; color: var(--text-primary); }
</style>
