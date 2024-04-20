<template>
    <div>
        {{ props.selectedComponent }}
    </div>
</template>

<script lang="ts" setup>
import type { Node } from '@vue-flow/core';

interface Props {
    selectedComponent: Node | null;
}
const props = defineProps<Props>()
</script>