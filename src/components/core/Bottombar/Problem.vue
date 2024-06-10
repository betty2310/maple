<template>
  <div
    v-if="message !== ''"
    class="text-sm bg-destructive text-destructive-foreground p-2 rounded-md mx-2"
  >
    {{ message }}
  </div>
</template>
<script setup lang="ts">
import { useSimulationResponseStore } from '@/stores/simulationResponseStore'
import { ref, watch } from 'vue'
const message = ref('')
const simulationResponseStore = useSimulationResponseStore()
const statusCode = simulationResponseStore.statusCode

const parserStatusCode = (statusCode: number | null) => {
  switch (statusCode) {
    case 501:
      return 'No export nodes provided'
    case 502:
      return 'The circuit must have a voltage source'
    case 503:
      return 'Unknown error occurred while simulating the circuit'
    case null:
      return ''
    default:
      return 'Unknown error'
  }
}

message.value = parserStatusCode(statusCode)
watch(
  () => simulationResponseStore.statusCode,
  (value) => {
    message.value = parserStatusCode(value)
  }
)
</script>
