import { NextResponse } from 'next/server'
import pg from 'pg'

const SQL = `
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

CREATE INDEX IF NOT EXISTS idx_agentgate_sites_category ON agentgate_sites(category);
CREATE INDEX IF NOT EXISTS idx_agentgate_sites_snippet_id ON agentgate_sites(snippet_id);

ALTER TABLE agentgate_sites ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agentgate_sites' AND policyname = 'Allow public read') THEN
    CREATE POLICY "Allow public read" ON agentgate_sites FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agentgate_sites' AND policyname = 'Allow public insert') THEN
    CREATE POLICY "Allow public insert" ON agentgate_sites FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agentgate_sites' AND policyname = 'Allow public update') THEN
    CREATE POLICY "Allow public update" ON agentgate_sites FOR UPDATE USING (true);
  END IF;
END $$;
`

export async function GET() {
  const ref = 'dtfhraicexuerdxxybpo'
  const password = 'u6kt8LOYH32tBGIY'

  const configs = [
    { name: 'Direct', connectionString: `postgresql://postgres:${password}@db.${ref}.supabase.co:5432/postgres` },
    { name: 'Pooler6543', connectionString: `postgresql://postgres.${ref}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres` },
    { name: 'Pooler5432', connectionString: `postgresql://postgres.${ref}:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres` },
  ]

  for (const config of configs) {
    try {
      const client = new pg.Client({
        connectionString: config.connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000,
      })
      await client.connect()
      await client.query(SQL)
      const tables = await client.query("SELECT tablename FROM pg_tables WHERE tablename = 'agentgate_sites'")
      await client.end()
      return NextResponse.json({ success: true, method: config.name, tables: tables.rows })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.log(`${config.name} failed: ${message}`)
      continue
    }
  }

  return NextResponse.json({ error: 'All connection methods failed' }, { status: 500 })
}
