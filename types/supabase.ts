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
      EMPLOYEES: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          name: string | null
          phone_number: number | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone_number?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone_number?: number | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
