<script lang="ts" setup>
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { ref } from 'vue'

const isOpen = ref(true)

defineProps<{
  name: string
}>()

</script>

<template>
  <Collapsible v-model:open="isOpen" class="space-y-2">
    <div class="flex items-center justify-between space-x-4">
      <h4 class="text-sm font-semibold">
        {{ name }}
      </h4>
      <CollapsibleTrigger as-child>
        <Button class="w-9 p-0" size="sm" variant="ghost">
          <ChevronUp v-if="isOpen" class="h-4 w-4" />
          <ChevronDown v-else class="h-4 w-4" />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>

    <CollapsibleContent class="space-y-4 w-full">

      <slot />

    </CollapsibleContent>
  </Collapsible>

</template>

<style scoped>

</style>