<script setup>
// 职责：字母索引 + 分组列表，纯展示
defineProps({
  groups: { type: Array, required: true },
  indexList: { type: Array, required: true },
})
</script>

<template>
  <div>
    <van-index-bar v-if="groups.length" :index-list="indexList" sticky>
      <template v-for="group in groups" :key="group.letter">
        <van-index-anchor :index="group.letter" />
        <van-cell
          v-for="item in group.items"
          :key="item.code"
          :title="item.name"
          :label="item.code"
          is-link
        />
      </template>
    </van-index-bar>
    <van-empty v-else description="未找到相关流程" />
  </div>
</template>
