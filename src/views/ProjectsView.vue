<script lang="ts" setup>
import { Plus, MoveRight, Eye, Edit2, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import SortbyComboBox from '@/components/core/projects/SortbyComboBox.vue'
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabaseClient'
import { Skeleton } from '@/components/ui/skeleton'

import { onMounted, ref, computed, watch } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import { useSessionStore } from '@/stores/sessionStore'

const projectStore = useProjectStore()
const sessionStore = useSessionStore()
const user = sessionStore.user
const isLoadingProjects = ref<boolean>(false)
const isCardHovered = ref(false)
const hoveredCardId = ref<number | null>(null)

const setHoveredCard = (id: number) => {
  hoveredCardId.value = id
}

const clearHoveredCard = () => {
  hoveredCardId.value = null
}

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

const searchQuery = ref('')
const sortValue = ref('modified')

const sortedProjects = computed(() => {
  if (!projects.value) return []

  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return projects.value.sort((a, b) => {
    if (sortValue.value === 'modified') {
      return new Date(b.updated_at || '').getTime() - new Date(a.updated_at || '').getTime()
    } else if (sortValue.value === 'created') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else if (sortValue.value === 'alphabetical') {
      return (a.name || '').localeCompare(b.name || '')
    }
    return 0
  })
})
const filteredProjects = computed(() => {
  if (!sortedProjects.value) return []

  return sortedProjects.value.filter((project) =>
    project.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// const calculateTimeAgo = (time: string | null) => {
//   if (!time) return ''
//   return useTimeAgo(time)
// }
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const viewProject = (url: string) => {
  router.push(url)
}

const renameProject = async (id: number, name: string) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ name: name })
    .eq('id', id)
    .select()
  if (error) {
    console.error(error)
    toast({
      title: 'Uh oh! Can not rename this project.',
      description: 'There was a problem with your request.',
      variant: 'destructive'
    })
    return
  }

  projects.value = projects.value?.map((project) => {
    if (project.id === id) {
      return { ...project, name }
    }
    return project
  })

  toast({
    title: 'Project renamed successfully!',
    description: 'Your project has been renamed.',
    variant: 'default'
  })
}

const deleteProject = async (id: number) => {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) {
    console.error(error)
    toast({
      title: 'Uh oh! Can not delete this project.',
      description: 'There was a problem with your request.',
      variant: 'destructive'
    })
    return
  }
  toast({
    title: 'Project deleted successfully!',
    description: 'Your project has been deleted.',
    variant: 'default'
  })
  projects.value = projects.value?.filter((project) => project.id !== id)
}
const projectToDelete = ref<number | null>(null)
const projectToRename = ref<number | null>(null)

const openDeleteDialog = (id: number) => {
  projectToDelete.value = id
}

const closeDeleteDialog = () => {
  projectToDelete.value = null
}

const openRenameDialog = (id: number) => {
  projectToRename.value = id
}

const closeRenameDialog = () => {
  projectToRename.value = null
}

const newProjectName = ref('')

const confirmRename = async () => {
  if (projectToRename.value && newProjectName.value.trim()) {
    await renameProject(projectToRename.value, newProjectName.value.trim())
    closeRenameDialog()
  }
}

const confirmDelete = () => {
  if (projectToDelete.value) {
    deleteProject(projectToDelete.value)
    closeDeleteDialog()
  }
}
onMounted(async () => {
  isLoadingProjects.value = true
  try {
    const currentUserId = sessionStore.user?.id
    if (!currentUserId) return
    const data = await projectStore.getProjects(currentUserId)
    const avatarUrl = sessionStore.user?.user_metadata.avatar_url
    await sessionStore.GetAvatarUrl(avatarUrl)
    projects.value = data
  } catch (error) {
    console.error(error)
  }
  isLoadingProjects.value = false
})

import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import type { Json } from '@/database/types'
import AppIcon from '@/components/core/Toolbar/AppIcon.vue'
import UserAvatarDropdown from '@/components/ui/UserAvatarDropdown.vue'
import { useRouter } from 'vue-router'
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

const router = useRouter()
const onCreateNewProject = handleSubmit(async (values) => {
  loading.value = true

  const { data, error } = await supabase
    .from('projects')
    .insert([{ name: values.name, content: {} }])
    .select()

  if (!data || error) {
    console.error(error)
    loading.value = false
    return
  }

  router.push(`/project/${data[0].name}/${data[0].uuid}`)

  loading.value = false
})

