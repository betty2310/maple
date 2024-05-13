import { defineStore } from 'pinia'
import { type Session, type User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

export const useSessionStore = defineStore('sessionStore', {
  state: () => ({
    session: null as Session | null,
    user: null as User | null
  }),
  actions: {
    async signinWithEmailAndPassword(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) throw error
      return data

    },

    async signinWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if (error) throw error
      return data
    },

    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    }
  }
})