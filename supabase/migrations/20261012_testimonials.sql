-- ============================================================
-- NextGen Impact Foundation - Testimonials Database Schema
-- Supabase / PostgreSQL Migration
-- ============================================================

-- 1. Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    quote TEXT NOT NULL,
    program TEXT,
    image TEXT,
    email TEXT,
    consent BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    approved_at TIMESTAMPTZ
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials (status);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Public/Anon can read ONLY approved testimonials
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
CREATE POLICY "Public can view approved testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- 5. Policy: Anyone can submit a new testimonial, but it MUST be pending and consent must be true
DROP POLICY IF EXISTS "Public can insert pending testimonials" ON public.testimonials;
CREATE POLICY "Public can insert pending testimonials"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (
    status = 'pending' 
    AND consent = true 
    AND length(trim(name)) > 0 
    AND length(trim(quote)) > 10
);

-- 6. Policy: Service role or Authenticated admin can view, approve, and delete all records
DROP POLICY IF EXISTS "Service role has full access" ON public.testimonials;
CREATE POLICY "Service role has full access"
ON public.testimonials
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

