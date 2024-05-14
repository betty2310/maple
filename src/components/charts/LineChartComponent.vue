<template>
  <v-chart ref="chart" :option="chartOption" class="chart" />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { computed, provide, ref, watch } from 'vue'
import useOutputStore from '@/stores/outputStore'
import useRunStore from '@/stores/runStore'
import type { EChartsOption } from 'echarts'
import { SimulationMode } from '@/types'

use([CanvasRenderer, LineChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, 'light')

const outputStore = useOutputStore()
const outputData = ref<number[]>(outputStore.getValue())
const inputData = ref<number[]>(outputStore.getInput())

const runStore = useRunStore()

const mode = ref(runStore.mode)
watch(
  () => runStore.mode,
  (value) => {
    mode.value = value
  }
)

const xAxisTitle = computed(() => {
  switch (mode.value) {
    case SimulationMode.Transient:
      return 'Time (s)'
    case SimulationMode.ACSweep:
      return 'Frequency (Hz)'
    case SimulationMode.DCSweep:
      return 'V(in) (V)'
    default:
      return ''
  }
})

const yAxisTitle = computed(() => {
  switch (mode.value) {
    case SimulationMode.Transient:
      return 'Voltage (V)'
    case SimulationMode.ACSweep:
      return 'Amplitude (dB)'
    case SimulationMode.DCSweep:
      return 'Voltage (V)'
    default:
      return ''
  }
})

const chart = ref<InstanceType<typeof VChart> | null>(null)

const chartOption = computed<EChartsOption>(() => ({
  xAxis: {
    type: 'category',
    data: inputData.value,
    name: xAxisTitle.value
  },
  yAxis: {
    type: 'value',
    name: yAxisTitle.value
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