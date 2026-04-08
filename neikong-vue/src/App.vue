<script setup>
// 组合层：提供路由出口 + 底部标签栏导航，无业务逻辑
</script>

<template>
  <div class="app-shell">
    <router-view class="view-area" />
    <van-tabbar route placeholder safe-area-inset-bottom>
      <van-tabbar-item to="/matrix" icon="apps-o">内控矩阵</van-tabbar-item>
      <van-tabbar-item to="/flow" icon="orders-o">控制流程</van-tabbar-item>
      <van-tabbar-item to="/quiz" icon="medal-o">每日一题</van-tabbar-item>
      <van-tabbar-item to="/ai" icon="chat-o">问答助手</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style>
.app-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
/* router-view 渲染的组件撑满剩余高度 */
.view-area {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
