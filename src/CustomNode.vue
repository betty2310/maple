<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { ref } from 'vue'

const counter = ref(0)
</script>

<template>
    <div class="custom-node">
        <Handle type="target" :position="Position.Top" />
        <button @click="counter++">Increment</button>
        <div>{{ counter }}</div>
    </div>
</template>

<style scoped>
.custom-node {
    height: 100%;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    border: 1px solid black;
    border-radius: 14px;
}
</style>