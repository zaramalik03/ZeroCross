import { NextRequest, NextResponse } from 'next/server'
import { db }              from '@/lib/db/index'
import { diningAreas, groceryProducts,
         ingredients, cateringServices } from '@/lib/db/schema'
import { and, eq, ilike, or } from 'drizzle-orm'
 
export async function GET(req: NextRequest) {
  const query   = req.nextUrl.searchParams.get('q') ?? ''
  const gluten  = req.nextUrl.searchParams.get('gluten')  === 'true'
  const peanut  = req.nextUrl.searchParams.get('peanut')  === 'true'
  const treeNut = req.nextUrl.searchParams.get('tree_nut')=== 'true'
 
  if (query.length < 2) {
    return NextResponse.json({ data: [] })
  }
 
  const allergenFilter = (table: any) => {
    const conds = [eq(table.isActive, true)]
    if (gluten)  conds.push(eq(table.freeOfGluten,  true))
    if (peanut)  conds.push(eq(table.freeOfPeanut,  true))
    if (treeNut) conds.push(eq(table.freeOfTreeNut, true))
    return and(...conds)
  }
 
  const [dining, products, ings, catering] = await Promise.all([
    db.select({ id: diningAreas.id, name: diningAreas.name,
      type: diningAreas.listingType, city: diningAreas.city,
      emoji: diningAreas.emojiIcon, description: diningAreas.description })
      .from(diningAreas)
      .where(and(allergenFilter(diningAreas),
        ilike(diningAreas.name, `%${query}%`))).limit(5),
 
    db.select({ id: groceryProducts.id, name: groceryProducts.name,
      type: groceryProducts.category,
      emoji: groceryProducts.emojiIcon,
      description: groceryProducts.description })
      .from(groceryProducts)
      .where(and(allergenFilter(groceryProducts),
        ilike(groceryProducts.name, `%${query}%`))).limit(5),
 
    db.select({ id: ingredients.id, name: ingredients.name,
      type: ingredients.category,
      emoji: ingredients.emojiIcon,
      description: ingredients.description })
      .from(ingredients)
      .where(ilike(ingredients.name, `%${query}%`)).limit(5),
 
    db.select({ id: cateringServices.id, name: cateringServices.name,
      type: cateringServices.cuisineCulture,
      emoji: cateringServices.emojiIcon,
      description: cateringServices.description })
      .from(cateringServices)
      .where(and(allergenFilter(cateringServices),
        ilike(cateringServices.name, `%${query}%`))).limit(5),
  ])
 
  return NextResponse.json({
    data: [
      ...dining.map(r => ({ ...r, source: 'dining' })),
      ...products.map(r => ({ ...r, source: 'product' })),
      ...ings.map(r => ({ ...r, source: 'ingredient' })),
      ...catering.map(r => ({ ...r, source: 'catering' })),
    ]
  })
}
