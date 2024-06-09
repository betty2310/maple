<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import type { ChartData } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  response: ChartData[] | null
  responseKeys: string[]
}>()

const headers = computed(() => {
  return props.responseKeys.filter((key) => key !== 'input')
})
</script>

<template>
  <LineChart
    v-if="props.response != null"
    :data="props.response"
    index="input"
    :categories="headers"
  />
</template>
