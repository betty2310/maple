export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_share_users: {
        Row: {
          created_at: string
          id: number
          project_share_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          project_share_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          project_share_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_share_users_project_share_id_fkey"
            columns: ["project_share_id"]
            isOneToOne: false
            referencedRelation: "project_shares"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_share_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_shares: {
        Row: {
          created_at: string
          expires_at: string | null
          id: number
          permisison: Database["public"]["Enums"]["share_permision"]
          project_id: number | null
          type: Database["public"]["Enums"]["share_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: number
          permisison?: Database["public"]["Enums"]["share_permision"]
          project_id?: number | null
          type?: Database["public"]["Enums"]["share_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: number
          permisison?: Database["public"]["Enums"]["share_permision"]
          project_id?: number | null
          type?: Database["public"]["Enums"]["share_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_shares_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          content: Json | null
          created_at: string
          id: number
          name: string | null
          updated_at: string | null
          user_id: string | null
          uuid: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
          uuid?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
          uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_email_by_user_id: {
        Args: {
          user_id: string
        }
        Returns: {
          email: string
        }[]
      }
      get_user_id_by_email: {
        Args: {
          email: string
        }
        Returns: {
          id: string
        }[]
      }
    }
    Enums: {
      share_permision: "VIEW" | "EDIT"
      share_type: "PUBLIC" | "PRIVATE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
