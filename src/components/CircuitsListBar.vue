<template>
  <aside>
    <div>
      <div class="flex flex-col space-y-4 cotent-center">
        <button class="btn" :draggable="true" @click="onAutoCreate('default')"
          @dragstart="onDragStart($event, 'default')">Default Node
        </button>
        <button class="btn" :draggable="true" @click="onAutoCreate('output')"
          @dragstart="onDragStart($event, 'output')">Ground
        </button>
        <button class="btn" :draggable="true" @click="onAutoCreate('resister')"
          @dragstart="onDragStart($event, 'resister')">Resister
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import useDragAndDrop from '@/hooks/useDnDCircuitComponent';
import useCreate from '@/hooks/useCreatCircuitComponent'

const { onDragStart } = useDragAndDrop();
const { onAutoCreate } = useCreate();
</script>