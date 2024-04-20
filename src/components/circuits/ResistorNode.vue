<script lang="ts" setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { onMounted, ref } from 'vue';
import type { ResistorData } from './types';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { updateNodeData } = useVueFlow()

const resistance = ref(1000)

onMounted(() => {
  updateNodeData<ResistorData>(props.id, {
    type: 'resistor',
    description: 'resistor description',
    resistance: resistance.value
  })
})

</script>

<template>
  <div>{{ props.id }}</div>
  <div class="custom-node">
    <Handle type="source" :position="Position.Left" />
    <Handle type="target" :position="Position.Right" />
    <div>resistor</div>
  </div>
</template>

<style scoped>
.custom-node {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  gap: 10px;
  background: blue;
  color: white;
  border: 1px solid black;
}
</style>