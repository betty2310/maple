<template>
    <div class="flex flex-col h-screen">
        <div>
            <ToolBar />
        </div>
        <!-- Toolbar -->
        <div class="flex flex-1">
            <!-- Activity Bar -->
            <ActivityBar />
            <!-- Main Content -->
            <div class="flex-1 ml-16 mr-0">
                <MainCircuit />
            </div>
        </div>
        <!-- Status Bar -->
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

</script>