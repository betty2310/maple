<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'

</script>

<template>
    <div class="custom-node">
        <Handle type="source" :position="Position.Left" />
        <Handle type="target" :position="Position.Right" />
        <div>Resister</div>
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