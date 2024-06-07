import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import type { Json } from '@/database/types'

type Project = {
  content: Json
  created_at: string
  id: number
  name: string | null
  updated_at: string | null
  user_id: string | null
  uuid: string | null
}

type ProjectShare = {
  created_at: string
  expires_at: string | null
  id: number
  permisison: 'VIEW' | 'EDIT'
  project_id: number | null
  type: 'PUBLIC' | 'PRIVATE'
  updated_at: string | null
}

type ProjectShareUser = {
  created_at: string
  id: number
  project_share_id: number | null
  user_id: string | null
}

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projects: [] as Project[] | null,
    projectShares: [] as ProjectShare[] | null,
    projectShareUsers: [] as ProjectShareUser[] | null
  }),
  actions: {
    async getProjects(user_id: string) {
      const { data, error } = await supabase.from('projects').select('*').eq('user_id', user_id)
      if (error) throw error
      return data
    }
  }
})
