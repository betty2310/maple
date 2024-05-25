<script lang="ts" setup>
import { PlusCircle } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabaseClient'

import { onMounted, ref } from 'vue'
import type { Json } from '@/database/types'

const projects = ref<
  | {
      content: Json
      created_at: string
      id: number
      name: string | null
      updated_at: string | null
      user_id: string | null
      uuid: string | null
    }[]
  | null
>()

onMounted(async () => {
  const { data, error } = await supabase.from('projects').select('*')

  if (error) {
    console.error('Error fetching projects:', error.message)
  } else {
    projects.value = data
  }
})

import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string().min(1, { message: 'This is required' })
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const loading = ref<boolean>(false)

const { value: name } = useField<string>('name')
const onCreateNewProject = handleSubmit(async (values) => {
  loading.value = true

  const { data, error } = await supabase
    .from('projects')
    .insert([{ name: values.name, content: {} }])
    .select()

  loading.value = false
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="default"> Create new project </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New project</DialogTitle>
              <DialogDescription>
                Create new circuit project here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form @submit="onCreateNewProject">
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right"> Name </Label>
                  <Input id="name" v-model="name" required class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="description" class="text-right"> Description </Label>
                  <Input id="description" class="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button :variant="loading ? 'ghost' : 'default'" type="submit">
                  {{ loading ? 'Loading' : 'Create' }}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <div v-for="project in projects" :key="project.id">
          <RouterLink :to="`/project/${project.name}/${project.uuid}`">
            <Card class="w-[350px]">
              <CardHeader>
                <CardTitle>{{ project.name }}</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent> {{ project.content }} </CardContent>
              <CardFooter> </CardFooter>
            </Card>
          </RouterLink>
        </div>
      </main>
    </div>
  </div>
</template>
