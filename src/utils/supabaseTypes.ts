export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      class: {
        Row: {
          createdAt: string | null
          id: number
        }
        Insert: {
          createdAt?: string | null
          id?: number
        }
        Update: {
          createdAt?: string | null
          id?: number
        }
        Relationships: []
      }
      session: {
        Row: {
          classId: number | null
          createdAt: string | null
          id: number
        }
        Insert: {
          classId?: number | null
          createdAt?: string | null
          id?: number
        }
        Update: {
          classId?: number | null
          createdAt?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "session_classId_fkey"
            columns: ["classId"]
            referencedRelation: "class"
            referencedColumns: ["id"]
          }
        ]
      }
      sessionUser: {
        Row: {
          createdAt: string | null
          id: number
          sessionId: number | null
          telegramUsername: string | null
        }
        Insert: {
          createdAt?: string | null
          id?: number
          sessionId?: number | null
          telegramUsername?: string | null
        }
        Update: {
          createdAt?: string | null
          id?: number
          sessionId?: number | null
          telegramUsername?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessionUser_sessionId_fkey"
            columns: ["sessionId"]
            referencedRelation: "session"
            referencedColumns: ["id"]
          }
        ]
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
