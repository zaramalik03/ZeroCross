import { NextRequest, NextResponse } from 'next/server'
import { auth }    from '@clerk/nextjs/server'
import { db }      from '@/lib/db/index'
import {
  userProfiles, diningAreas, groceryProducts,
  ingredients, cateringServices
} from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
 
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
 
  // 1. Load user profile
  const [profile] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.id, userId))
    .limit(1)
 
  if (!profile) {
    return NextResponse.json({ needsOnboarding: true })
  }
 
  // 2. Build allergen conditions from profile
  //    Only add a condition if the user actually avoids that allergen
  //    This is the noise-removal step — unselected allergens add zero conditions
  const buildConditions = (table: any) => {
    const conds = [eq(table.isActive, true)]
    if (profile.avoidGluten)    conds.push(eq(table.freeOfGluten,    true))
    if (profile.avoidWheat)     conds.push(eq(table.freeOfWheat,     true))
    if (profile.avoidPeanut)    conds.push(eq(table.freeOfPeanut,    true))
    if (profile.avoidTreeNut)   conds.push(eq(table.freeOfTreeNut,   true))
    if (profile.avoidDairy)     conds.push(eq(table.freeOfDairy,     true))
    if (profile.avoidEgg)       conds.push(eq(table.freeOfEgg,       true))
    if (profile.avoidSoy)       conds.push(eq(table.freeOfSoy,       true))
    if (profile.avoidFish)      conds.push(eq(table.freeOfFish,      true))
    if (profile.avoidShellfish) conds.push(eq(table.freeOfShellfish, true))
    if (profile.avoidSesame)    conds.push(eq(table.freeOfSesame,    true))
    if (profile.prefVegan)      conds.push(eq(table.dietVegan,       true))
    if (profile.prefHalal)      conds.push(eq(table.dietHalal,       true))
    if (profile.prefKosher)     conds.push(eq(table.dietKosher,      true))
    return and(...conds)
  }
 
  // 3. Run all four queries in parallel
  const [dining, products, ings, catering] = await Promise.all([
    db.select().from(diningAreas)
      .where(buildConditions(diningAreas))
      .orderBy(desc(diningAreas.isDedicatedFacility),
               desc(diningAreas.rating))
      .limit(12),
 
    db.select().from(groceryProducts)
      .where(buildConditions(groceryProducts))
      .limit(12),
 
    db.select().from(ingredients)
      .where(eq(ingredients.isActive, true))
      .limit(12),
 
    db.select().from(cateringServices)
      .where(buildConditions(cateringServices))
      .limit(6),
  ])
 
  return NextResponse.json({
    profile: {
      displayName:   profile.displayName,
      avoidingCount: Object.entries(profile)
        .filter(([k,v]) => k.startsWith('avoid') && v === true).length
    },
    dining,
    products,
    ingredients: ings,
    catering,
  })
}
