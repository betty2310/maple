import { defineStore } from 'pinia'
import { type Session, type User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

export const useSessionStore = defineStore('sessionStore', {
  state: () => ({
    session: null as Session | null,
    user: null as User | null,
    avatar: null as string | null
  }),
  actions: {
    async signinWithEmailAndPassword(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) throw error
      await this.GetAvatarUrl(data?.user?.user_metadata?.avatar_url)
      return data
    },

    async signupWithEmailAndPassword(email: string, password: string, name: string) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name
          }
        }
      })
      if (error) throw error
      return data
    },

    async resetPassowrd(email: string) {
      const url = import.meta.env.VITE_APP_URL
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: url + '/reset-password'
      })
      if (error) throw error
      return data
    },

    async signinWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: import.meta.env.VITE_APP_URL
        }
      })
      if (error) throw error
      await this.GetAvatarUrl(data?.user?.user_metadata?.avatar_url)
      return data
    },

    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },

    async GetAvatarUrl(url: string | null) {
      if (url && url.match(/^(http|https):\/\//)) {
        this.avatar = url
        return
      }
      const { data, error } = await supabase.storage.from('avatars').download(url)
      if (error) {
        this.avatar = null
        return
      }
      this.avatar = URL.createObjectURL(data)
    }
  }
})
