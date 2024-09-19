import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkapoxiiqyxhybjzozyo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseKey) throw new Error('supabaseKey is required.')

export const supabase = createClient(supabaseUrl, supabaseKey)