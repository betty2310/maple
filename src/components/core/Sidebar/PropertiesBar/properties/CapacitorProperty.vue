<template>
  <div class="flex items-center justify-between mx-4">
    <label for="input-field" class="mr-2">Capacitance</label>
    <div class="relative">
      <Input
        type="number"
        id="input-field"
        class="px-3 py-2 input input-bordered w-auto"
        v-model="capacitance"
        @change="handleUpdate"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">F</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCircuitStore from '@/stores/circuitStore'
import type { CapacitorData } from '@/types'
import { Input } from '@/components/ui/input'

const props = defineProps<CapacitorData>()

const capacitance = ref(props.capacitance)
watch(
  () => props.capacitance,
  (value) => {
    capacitance.value = value
  }
)

const circuitStore = useCircuitStore()

function handleUpdate() {
  const node = circuitStore.getSelectedNode()
  if (!node) return
  node.data.capacitance = capacitance.value
}
</script>
