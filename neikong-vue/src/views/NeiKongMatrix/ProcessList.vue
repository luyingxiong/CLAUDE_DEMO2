<script setup>
// 职责：字母索引 + 分组列表，纯展示；点击流程跳转详情
import { useRouter } from 'vue-router'

defineProps({
  groups: { type: Array, required: true },
  indexList: { type: Array, required: true },
})

const router = useRouter()

function onItemClick(item) {
  router.push({ path: `/matrix/flow/${item.code}`, query: { name: item.name } })
}
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
          @click="onItemClick(item)"
        />
      </template>
    </van-index-bar>
    <van-empty v-else description="未找到相关流程" />
  </div>
</template>
