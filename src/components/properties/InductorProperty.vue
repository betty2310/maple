<template>
  <div class="flex items-center justify-between mx-4">
    <label for="input-field" class="mr-2">Inductance</label>
    <div class="relative">
      <input
        type="number"
        id="input-field"
        class="px-3 py-2 input input-bordered w-auto"
        v-model="inductance"
        @change="handleUpdate"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">H</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCircuitStore from '@/stores/circuitStore'
import type { InductorData } from '@/types'

const props = defineProps<InductorData>()

const inductance = ref(props.inductance)
watch(
  () => props.inductance,
  (value) => {
    inductance.value = value
  }
)

const circuitStore = useCircuitStore()

function handleUpdate() {
  const node = circuitStore.getSelectedNode()
  if (!node) return
  node.data.inductance = inductance.value
}
</script>
