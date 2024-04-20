<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { ref } from 'vue'

defineProps({
    id: String,
})

const dc = ref(0)

</script>

<template>
    <div class="h-20 w-20 flex rounded-full items-center justify-center bg-orange-500 border border-slate-600">
        <Handle type="target" :position="Position.Top" />
        <Handle type="source" :position="Position.Bottom" />
        <div>+</div>
    </div>
</template>

<style scoped>
.custom-node {
    height: 100%;
    width: 100%;
    padding: 1rem;
    display: flex;
    border-radius: 50%;
    /* make it a circle */
    flex-direction: column;
    gap: 10px;
    background: orange;
    color: white;
    border: 1px solid black;
}
</style>