<script lang="ts" setup>
import { ref } from 'vue'
import { Handle, type NodeProps, Position } from '@vue-flow/core'

import IconComponent from '@/assets/svgs/Ground.svg?component'

import type { ComponentData } from '@/types'
import BaseNode from './BaseNode.vue'

const props = defineProps<NodeProps<ComponentData>>()

const pos = ref<Position>(Position.Top)
</script>

<template>
  <BaseNode
    :node-props="props"
    :pos="pos"
    :node-prefix="'GND'"
    :icon="IconComponent"
    :additional-data="{ description: 'Ground' }"
  >
    <template #handle>
      <Handle :position="pos" type="target" />
    </template>
  </BaseNode>
</template>
