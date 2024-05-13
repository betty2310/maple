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

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: zod.string().min(1, { message: 'This is required' }).min(6, { message: 'Too short' })
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const loading = ref<boolean>(false)
const errorMessage = ref<string>()

const router = useRouter()

const sessionStore = useSessionStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const { user, session } = await sessionStore.signinWithEmailAndPassword(values.email, values.password)

    if (user) {
      router.back()
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
    const data = await sessionStore.signinWithGoogle()
    if (data) {
      router.back()
    }
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
          <h1 class="text-3xl font-bold">
            Login
          </h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        {{ errorMessage }}
        <form @submit="onSubmit">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
              <span class="text-red-500">{{ errors.email }}</span>
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" v-model="password" type="password" required />
              <span class="text-red-500">{{ errors.password }}</span>
            </div>
            <Button :variant="loading ? 'ghost' : 'default'" class="w-full" type="submit">
              {{ loading ? 'Loading' : 'Login' }}
            </Button>
            <Button class="w-full" variant="outline" @click="handleSignInWithGoogle">
              Login with Google
            </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="#" class="underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
    <!--    <div class="hidden bg-muted lg:block">-->
    <!--      <img src="../assets/preview.jpg" alt="Image" width="1920" height="1080"-->
    <!--        class="h-full w-full object-fill dark:brightness-[0.2] dark:grayscale">-->
    <!--    </div>-->
  </div>
</template>