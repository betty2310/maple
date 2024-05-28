<script setup lang="ts">
import { Loader2, Plus, Copy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Share } from 'lucide-vue-next'

import { computed, onMounted, ref, watch } from 'vue'
import { type Enums } from '@/database/types'
import { supabase } from '@/lib/supabaseClient'
import { useRoute } from 'vue-router'

import { useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const fieldSchema = toTypedSchema(
  zod.string().min(1, { message: 'Field is required' }).email({ message: 'Must be a valid email' })
)
const { value, errorMessage } = useField('zod_email', fieldSchema)

const props = defineProps<{
  project_id: number
}>()

const projectShareId = ref<number>()

onMounted(async () => {
  const { data } = await supabase
    .from('project_shares')
    .select('*')
    .eq('project_id', props.project_id)
  if (!data) return
  isShared.value = data.length > 0
  if (isShared.value) {
    projectShareId.value = data[0].id
    share.value = data[0].type
    permision.value = data[0].permisison
    const { data: users } = await supabase
      .from('project_share_users')
      .select('user_id')
      .eq('project_share_id', data[0].id)
    if (!users) return
    users.forEach(async (user) => {
      if (!user) return
      if (user.user_id === null) return
      let { data: emails, error } = await supabase.rpc('get_email_by_user_id', {
        user_id: user.user_id
      })
      if (!emails) return
      emails.forEach((email) => {
        emailList.value.push(email.email)
      })
    })
  }
})

const route = useRoute()
const currentURL = computed(() => {
  return window.location.origin + route.fullPath
})
const isShared = ref(false)
const share = ref<Enums<'share_type'>>()
const permision = ref<Enums<'share_permision'>>()
const email = ref('')
const emailList = ref<string[]>([])
const isLoading = ref(false)
const addEmailMessage = ref('')
const addEmailLoading = ref(false)

watch(
  () => share.value,
  async (newVal) => {
    if (isShared.value) {
      if (projectShareId.value) {
        await supabase
          .from('project_shares')
          .update({ type: newVal })
          .eq('id', projectShareId.value)
      }
    } else {
      const { data, error } = await supabase
        .from('project_shares')
        .insert({
          project_id: props.project_id,
          type: newVal,
          permisison: permision.value
        })
        .select('id')
      if (!data) return
      projectShareId.value = data[0].id
    }
  }
)

watch(
  () => permision.value,
  async (newVal) => {
    if (isShared.value) {
      if (projectShareId.value) {
        await supabase
          .from('project_shares')
          .update({ permisison: newVal })
          .eq('id', projectShareId.value)
      }
    }
  }
)

const addEmail = async () => {
  addEmailMessage.value = ''
  addEmailLoading.value = true
  const email = value.value
  if (emailList.value.includes(email)) {
    addEmailMessage.value = 'Email already added'
    addEmailLoading.value = false
    return
  }
  const { data, error } = await supabase.rpc('get_user_id_by_email', {
    email
  })
  if (!data || error || data.length === 0) {
    addEmailMessage.value = "User not found! Please ensure user's email is registered."
    addEmailLoading.value = false
    return
  }
  await supabase.from('project_share_users').insert({
    project_share_id: projectShareId.value,
    user_id: data[0].id
  })
  addEmailLoading.value = false
  emailList.value.push(value.value)
}

const removeEmail = async (index: number) => {
  const email = emailList.value[index]
  if (isShared.value) {
    let { data, error } = await supabase.rpc('get_user_id_by_email', {
      email
    })
    if (!data) return
    await supabase.from('project_share_users').delete().eq('user_id', data[0].id)
  }
  emailList.value.splice(index, 1)
}

const handleShareLink = async () => {
  isLoading.value = true
  const { data, error } = await supabase
    .from('project_shares')
    .insert({
      project_id: props.project_id,
      type: share.value,
      permisison: permision.value
    })
    .select('id')
  if (error) {
    console.log(error)
  }
  if (!data) return
  const project_share_id = data[0].id
  if (share.value === 'PRIVATE' && emailList.value.length > 0) {
    emailList.value.forEach(async (email) => {
      let { data, error } = await supabase
        .rpc('get_user_id_by_email', {
          email
        })
        .select('id')
      if (!data) return
      await supabase.from('project_share_users').insert({
        project_share_id: project_share_id,
        user_id: data[0].id
      })
    })
  }
  isLoading.value = false
  dialogOpen.value = false
}

const dialogOpen = ref(false)
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button class="gap-1.5 text-sm mx-5" size="xs" variant="secondary">
        <Share class="size-3.5" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription> Anyone who has this link will be able to view this. </DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-2 gap-4 py-2">
        <Select v-model="share">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select share type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUBLIC">Public</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="permision">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VIEW">View</SelectItem>
            <SelectItem value="EDIT">Edit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div v-if="share === 'PRIVATE'" class="py-2">
        <div class="flex">
          <div>
            <Input v-model="value" type="email" placeholder="Enter email" class="flex-1" />
            <p class="leading-7 text-destructive">{{ errorMessage }}</p>
          </div>

          <Button
            :disabled="errorMessage || addEmailLoading"
            @click="addEmail"
            size="icon"
            class="ml-2"
          >
            <Plus v-if="!addEmailLoading" class="w-4 h-4" />
            <Loader2 v-else class="w-4 h-4 animate-spin" />
          </Button>
        </div>
        <p class="text-sm">{{ addEmailMessage }}</p>
        <ul class="mt-4">
          <li
            v-for="(item, index) in emailList"
            :key="index"
            class="flex items-center justify-between mb-1"
          >
            <span class="ml-2">{{ item }}</span>
            <Button variant="destructive" size="sm" @click="removeEmail(index)"> x </Button>
          </li>
        </ul>
      </div>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only"> Link </Label>
          <Input id="link" :default-value="currentURL" read-only />
        </div>
        <Button type="submit" size="sm" class="px-3">
          <span class="sr-only">Copy</span>
          <Copy class="w-4 h-4" />
        </Button>
      </div>
      <!-- <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary"> Close </Button>
        </DialogClose>
        <Button :disabled="isLoading" @click="handleShareLink">
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          {{ isLoading ? 'Please wait' : 'Share' }}
        </Button>
      </DialogFooter> -->
    </DialogContent>
  </Dialog>
</template>
