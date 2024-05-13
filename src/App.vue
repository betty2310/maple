<template>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { themeChange } from 'theme-change'

import { supabase } from '@/lib/supabaseClient'
import { useSessionStore } from '@/stores/sessionStore'


const session = ref()
const sessionStore = useSessionStore()

onMounted(() => {
  themeChange(false)
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
    if (data.session?.user) sessionStore.user = data.session?.user
  })

  supabase.auth.onAuthStateChange((event, _session) => {
    session.value = _session
    if (event === 'SIGNED_OUT') sessionStore.user = null
    if (_session?.user) sessionStore.user = _session?.user
  })
})


</script>