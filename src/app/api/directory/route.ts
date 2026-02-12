import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  const category = searchParams.get('category')

  let query = supabase
    .from('agentgate_sites')
    .select('snippet_id, url, name, category, tools, created_at')
    .order('created_at', { ascending: false })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  if (q) {
    query = query.or(`name.ilike.%${q}%,url.ilike.%${q}%,category.ilike.%${q}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    count: data?.length || 0,
    sites: data?.map(site => ({
      name: site.name,
      url: site.url,
      category: site.category,
      tools: site.tools || [],
    })) || [],
  })
}
