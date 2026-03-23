import { createClient } from '@supabase/supabase-js'

// Hardcoded for reliability - these are public anon keys (safe for client-side)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jgpkaobvgntsoflydrnp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncGthb2J2Z250c29mbHlkcm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTI2MDksImV4cCI6MjA4OTgyODYwOX0.SKnUPnJlXwf6FadsUw8CsPNJoo82MKYz6Vr7AMOTT5U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
