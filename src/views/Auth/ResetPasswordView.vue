<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ref } from 'vue'

import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import AppIcon from '@/components/core/Toolbar/AppIcon.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { supabase } from '@/lib/supabaseClient'
import { deleteToken } from '@/utils'
import { useRouter } from 'vue-router'
const { toast } = useToast()

const validationSchema = toTypedSchema(
  zod
    .object({
      password: zod
        .string()
        .min(1, { message: 'This is required' })
        .min(6, { message: 'Too short' }),
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
const { value: password } = useField<string>('password')
const { value: passwordConfirmation } = useField<string>('passwordConfirmation')

const loading = ref<boolean>(false)
const errorMessage = ref<string>('')
const router = useRouter()

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  errorMessage.value = ''
  const { data, error } = await supabase.auth.updateUser({
    password: values.password
  })
  if (data && !error) {
    deleteToken()
    toast({
      title: `Password has been reset.`
    })
    await router.replace('/signin')
  }
  if (error) {
    errorMessage.value = error.message
  }
  loading.value = false
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
          <h1 class="text-3xl font-bold">Reset password</h1>
          <p class="text-balance text-muted-foreground">Enter new password</p>
        </div>
        <div class="bg-destructive p-2 rounded-md" v-if="errorMessage !== ''">
          <p class="text-sm text-destructive-foreground">{{ errorMessage }}</p>
        </div>
        <form @submit="onSubmit">
          <div class="grid gap-4">
            <div class="grid gap-2">
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
