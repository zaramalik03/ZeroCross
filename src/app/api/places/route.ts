import { NextRequest, NextResponse } from 'next/server'
import { getPlaces } from '@/lib/db/places'
 
export const runtime = 'nodejs'
export const revalidate = 300  // cache for 5 minutes
 
export async function GET(req: NextRequest) {
  try {
    const p = req.nextUrl.searchParams
 
    const filters = {
      city:           p.get('city')    ?? undefined,
      state:          p.get('state')   ?? undefined,
      isDedicated:    p.get('is_dedicated_facility') === 'true',
      isCertified:    p.get('is_certified') === 'true',
      trainedStaff:   p.get('trained_staff') === 'true',
      
    }
 
    const results = await getPlaces(filters)
 
    return NextResponse.json(
      { data: results, count: results.length },
      { headers: { 'Cache-Control': 'public, s-maxage=300' } }
    )
  } catch (err) {
    console.error('[/api/places]', err)
    return NextResponse.json(
      { error: 'Failed to fetch place listings' },
      { status: 500 }
    )
  }
}
