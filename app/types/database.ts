export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          youtube_id: string | null
          thumbnail_url: string | null
          description: string | null
          categories: string[] | null
          format: string | null
          duration_seconds: number | null
          tools: string[] | null
          role: string | null
          visibility: string
          sort_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          youtube_id?: string | null
          thumbnail_url?: string | null
          description?: string | null
          categories?: string[] | null
          format?: string | null
          duration_seconds?: number | null
          tools?: string[] | null
          role?: string | null
          visibility?: string
          sort_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          youtube_id?: string | null
          thumbnail_url?: string | null
          description?: string | null
          categories?: string[] | null
          format?: string | null
          duration_seconds?: number | null
          tools?: string[] | null
          role?: string | null
          visibility?: string
          sort_index?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Project = Database['public']['Tables']['projects']['Row']
export type InsertProject = Database['public']['Tables']['projects']['Insert']
export type UpdateProject = Database['public']['Tables']['projects']['Update']