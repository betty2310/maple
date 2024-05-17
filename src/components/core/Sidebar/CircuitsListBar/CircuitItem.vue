<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { CircuitComponent } from '@/types'

import useDragAndDrop from '@/hooks/useDnDCircuitComponent'
import useCreate from '@/hooks/useCreatCircuitComponent'

const { onDragStart } = useDragAndDrop()
const { onAutoCreate } = useCreate()

defineProps<{
  circuitComponent: CircuitComponent
  name: string
}>()

</script>

<template>
  <Button
    :draggable="true"
    class="flex items-center w-full"
    variant="outline"
    @click="onAutoCreate(circuitComponent)"
    @dragstart="onDragStart($event, circuitComponent)"
  >
    <div class="w-1/2 flex justify-center">
      <slot />
    </div>
    <div class="w-1/2 flex items-center">
      <p>{{ name }}</p>
    </div>
  </Button>
</template>

<style scoped>

</style>