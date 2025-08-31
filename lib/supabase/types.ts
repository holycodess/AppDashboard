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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'superadmin' | 'staff' | 'vendor' | 'user'
          type: 'SuperAdmin' | 'Account' | 'Support' | 'Media' | 'Partner' | 'Supplier' | 'PublicUser'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'superadmin' | 'staff' | 'vendor' | 'user'
          type?: 'SuperAdmin' | 'Account' | 'Support' | 'Media' | 'Partner' | 'Supplier' | 'PublicUser'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'superadmin' | 'staff' | 'vendor' | 'user'
          type?: 'SuperAdmin' | 'Account' | 'Support' | 'Media' | 'Partner' | 'Supplier' | 'PublicUser'
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          table_name: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          created_at?: string
        }
      }
    }
  }
}