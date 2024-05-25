<script lang="ts" setup>
import { ref } from 'vue'
import { Handle, type NodeProps, Position } from '@vue-flow/core'

import IconComponent from '@/assets/svgs/resistor.svg?component'

import type { ResistorData } from '@/types'
import BaseNode from '@/components/circuits/BaseNode.vue'

const props = defineProps<NodeProps<ResistorData>>()

const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)
</script>

<template>
  <BaseNode
    :node-props="props"
    :neg="neg"
    :pos="pos"
    :node-prefix="'R'"
    :show-id="true"
    :icon="IconComponent"
    :additional-data="{ resistance: 1000, description: 'Resistor' }"
  >
    <template #handle>
      <Handle :position="pos" type="target" />
      <Handle :position="neg" type="source" />
    </template>
  </BaseNode>
</template>
