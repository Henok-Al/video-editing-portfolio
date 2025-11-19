import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Create a single supabase client instance (singleton pattern)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided!')
}

// Create singleton instance for client-side operations
const supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Create singleton instance for server-side operations (bypasses RLS)
let supabaseServiceClient: ReturnType<typeof createSupabaseClient> | null = null

// Export function to get the client instance
export function getClient() {
  return supabaseClient
}

// Export function to get the service client instance (for server-side operations)
export function getServiceClient() {
  // If service key is not provided, fall back to regular client with a warning
  if (!supabaseServiceKey) {
    console.warn('Supabase Service Role Key not provided. Using regular client which may have RLS restrictions.')
    return supabaseClient
  }
  
  if (!supabaseServiceClient) {
    supabaseServiceClient = createSupabaseClient(supabaseUrl!, supabaseServiceKey)
  }
  
  return supabaseServiceClient
}