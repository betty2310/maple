<script lang="ts" setup>
import { ref } from 'vue'
import { Handle, type NodeProps, Position } from '@vue-flow/core'
import IconComponent from '@/assets/svgs/Capacitor.svg?component'

import type { CapacitorData } from '@/types'
import BaseNode from '../BaseNode.vue'

const props = defineProps<NodeProps<CapacitorData>>()

const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)
</script>

<template>
  <BaseNode
    :node-props="props"
    :neg="neg"
    :pos="pos"
    :node-prefix="'C'"
    :show-id="true"
    :icon="IconComponent"
    :additional-data="{ capacitance: 1e-6, description: 'Capacitor' }"
  >
    <template #handle>
      <Handle :position="pos" type="target" />
      <Handle :position="neg" type="source" />
    </template>
  </BaseNode>
</template>
