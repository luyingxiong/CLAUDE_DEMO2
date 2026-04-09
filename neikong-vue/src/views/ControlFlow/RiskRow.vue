<script setup>
import { ref } from 'vue'
import DetailPanel from './DetailPanel.vue'

// 职责：单行数据展示 + 本地展开/收起状态；列定义由父组件传入
const props = defineProps({
  item: { type: Object, required: true },
  summaryColumns: { type: Array, required: true },
  detailColumns: { type: Array, required: true },
})

const isExpanded = ref(false)

function toggle() {
  isExpanded.value = !isExpanded.value
}

const gridStyle = () => ({
  gridTemplateColumns: props.summaryColumns.map(c => `${c.flex}fr`).join(' '),
})
</script>

<template>
  <div>
    <div class="row" :style="gridStyle()" @click="toggle">
      <div v-for="col in summaryColumns" :key="col.key" class="cell">
        {{ item[col.key] }}
      </div>
    </div>
    <detail-panel v-if="isExpanded" :item="item" :columns="[...summaryColumns, ...detailColumns]" />
  </div>
</template>

<style scoped>
.row {
  display: grid;
  border-bottom: 1px solid #f2f3f5;
  cursor: pointer;
  transition: background 0.15s;
}
.row:active { background: #f9fbff; }
.cell {
  padding: 10px 6px;
  font-size: 12px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
