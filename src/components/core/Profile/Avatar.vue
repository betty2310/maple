<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref, toRefs, watch } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from 'lucide-vue-next'
import Input from '@/components/ui/input/Input.vue'

const prop = defineProps({
  path: { type: String, default: '', required: true },
  size: { type: String, default: '10' }
})
const { path, size } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  if (!path?.value) return
  if (path.value.match(/^(http|https):\/\//)) {
    src.value = path.value
    return
  }
  const { data, error } = await supabase.storage.from('avatars').download(path.value)
  if (error) {
    src.value = path.value
    return
  }
  src.value = URL.createObjectURL(data)
}

const uploadAvatar = async (evt: Event) => {
  if (!evt.target) return
  files.value = (evt.target as HTMLInputElement).files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error)
  } finally {
    uploading.value = false
  }
}

watch(path, () => {
  if (path.value) downloadImage()
})
</script>

<template>
  <div class="text-center">
    <Avatar size="lg">
      <AvatarImage v-if="src" :src="src" alt="Avatar" />
      <AvatarFallback><UserIcon class="w-10 h-10" /></AvatarFallback>
    </Avatar>
    <div class="my-4">
      <Label
        class="text-sm text-secondary-foreground text-center p-2 rounded-md bg-secondary hover:cursor-pointer"
        for="single"
      >
        {{ uploading ? 'Uploading ...' : 'edit' }}
      </Label>
      <Input
        :style="{ visibility: 'hidden', position: 'absolute' }"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>
