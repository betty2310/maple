<template>
  <div class="flex items-center justify-between mx-4">
    <label for="input-field" class="mr-2">AC</label>
    <div class="relative">
      <input
        type="number"
        id="input-field"
        class="px-3 py-2 input input-bordered w-auto"
        v-model="AC"
        @change="handleUpdate"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">V</span>
    </div>
  </div>
  <div class="flex items-center justify-between mx-4">
    <label for="input-field" class="mr-2">Frequenccy</label>
    <div class="relative">
      <input
        type="number"
        id="input-field"
        class="px-3 py-2 input input-bordered w-auto"
        v-model="freq"
        @change="handleUpdate"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">Hz</span>
    </div>
  </div>
  <div class="flex items-center justify-between mx-4">
    <label for="input-field" class="mr-2">Phase</label>
    <div class="relative">
      <input
        type="number"
        id="input-field"
        class="px-3 py-2 input input-bordered w-auto"
        v-model="phase"
        @change="handleUpdate"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">°</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCircuitStore from '@/stores/circuitStore'
import type { ACVoltageSourceData } from '@/types'

const props = defineProps<ACVoltageSourceData>()

const AC = ref(props.VA)
watch(
  () => props.VA,
  (value) => {
    AC.value = value
  }
)

const freq = ref(props.Freq)

const phase = ref(props.Phase)

watch(
  () => props.Freq,
  (value) => {
    freq.value = value
  }
)

watch(
  () => props.Phase,
  (value) => {
    phase.value = value
  }
)

const circuitStore = useCircuitStore()

function handleUpdate() {
  const node = circuitStore.getSelectedNode()
  if (!node) return
  node.data.VA = AC.value
  node.data.Freq = freq.value
  node.data.Phase = phase.value
}
</script>
