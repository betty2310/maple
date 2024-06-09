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

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: 'This is required' })
      .email({ message: 'Must be a valid email' }),
    password: zod.string().min(1, { message: 'This is required' }).min(6, { message: 'Too short' })
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

const router = useRouter()

const sessionStore = useSessionStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    errorMessage.value = ''
    const { user, session } = await sessionStore.signinWithEmailAndPassword(
      values.email,
      values.password
    )

    if (user) {
      router.push('/')
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    }
  } finally {
    loading.value = false
  }
})

const handleSignInWithGoogle = async () => {
  try {
    await sessionStore.signinWithGoogle()
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    }
  }
}
</script>

<template>
  <div class="w-full lg:grid">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Welcome Back!</h1>
          <div class="flex items-center justify-center">
            <p class="text-balance text-muted-foreground pr-1">Let's dive back into the fun!</p>
            <AppIcon />
          </div>
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
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <RouterLink to="/forgot-password" class="ml-auto inline-block text-sm underline">
                  <Button variant="link" class="text-primary -mx-3 -my-2"
                    >Forgot your password?</Button
                  >
                </RouterLink>
              </div>
              <Input id="password" v-model="password" type="password" />
              <span class="text-sm font-medium leading-none text-destructive">{{
                errors.password
              }}</span>
            </div>
            <Button :disabled="loading" :variant="'default'" class="w-full" type="submit">
              {{ loading ? 'Loading' : 'Login' }}
            </Button>
            <Button class="w-full" variant="outline" @click="handleSignInWithGoogle">
              Login with Google
            </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/signup">
            <Button variant="link" class="text-primary -mx-3">Sign up</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
