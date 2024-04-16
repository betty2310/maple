<template>
    <div class="flex flex-col h-screen">
        <div>
            <ToolBar />
        </div>
        <div class="flex flex-1">
            <ActivityBar />
            <div class="flex-auto mr-0 border-2 mb-6 mt-9 border-red-500"
                :class="layoutStore.isShowLeftPanel ? 'ml-[28rem]' : 'ml-14'">
                <MainCircuit />
            </div>
        </div>
        <div>
            <StatusBar />
        </div>
    </div>
</template>

<script setup>
import ToolBar from './ToolBar.vue';
import ActivityBar from './ActivityBar.vue';
import StatusBar from './StatusBar.vue';
import MainCircuit from './MainCircuit.vue';
import { useLayoutStore } from './stores/layoutStore';

const layoutStore = useLayoutStore();
</script>