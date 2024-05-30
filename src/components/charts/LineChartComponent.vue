<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import type { ChartData } from '@/types';

const props = defineProps<{
  response: ChartData[] | null
  responseKeys: string[]
}>()
</script>

<template>
  <LineChart v-if="props.response != null" :data="props.response" index="input" :categories="props.responseKeys" />
</template>