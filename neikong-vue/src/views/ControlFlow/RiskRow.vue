<script setup>
import { ref } from 'vue'
import DetailPanel from './DetailPanel.vue'

// 职责：单行数据展示 + 本地展开/收起状态
const props = defineProps({
  item: { type: Object, required: true },
})

const isExpanded = ref(false)

function toggle() {
  if (!props.item.details) return
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div>
    <div class="row" :class="{ clickable: !!item.details }" @click="toggle">
      <div class="cell cell-name">
        <span class="cell-text" :class="{ placeholder: !item.real }">{{ item.riskName }}</span>
        <van-icon
          v-if="item.details"
          name="arrow-down"
          size="12"
          class="arrow"
          :class="{ expanded: isExpanded }"
        />
      </div>
      <div class="cell" :class="{ placeholder: !item.real }">{{ item.controlMeasure }}</div>
      <div class="cell" :class="{ placeholder: !item.real }">{{ item.controlLevel }}</div>
    </div>
    <detail-panel v-if="isExpanded && item.details" :details="item.details" />
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  border-bottom: 1px solid #f2f3f5;
  transition: background 0.15s;
}
.row.clickable { cursor: pointer; }
.row.clickable:active { background: #f9fbff; }
.cell {
  padding: 10px 6px;
  font-size: 12px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cell-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
.cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}
.placeholder { color: #c9cdd4; }
.arrow {
  flex-shrink: 0;
  color: #c9cdd4;
  transition: transform 0.2s;
}
.arrow.expanded { transform: rotate(180deg); }
</style>
