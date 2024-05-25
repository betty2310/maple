<template>
  <div class="flex items-center justify-between mx-4">
    <label for="input-field" class="mr-2">Resistance</label>
    <div class="relative">
      <Input
        type="number"
        id="input-field"
        class="px-3 py-2 input input-bordered w-auto"
        v-model="resistance"
        @change="handleUpdate"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">&Omega;</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import type { ResistorData } from '@/types'
const { updateNode, findNode } = useVueFlow()
import { Input } from '@/components/ui/input'

interface ResistorProperty {
  resistance: number
  id: string
}

const props = defineProps<ResistorProperty>()

const resistance = ref(props.resistance)
watch(
  () => props.resistance,
  (value) => {
    resistance.value = value
  }
)

function handleUpdate() {
  let node = findNode(props.id)
  if (!node) return
  node.data.resistance = resistance.value
  updateNode<ResistorData>(props.id, node)
}
</script>
