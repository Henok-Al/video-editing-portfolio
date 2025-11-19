import { NextResponse } from 'next/server'
import { getServiceClient } from '@/app/lib/supabaseServer'

export async function GET() {
  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_index', { ascending: true })
      .eq('visibility', 'published')
    
    if (error) throw error
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' }, 
      { status: 500 }
    )
  }
}