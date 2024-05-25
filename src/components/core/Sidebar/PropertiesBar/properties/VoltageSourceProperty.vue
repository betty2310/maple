<template>
  <div class="flex items-center justify-between mx-4">
    <label for="input-field" class="mr-2">DC Voltage source</label>
    <div class="relative">
      <Input
        type="number"
        id="input-field"
        class="px-3 py-2 input input-bordered w-auto"
        v-model="dc"
        @change="handleUpdate"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">V</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import type { ResistorData } from '@/types'
import { Input } from '@/components/ui/input'

const { updateNode, findNode } = useVueFlow()

interface VoltageSourceProperty {
  dc: number
  id: string
}

const props = defineProps<VoltageSourceProperty>()

const dc = ref(props.dc)
watch(
  () => props.dc,
  (value) => {
    dc.value = value
  }
)

function handleUpdate() {
  let node = findNode(props.id)
  if (!node) return
  node.data.Dc = dc.value
  updateNode<ResistorData>(props.id, node)
}
</script>
