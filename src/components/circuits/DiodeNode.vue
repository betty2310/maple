<script lang="ts" setup>
import { ref } from 'vue'
import { Handle, type NodeProps, Position } from '@vue-flow/core'

import IconComponent from '@/assets/svgs/Diode.svg?component'

import type { DiodeData } from '@/types'
import BaseNode from '@/components/circuits/BaseNode.vue'

const props = defineProps<NodeProps<DiodeData>>()

const pos = ref<Position>(Position.Left)
const neg = ref<Position>(Position.Right)
</script>

<template>
  <BaseNode
    :node-props="props"
    :neg="neg"
    :pos="pos"
    :node-prefix="'D'"
    :show-id="true"
    :icon="IconComponent"
    :additional-data="{
      description: 'Diode model 1N4148'
    }"
  >
    <template #handle>
      <Handle :position="pos" type="target" />
      <Handle :position="neg" type="source" />
    </template>
  </BaseNode>
</template>
