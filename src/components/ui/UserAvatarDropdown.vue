<script lang="ts" setup>
import { FolderDot, LogOut, User as UserIcon } from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'
import { type User } from '@supabase/supabase-js'
import { onMounted, ref } from 'vue'

import { useSessionStore } from '@/stores/sessionStore'
const sessionStore = useSessionStore()

const props = defineProps<{
  user: User
  signout: () => void
}>()

const avatar = ref<string | null>(null)
onMounted(async () => {
  sessionStore.GetAvatarUrl(props.user.user_metadata.avatar_url)
  avatar.value = sessionStore.avatar
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button size="xs_circle" variant="ghost_circle">
        <Avatar size="tiny">
          <AvatarImage v-if="avatar" :src="avatar" alt="avatar" />
          <AvatarFallback><UserIcon class="w-4 h-4" /></AvatarFallback>
        </Avatar>
      </Button>

      <!-- <Button size="xs" variant="outline">
        {{ props.user.email }}
      </Button> -->
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>{{ user.user_metadata.email }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <RouterLink to="/profile">
          <DropdownMenuItem>
            <UserIcon class="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </RouterLink>
        <RouterLink to="/">
          <DropdownMenuItem>
            <FolderDot class="mr-2 h-4 w-4" />
            <span>Projects</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </RouterLink>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="props.signout">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
