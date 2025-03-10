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
      cars: {
        Row: {
          class: Database["public"]["Enums"]["car_class"]
          created_at: string | null
          id: string
          model: string
        }
        Insert: {
          class: Database["public"]["Enums"]["car_class"]
          created_at?: string | null
          id?: string
          model: string
        }
        Update: {
          class?: Database["public"]["Enums"]["car_class"]
          created_at?: string | null
          id?: string
          model?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          city: string | null
          country_id: string | null
          created_at: string | null
          id: string
          preferred_car_id: string | null
          preferred_track_id: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          age?: number | null
          city?: string | null
          country_id?: string | null
          created_at?: string | null
          id: string
          preferred_car_id?: string | null
          preferred_track_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          age?: number | null
          city?: string | null
          country_id?: string | null
          created_at?: string | null
          id?: string
          preferred_car_id?: string | null
          preferred_track_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_preferred_car_id_fkey"
            columns: ["preferred_car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_preferred_track_id_fkey"
            columns: ["preferred_track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      races: {
        Row: {
          car_id: string | null
          created_at: string | null
          driver_rating_change: number | null
          finish_position: number | null
          id: string
          incidents: number | null
          notes: string | null
          qualifying_position: number | null
          race_date: string | null
          safety_rating_change: number | null
          start_position: number | null
          track_layout_id: string | null
          user_id: string
        }
        Insert: {
          car_id?: string | null
          created_at?: string | null
          driver_rating_change?: number | null
          finish_position?: number | null
          id?: string
          incidents?: number | null
          notes?: string | null
          qualifying_position?: number | null
          race_date?: string | null
          safety_rating_change?: number | null
          start_position?: number | null
          track_layout_id?: string | null
          user_id: string
        }
        Update: {
          car_id?: string | null
          created_at?: string | null
          driver_rating_change?: number | null
          finish_position?: number | null
          id?: string
          incidents?: number | null
          notes?: string | null
          qualifying_position?: number | null
          race_date?: string | null
          safety_rating_change?: number | null
          start_position?: number | null
          track_layout_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "races_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "races_track_layout_id_fkey"
            columns: ["track_layout_id"]
            isOneToOne: false
            referencedRelation: "track_layouts"
            referencedColumns: ["id"]
          },
        ]
      }
      track_layouts: {
        Row: {
          created_at: string | null
          id: string
          name: string
          track_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          track_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          track_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "track_layouts_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      tracks: {
        Row: {
          country_id: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracks_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
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
      car_class: "Hypercars" | "GTE" | "LMGT3" | "LMP2"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
