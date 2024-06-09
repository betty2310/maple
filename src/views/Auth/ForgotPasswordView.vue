<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ref } from 'vue'

import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import AppIcon from '@/components/core/Toolbar/AppIcon.vue'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: 'This is required' })
      .email({ message: 'Must be a valid email' })
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: email } = useField<string>('email')

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

const router = useRouter()

const sessionStore = useSessionStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    errorMessage.value = ''
    const data = await sessionStore.resetPassowrd(values.email)
    console.log(data)
    const email = values.email
    if (data) {
      toast({
        title: `An email has been sent to ${email} with instructions to reset your password.`
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="w-full lg:grid">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <div class="flex items-center justify-center text-center">
            <AppIcon />
          </div>
          <h1 class="text-3xl font-bold">Forgot password</h1>
          <p class="text-balance text-muted-foreground">Enter your email to reset your password</p>
        </div>
        <div class="bg-destructive p-2 rounded-md" v-if="errorMessage !== ''">
          <p class="text-sm text-destructive-foreground">{{ errorMessage }}</p>
        </div>
        <form @submit="onSubmit">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model="email" type="email" placeholder="m@example.com" />
              <span class="text-sm font-medium leading-none text-destructive">{{
                errors.email
              }}</span>

              <Button :disabled="loading" :variant="'default'" class="w-full" type="submit">
                {{ loading ? 'Loading' : 'Confirm' }}
              </Button>
            </div>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Back to sign in?
          <RouterLink to="/signin">
            <Button variant="link" class="text-primary -mx-3">Sign in</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
