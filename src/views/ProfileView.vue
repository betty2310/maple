<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Check, X } from 'lucide-vue-next'
import { useSessionStore } from '@/stores/sessionStore'
import UserAvatarDropdown from '@/components/ui/UserAvatarDropdown.vue'
import AppIcon from '@/components/core/Toolbar/AppIcon.vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Avatar from '@/components/core/Profile/Avatar.vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/ui/button/Button.vue'
const router = useRouter()

const sessionStore = useSessionStore()

const emailVerified = ref(false)
const email = ref('')
const displayName = ref('')
const avatar_url = ref('')

const user = sessionStore.user

onMounted(() => {
  if (!user) return
  email.value = user.email || ''
  displayName.value = user.user_metadata.full_name
  emailVerified.value = user.user_metadata.email_verified
  avatar_url.value = sessionStore.avatar || ''
})

const loading = ref(false)

async function updateProfile() {
  try {
    loading.value = true
    const user = sessionStore.user
    if (!user) return

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: displayName.value,
        avatar_url: avatar_url.value
      }
    })

    if (error) throw error
  } catch (error) {
    console.error('Error updating profile:', error)
  } finally {
    loading.value = false
  }
}

const isOnSignOut = ref(false)
const onSignOut = async () => {
  isOnSignOut.value = true
  await sessionStore.signOut()
  router.push('/playground')
  isOnSignOut.value = false
}
</script>

<template>
  <div v-if="isOnSignOut">
    <div class="flex items-center justify-center h-screen">
      <div class="flex flex-col items-center gap-4">
        <div class="text-2xl font-semibold">Signing out...</div>
      </div>
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
          <UserAvatarDropdown v-if="user !== null" :signout="onSignOut" :user="user" />
        </div>
      </div>
    </header>
    <div class="container h-screen mx-auto p-4">
      <div class="flex flex-col gap-4">
        <div class="my-2">
          <h1
            class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          >
            Profile
          </h1>
        </div>
        <div class="grid grid-cols-2 gap-4 w-1/2">
          <div class="col-span-1">
            <div class="grid w-full max-w-sm items-center gap-1.5">
              <Label>Display name</Label>
              <Input :value="displayName" v-model="displayName" />
            </div>
            <div class="my-4">
              <div class="grid w-full max-w-sm mb-2 items-center gap-1.5">
                <Label>Email</Label>
                <Input disabled :value="email" />
              </div>
              <div
                v-if="!emailVerified"
                class="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <X class="w-4 h-4 text-destructive" />
                <Label>Email is not verified</Label>
              </div>
              <div v-else class="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Check class="w-4 h-4 text-primary" />
                <Label>Email verified</Label>
              </div>
            </div>
            <Button :disabled="loading" size="sm" :variant="'default'" @click="updateProfile">
              {{ loading ? 'Loading' : 'Update' }}
            </Button>
          </div>
          <div class="col-span-1">
            <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
