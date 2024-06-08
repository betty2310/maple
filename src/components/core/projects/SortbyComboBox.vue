<script setup lang="ts">
import { Check, ChevronsUpDown } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const value = defineModel()

const choices = [
  { value: 'modified', label: 'last modified' },
  { value: 'created', label: 'last created' },
  { value: 'alphabetical', label: 'alphabetical' }
]

const open = ref(false)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{
          value ? choices.find((choice) => choice.value === value)?.label : 'Select framework...'
        }}

        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command v-model="value">
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="choice in choices"
              :key="choice.value"
              :value="choice.value"
              @select="open = false"
            >
              <Check
                :class="cn('mr-2 h-4 w-4', value === choice.value ? 'opacity-100' : 'opacity-0')"
              />
              {{ choice.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
