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
          <td>{{ inputData[index].toFixed(2) }}</td>
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

const outputStore = useOutputStore()
const runStore = useRunStore()

const indexRow = computed(() => {
  return runStore.getMode() === 1 ? 'Time' : 'DC'
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