const isOnSignOut = ref(false)
const onSignOut = async () => {
  isOnSignOut.value = true
  await sessionStore.signOut()
  isOnSignOut.value = false
  router.replace('/playground')
}
</script>

<template>
  <div
    v-if="isOnSignOut"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 rounded-lg">
      <p>Signing out...</p>
    </div>
  </div>
  <div v-else>
    <header
      class="sticky top-0 z-30 flex h-[45px] w-full items-center gap-1 border-b bg-secondary px-4"
    >
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <AppIcon />
        </div>

        <div>
          <UserAvatarDropdown :signout="onSignOut" :user="user" v-if="user !== null" />
        </div>
      </div>
    </header>
    <div class="container h-screen mx-auto p-4">
      <div class="flex flex-col gap-4">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search in projects"
            class="pl-10 bg-secondary"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div class="my-2">
          <h3 class="scroll-m-20 text-xl font-semibold tracking-tight pb-4">Projects</h3>
          <h1
            class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          >
            Dashboard
          </h1>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center justify-center gap-4">
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline" size="slg" class="flex justify-between">
                  <Plus class="w-4 h-4 mr-5" />
                  <div class="flex flex-col items-start">
                    <div class="font-medium">Empty project</div>
                    <div class="text-xs text-muted-foreground">Start from scratch</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create project</DialogTitle>
                </DialogHeader>
                <form @submit="onCreateNewProject">
                  <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                      <Label for="name" class="text-right">Project name </Label>
                      <Input id="name" v-model="name" required class="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button :variant="loading ? 'ghost' : 'default'" type="submit">
                      {{ loading ? 'Loading...' : 'Create' }}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="slg"
              class="flex justify-between"
              @click="router.push('/playground')"
            >
              <MoveRight class="w-4 h-4 mr-5" />
              <div class="flex flex-col items-start">
                <div class="font-medium">Enjoy</div>
                <div class="text-xs text-muted-foreground">Playground</div>
              </div>
            </Button>
          </div>

          <div>
            <p class="text-sm text-muted-foreground">sort by</p>
            <SortbyComboBox v-model="sortValue" />
          </div>
        </div>

        <div class="flex flex-wrap gap-10 mt-10">
          <div v-if="isLoadingProjects" class="flex items-center space-x-4">
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </div>
          <div
            v-else
            v-for="project in filteredProjects"
            :key="project.id"
            @mouseenter="setHoveredCard(project.id)"
            @mouseleave="clearHoveredCard"
            class="w-[180px] h-[200px]"
          >
            <div class="relative">
              <Card class="p-3 h-[180px] bg-gradient-to-br from-blue-300 to-blue-500 text-white">
                <CardHeader>
                  <CardTitle class="overflow-hidden pixelify-sans whitespace-nowrap">{{
                    project.name
                  }}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    v-if="hoveredCardId === project.id"
                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
                  >
                    <div class="flex space-x-2">
                      <Button
                        @click="viewProject(`/project/${project.name}/${project.uuid}`)"
                        variant="secondary"
                        size="xs"
                      >
                        <Eye class="w-4 h-4" />
                      </Button>
                      <Button @click="openRenameDialog(project.id)" variant="secondary" size="xs">
                        <Edit2 class="w-4 h-4" />
                      </Button>
                      <Button @click="openDeleteDialog(project.id)" variant="secondary" size="xs">
                        <Trash2 class="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p class="font-bold text-center text-sm">{{ project.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog :open="!!projectToDelete" @update:open="closeDeleteDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this project ? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button @click="closeDeleteDialog" variant="secondary">Cancel</Button>
        <Button @click="confirmDelete" variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- Rename Dialog -->
  <Dialog :open="!!projectToRename" @update:open="closeRenameDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename Project</DialogTitle>
        <DialogDescription> Enter a new name for project </DialogDescription>
      </DialogHeader>
      <Input v-model="newProjectName" placeholder="New project name" class="mt-4" />
      <DialogFooter>
        <Button @click="closeRenameDialog" variant="secondary">Cancel</Button>
        <Button @click="confirmRename" variant="default">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
