<script setup>
// 职责：展示详情列（columns[3+]），字段定义由父组件传入
defineProps({
  item: { type: Object, required: true },
  columns: { type: Array, required: true },
})
</script>

<template>
  <div class="detail-panel">
    <div v-for="col in columns" :key="col.key" class="detail-item">
      <div class="accent" />
      <div class="content">
        <div class="label">{{ col.label }}</div>
        <div class="value">{{ item[col.key] }}</div>
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
