import { db } from './index'
import { ingredients } from './schema'
import { eq, and, desc } from 'drizzle-orm'

// export type IngredientFilters = {
//   city?:              string
//   state?:             string
//   cuisine?:           string
//   listingType?:       string
//   isDedicated?:       boolean
//   isCertified?:       boolean
//   freeOfGluten?:      boolean
//   freeOfWheat?:       boolean
//   freeOfPeanut?:      boolean
//   freeOfTreeNut?:     boolean
//   freeOfDairy?:       boolean
//   freeOfEgg?:         boolean
//   freeOfSoy?:         boolean
//   freeOfFish?:        boolean
//   freeOfShellfish?:   boolean
//   freeOfSesame?:      boolean
// }

// export async function getIngredients(filters: IngredientFilters) {
//   const conditions = [eq(ingredients.isActive, true)]
 
//   if (filters.isDedicated)
//     conditions.push(eq(ingredients.isDedicatedFacility, true))
//   if (filters.isCertified)
//     conditions.push(eq(ingredients.isCertified, true))
 
//   // Allergen filters — only add when user has selected that allergen
//   if (filters.freeOfGluten)
//     conditions.push(eq(ingredients.freeOfGluten, true))
//   if (filters.freeOfPeanut)
//     conditions.push(eq(ingredients.freeOfPeanut, true))
//   if (filters.freeOfTreeNut)
//     conditions.push(eq(ingredients.freeOfTreeNut, true))
//   if (filters.freeOfDairy)
//     conditions.push(eq(ingredients.freeOfDairy, true))
//   if (filters.freeOfEgg)
//     conditions.push(eq(ingredients.freeOfEgg, true))
//   if (filters.freeOfSoy)
//     conditions.push(eq(ingredients.freeOfSoy, true))
//   if (filters.freeOfFish)
//     conditions.push(eq(ingredients.freeOfFish, true))
//   if (filters.freeOfShellfish)
//     conditions.push(eq(ingredients.freeOfShellfish, true))
//   if (filters.freeOfSesame)
//     conditions.push(eq(ingredients.freeOfSesame, true))
 
//   return db
//     .select()
//     .from(ingredients)
//     .where(and(...conditions))
//     .orderBy(desc(ingredients.isDedicatedFacility))
//     .limit(50)
// }

