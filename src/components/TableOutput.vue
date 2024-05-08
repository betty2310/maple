<template>
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>{{ indexRow }}</th>
          <th>V(out)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in outputData" :key="index">
          <td>{{ inputData[index].toFixed(2) }} {{ inputUnit }}</td>
          <td>{{ item.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import useRunStore from '@/stores/runStore'
import useOutputStore from '@/stores/outputStore'
import { SimulationMode } from '@/types'

const outputStore = useOutputStore()
const runStore = useRunStore()

const mode = ref(runStore.mode)
watch(
  () => runStore.mode,
  (value) => {
    mode.value = value
  }
)
const indexRow = computed(function () {
  switch (mode.value) {
    case SimulationMode.Transient:
      return 'Time'
    case SimulationMode.ACSweep:
      return 'Frequency'
    case SimulationMode.DCSweep:
      return 'V(in)'
    default:
      return ''
  }
})
const inputUnit = computed(function () {
  switch (mode.value) {
    case SimulationMode.Transient:
      return 's'
    case SimulationMode.ACSweep:
      return 'Hz'
    case SimulationMode.DCSweep:
      return 'V'
    default:
      return ''
  }
})

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
