<template>
  <div class="flex items-center mx-4">
    <label class="mr-2" for="input-field">Model</label>
    <div>{{ model }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TransistorData } from '@/types'

const props = defineProps<TransistorData>()

const model = ref(props.model)

</script>
