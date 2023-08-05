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
      group: {
        Row: {
          chatId: number | null
          id: number
          name: string | null
        }
        Insert: {
          chatId?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          chatId?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      session: {
        Row: {
          classId: number | null
          createdAt: string | null
          currentSessionUserId: number | null
          id: number
          teacherUsername: string | null
        }
        Insert: {
          classId?: number | null
          createdAt?: string | null
          currentSessionUserId?: number | null
          id?: number
          teacherUsername?: string | null
        }
        Update: {
          classId?: number | null
          createdAt?: string | null
          currentSessionUserId?: number | null
          id?: number
          teacherUsername?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_classId_fkey"
            columns: ["classId"]
            referencedRelation: "class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_currentSessionUserId_fkey"
            columns: ["currentSessionUserId"]
            referencedRelation: "sessionUser"
            referencedColumns: ["id"]
          }
        ]
      }
      sessionUser: {
        Row: {
          createdAt: string | null
          id: number
          name: string | null
          sessionId: number | null
          telegramUsername: string | null
        }
        Insert: {
          createdAt?: string | null
          id?: number
          name?: string | null
          sessionId?: number | null
          telegramUsername?: string | null
        }
        Update: {
          createdAt?: string | null
          id?: number
          name?: string | null
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
      userRealName: {
        Row: {
          created_at: string | null
          id: number
          realName: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          realName?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          realName?: string | null
          username?: string | null
        }
        Relationships: []
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
