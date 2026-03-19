-- src/config/schema.sql

-- Tabla principal de propuestas
CREATE TABLE public.proposals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    company TEXT NOT NULL,
    service_type TEXT NOT NULL CHECK (service_type IN ('ecommerce', 'web', 'app', 'marketing')),
    price NUMERIC NOT NULL,
    timeline TEXT NOT NULL,
    
    -- Campos custom para sobreescribir contenido default
    custom_hero_title TEXT,
    custom_hero_subtitle TEXT,
    custom_about TEXT,
    custom_scope JSONB,
    custom_results JSONB,
    custom_process JSONB,
    custom_requirements JSONB,
    custom_conditions JSONB,
    
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Políticas RLS (Row Level Security)
-- Activar RLS
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Permisos RLS
CREATE POLICY "Permitir lectura publica condicionada" ON public.proposals
FOR SELECT USING (true);
-- NOTA: Insert, Update y Delete son manejados vía backend de Next.js de forma segura (Service Role Key).

-- ** FASE V: CMS VISUAL AVANZADO **
-- Migración para actualizar la tabla y añadir configuración visual (ejecutar si la tabla ya existe)
ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS theme_config JSONB DEFAULT '{}'::jsonb;

-- Permitir inserts/updates solo para roles autenticados de supabase, o si usamos anon key y queremos que el backend Next.js API limite,
-- entonces se usaría el service_role key en los endpoints de Next.js para saltar RLS y hacer las mutaciones.
```
