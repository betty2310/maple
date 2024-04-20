<template>
    <div>
        <div v-if="props.selectedComponent == null">
            <p>Select a component to view its properties</p>
        </div>
        <div v-else>
            <div class="overflow-x-auto">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{{ props.selectedComponent.id }}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>{{ props.selectedComponent.type }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="divider"></div>
            <div>Description</div>
            <div>{{ props.selectedComponent.data }}</div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Node } from '@vue-flow/core';

interface Props {
    selectedComponent: Node | null;
}
const props = defineProps<Props>()
</script>