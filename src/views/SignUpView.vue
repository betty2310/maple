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
  zod
    .object({
      email: zod
        .string()
        .min(1, { message: 'This is required' })
        .email({ message: 'Must be a valid email' }),
      password: zod
        .string()
        .min(1, { message: 'This is required' })
        .min(6, { message: 'Too short' }),
      name: zod.string().min(1, { message: 'This is required' }).max(50, { message: 'Too long' }),
      passwordConfirmation: zod
        .string()
        .min(1, { message: 'This is required' })
        .max(50, { message: 'Too long' })
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation']
    })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: name } = useField<string>('name')
const { value: passwordConfirmation } = useField<string>('passwordConfirmation')

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

const router = useRouter()

const sessionStore = useSessionStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    errorMessage.value = ''
    const data = await sessionStore.signupWithEmailAndPassword(
      values.email,
      values.password,
      values.name
    )
    console.log(data)
    const email = values.email
    if (data) {
      toast({
        title: `Account with ${email} created`,
        description: 'Please check your email to verify your account'
      })
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
</script>

<template>
  <div class="w-full lg:grid">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <div class="flex items-center justify-center text-center">
            <AppIcon />
          </div>
          <h1 class="text-3xl font-bold">Sign in</h1>
          <p class="text-balance text-muted-foreground">
            Enter your information to create an account
          </p>
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
              <Label for="email">Your name</Label>
              <Input id="email" v-model="name" type="text" />
              <span class="text-sm font-medium leading-none text-destructive">{{
                errors.name
              }}</span>
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
              </div>
              <Input id="password" v-model="password" type="password" />
              <span class="text-sm font-medium leading-none text-destructive">{{
                errors.password
              }}</span>
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password confirmation</Label>
              </div>
              <Input id="password" v-model="passwordConfirmation" type="password" />
              <span class="text-sm font-medium leading-none text-destructive">{{
                errors.passwordConfirmation
              }}</span>
            </div>
            <Button :disabled="loading" :variant="'default'" class="w-full" type="submit">
              {{ loading ? 'Loading' : 'Create an account' }}
            </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <RouterLink to="/signin">
            <Button variant="link" class="text-primary -mx-3">Sign in</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
