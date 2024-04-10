<template>
  <aside>
    <div
      class="absolute left-0 top-0 bottom-0 bg-white shadow-lg my-4 p-4 rounded-xl flex items-center justify-between z-10">
      <div class="flex flex-col space-y-4 cotent-center">
        <div class="btn" :draggable="true" @dragstart="onDragStart($event, 'default')">Default Node
        </div>
        <div class="btn" :draggable="true" @dragstart="onDragStart($event, 'output')">Ground
        </div>
        <div class="btn" :draggable="true" @dragstart="onDragStart($event, 'resister')">Resister
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import useDragAndDrop from '@/hooks/useDnD';

const { onDragStart } = useDragAndDrop();
</script>