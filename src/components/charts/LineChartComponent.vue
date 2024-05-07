<template>
  <v-chart ref="chart" class="chart" :option="chartOption" />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, computed } from 'vue'
import useOutputStore from '@/stores/outputStore'
import type { EChartsOption } from 'echarts'

use([CanvasRenderer, LineChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, 'light')

const outputStore = useOutputStore()
const outputData = ref<number[]>(outputStore.getValue())
const inputData = ref<number[]>(outputStore.getInput())

const chart = ref<InstanceType<typeof VChart> | null>(null)

const chartOption = computed<EChartsOption>(() => ({
  xAxis: {
    type: 'category',
    data: inputData.value,
    name: 'Frequency (Hz)'
  },
  yAxis: {
    type: 'value',
    name: 'Amplitude (dB)'
  },
  series: [
    {
      data: outputData.value,
      type: 'line'
    }
  ]
}))
</script>

<style scoped>
.chart {
  width: 1200px;
  height: 400px;
}
</style>
