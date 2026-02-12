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

const password = 'u6kt8LOYH32tBGIY'
const ref = 'dtfhraicexuerdxxybpo'

// Try multiple connection formats
const configs = [
  {
    name: 'Pooler transaction mode',
    connectionString: `postgresql://postgres.${ref}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'Pooler session mode',
    connectionString: `postgresql://postgres.${ref}:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`,
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'Direct IPv6',
    connectionString: `postgresql://postgres:${password}@db.${ref}.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'Pooler us-east-2',
    connectionString: `postgresql://postgres.${ref}:${password}@aws-0-us-east-2.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false }
  },
]

async function tryConnect(config) {
  console.log(`Trying: ${config.name}...`)
  const client = new pg.Client({
    connectionString: config.connectionString,
    ssl: config.ssl,
    connectionTimeoutMillis: 10000,
  })
  try {
    await client.connect()
    console.log(`  Connected via ${config.name}!`)
    const result = await client.query('SELECT 1 as test')
    console.log('  Test query OK:', result.rows[0])

    console.log('  Running schema SQL...')
    await client.query(SQL)
    console.log('  Schema created successfully!')

    // Verify
    const tables = await client.query("SELECT tablename FROM pg_tables WHERE tablename = 'agentgate_sites'")
    console.log('  Table verified:', tables.rows)

    await client.end()
    return true
  } catch (err) {
    console.log(`  Failed: ${err.message}`)
    try { await client.end() } catch(e) {}
    return false
  }
}

async function main() {
  for (const config of configs) {
    const success = await tryConnect(config)
    if (success) {
      console.log('\nDone! Table agentgate_sites is ready.')
      process.exit(0)
    }
  }
  console.log('\nAll connection methods failed.')
  process.exit(1)
}

main()
