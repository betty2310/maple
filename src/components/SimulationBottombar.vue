<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div class="flex space-x-4">
      <button
        v-for="(option, index) in options"
        :key="index"
        class="btn btn-xs"
        :class="{ 'btn-primary': activeOption === option }"
        @click="activeOption = option"
      >
        <ChartBarIcon class="h-4 w-4 text-centre-content" v-if="option === 'Graph'" />
        <TableCellsIcon class="h-4 w-4 text-centre-content" v-if="option === 'Table'" />
        {{ option }}
      </button>
    </div>
    <button class="btn btn-xs" @click="layoutStore.toggleBottomPanel()">
      <XMarkIcon class="h-4 w-4 text-centre-content" />
    </button>
  </div>
  <div class="flex-1 overflow-auto px-4 py-2">
    <LineChartComponent v-if="activeOption === 'Graph'" />
    <TableOutput v-if="activeOption === 'Table'" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { TableCellsIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import useOutputStore from '@/stores/outputStore'
import { useLayoutStore } from '@/stores/layoutStore'
import LineChartComponent from '@/components/charts/LineChartComponent.vue'
import TableOutput from '@/components/TableOutput.vue'

const options = ['Table', 'Graph']
const activeOption = ref('Graph')

const outputStore = useOutputStore()
const layoutStore = useLayoutStore()

const outputData = ref<number[]>(outputStore.getValue())
const inputData = ref<number[]>(outputStore.getInput())

watch(
  () => outputStore.getValue(),
  (value) => {
    outputData.value = value
  }
)

watch(
  () => outputStore.getInput(),
  (value) => {
    inputData.value = value
  }
)
</script>
