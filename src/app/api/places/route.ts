import { NextRequest, NextResponse } from 'next/server'
import { getPlaces } from '@/lib/db/places'
import { eq, and, ilike, inArray, SQL } from 'drizzle-orm'
import { places } from '@/lib/db/schema'
import { db } from '@/lib/db'
 
export const runtime = 'nodejs'
export const revalidate = 300  // cache for 5 minutes
 
export async function GET(req: NextRequest) {
  try {
    const p = req.nextUrl.searchParams
 
    const filters = {
      city:           p.get('city')    ?? undefined,
      state:          p.get('state')   ?? undefined,
      category:       p.get('category') ?? undefined,
      culture:        p.get('culture')  ?? undefined,
      ranking:        p.get('ranking')  ? parseInt(p.get('ranking')!) : undefined,
      search:         p.get('q')        ?? undefined,
      // avoidAllergens: p.get('avoid')    ? p.get('avoid')!.split(',') : [],
      isDedicated:    p.get('is_dedicated_facility') === 'true',
      isCertified:    p.get('is_certified') === 'true',
      trainedStaff:   p.get('trained_staff') === 'true',
      writtenMenu:    p.get('written_allergen_menu') === 'true',
    }
    const results = await getPlaces(filters)
    const conditions: SQL[] = [
      eq(places.active, true),
    ]
    if (filters.state)    conditions.push(eq(places.state, filters.state))
    if (filters.city)     conditions.push(ilike(places.city, `%${filters.city}%`))
    if (filters.category) conditions.push(eq(places.category, filters.category))
    if (filters.ranking)  conditions.push(eq(places.ranking, filters.ranking))
    if (filters.search)   conditions.push(ilike(places.name,  `%${filters.search}%`))
    if (filters.culture)  conditions.push(ilike(places.culturalCuisine, `%${filters.culture}%`))

    const placeRows = await db
    .select()
    .from(places)
    .where(and(...conditions))
    .orderBy(places.ranking, places.city, places.name)
    .limit(100)

    if (placeRows.length === 0) {
      return NextResponse.json({ data: [], count: 0 })
    }

    // const placeIds = placeRows.map(r => r.id)
 
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
