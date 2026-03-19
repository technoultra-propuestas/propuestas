import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder';

// Cliente público para uso general (con políticas RLS si aplican)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Validaciones para asegurar que las variables de entorno están presentes
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn("Advertencia: Faltan variables de entorno de Supabase en este entorno de ejecución/compilación.");
}
