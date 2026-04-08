<script setup>
// 职责：搜索输入框，v-model 双向绑定，events-up
defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <van-search
    :model-value="modelValue"
    placeholder="流程查询"
    background="#fff"
    show-action
    @update:model-value="emit('update:modelValue', $event)"
    @search="emit('update:modelValue', $event)"
    @clear="emit('update:modelValue', '')"
    @cancel="emit('update:modelValue', '')"
  />
</template>
