<script lang="ts" setup>
import { ref } from 'vue'
import { Handle, type NodeProps, Position } from '@vue-flow/core'
import IconComponent from '@/assets/svgs/Inductor.svg?component'

import type { InductorData } from '@/types'
import BaseNode from '../BaseNode.vue'

const props = defineProps<NodeProps<InductorData>>()

const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)
</script>

<template>
  <BaseNode
    :node-props="props"
    :neg="neg"
    :pos="pos"
    :node-prefix="'L'"
    :show-id="true"
    :icon="IconComponent"
    :additional-data="{ inductance: 1e-6, description: 'Inductor' }"
  >
    <template #handle>
      <Handle :position="pos" type="target" />
      <Handle :position="neg" type="source" />
    </template>
  </BaseNode>
</template>
