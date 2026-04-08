<script setup>
// 纯展示：手机顶部状态栏（时间 + 信号图标）
</script>

<template>
  <div class="status-bar">
    <span class="time">9:41</span>
    <div class="icons">
      <van-icon name="signal" size="13" />
      <van-icon name="wifi-o" size="13" />
      <van-icon name="battery-o" size="13" />
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  flex-shrink: 0;
  background: #fff;
  padding: 5px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-primary);
}
.icons {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
