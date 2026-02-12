-- AgentGate Schema
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS agentgate_sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  snippet_id TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Other',
  email TEXT,
  tools JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for directory queries
CREATE INDEX IF NOT EXISTS idx_agentgate_sites_category ON agentgate_sites(category);
CREATE INDEX IF NOT EXISTS idx_agentgate_sites_snippet_id ON agentgate_sites(snippet_id);

-- Enable RLS
ALTER TABLE agentgate_sites ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (directory is public)
CREATE POLICY "Allow public read" ON agentgate_sites
  FOR SELECT USING (true);

-- Allow anyone to insert (registration is open)
CREATE POLICY "Allow public insert" ON agentgate_sites
  FOR INSERT WITH CHECK (true);

-- Allow updates by snippet_id (for tool registration)
CREATE POLICY "Allow public update" ON agentgate_sites
  FOR UPDATE USING (true);
