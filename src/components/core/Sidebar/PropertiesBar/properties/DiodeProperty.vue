<template>
  <div></div>
</template>

<script lang="ts" setup>
import type { DiodeData } from '@/types'

const props = defineProps<DiodeData>()

// const inductance = ref(props.inductance)
// watch(
//   () => props.inductance,
//   (value) => {
//     inductance.value = value
//   }
// )
//
// const circuitStore = useCircuitStore()
//
// function handleUpdate() {
//   const node = circuitStore.getSelectedNode()
//   if (!node) return
//   node.data.inductance = inductance.value
// }
</script>
