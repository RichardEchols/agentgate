import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { snippet_id, tools } = body

  if (!snippet_id || !tools) {
    return NextResponse.json({ error: 'Missing snippet_id or tools' }, { status: 400 })
  }

  const { error } = await supabase
    .from('agentgate_sites')
    .update({ tools })
    .eq('snippet_id', snippet_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
