// src/lib/db/schema.ts
import {
  pgTable, pgEnum, text, boolean, numeric,
  integer, timestamp, date, jsonb, index
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// ── Enums ──────────────────────────────────────────────────
export const listingTypeEnum = pgEnum('listing_type', [
  'restaurant', 'bakery', 'cafe', 'food_truck',
  'convenience_store', 'grocery_store', 'health_food_store',
  'catering', 'farmers_market', 'college_dining', 'hotel_kitchen'
])

export const ccRiskEnum = pgEnum('cc_risk', [
  'none', 'low', 'moderate', 'high', 'unknown'
])

export const verifiedByEnum = pgEnum('verified_by_type', [
  'community', 'self_reported', 'third_party'
])

// ── Shared allergen columns (reused across tables) ─────────
// const allergenColumns = {
//   freeOfGluten:    boolean('free_of_gluten'),
//   freeOfWheat:     boolean('free_of_wheat'),
//   freeOfPeanut:    boolean('free_of_peanut'),
//   freeOfTreeNut:   boolean('free_of_tree_nut'),
//   freeOfDairy:     boolean('free_of_dairy'),
//   freeOfEgg:       boolean('free_of_egg'),
//   freeOfSoy:       boolean('free_of_soy'),
//   freeOfFish:      boolean('free_of_fish'),
//   freeOfShellfish: boolean('free_of_shellfish'),
//   freeOfSesame:    boolean('free_of_sesame'),
//   freeOfMustard:   boolean('free_of_mustard'),
//   freeOfCelery:    boolean('free_of_celery'),
//   freeOfLupin:     boolean('free_of_lupin'),
//   freeOfSulphites: boolean('free_of_sulphites'),
//   freeOfCorn:      boolean('free_of_corn'),
// }

// const dietColumns = {
//   dietVegan:       boolean('diet_vegan').default(false),
//   dietVegetarian:  boolean('diet_vegetarian').default(false),
//   dietPaleo:       boolean('diet_paleo').default(false),
//   dietKeto:        boolean('diet_keto').default(false),
//   dietKosher:      boolean('diet_kosher').default(false),
//   dietHalal:       boolean('diet_halal').default(false),
//   dietLowFodmap:   boolean('diet_low_fodmap').default(false),
// }

// const auditColumns = {
//   lastVerifiedDate: date('last_verified_date'),
//   verifiedBy:       verifiedByEnum('verified_by').default('community'),
//   isActive:         boolean('is_active').default(true),
//   dateAdded:        timestamp('date_added').defaultNow(),
//   updatedAt:        timestamp('updated_at').defaultNow(),
// }

// ── TABLE: dining_areas ────────────────────────────────────
export const places = pgTable('places', {
  id:                   text('id').primaryKey(),
  name:                 text('name').notNull(),
  category:             text('category'),
  culturalCuisine:      text('cultural_cuisine'),
  description:          text('description'),
  website:              text('website'),
  phone:                text('phone'),
  streetAddress:        text('street_address'),
  city:                 text('city'),
  state:                text('state'),
  zipcode:              text('zipcode'),
  country:              text('country'),
  verified:             boolean('verified'),
  active:               boolean('active'),
  ranking:              integer('ranking'),
  isDedicatedFacility:  boolean('is_dedicated_facility'),
  isCertified:          boolean('is_certified'),
  trainedStaff:         boolean('trained_staff'),
  writtenAllergenMenu:  boolean('written_allergen_menu'),
  // ...allergenColumns,
  // ...dietColumns,
  // ...auditColumns,
  knowBeforeYouGo:   text('know_before_you_go'),
  createdAt:            timestamp('created_at').defaultNow(),
  updatedAt:            timestamp('updated_at').defaultNow(),
}, (table) => ({
  cityIdx:       index('idx_da_city').on(table.city),
  stateIdx:      index('idx_da_state').on(table.state),
  // glutenIdx:     index('idx_da_gluten').on(table.freeOfGluten),
  // peanutIdx:     index('idx_da_peanut').on(table.freeOfPeanut),
  // treeNutIdx:    index('idx_da_tree_nut').on(table.freeOfTreeNut),
  dedicatedIdx:  index('idx_da_dedicated').on(table.isDedicatedFacility),
}))

// ── TABLE: grocery_products ────────────────────────────────
export const products = pgTable('products', {
  id:                  text('id').primaryKey(),
  name:                text('name').notNull(),
  brandName:           text('brand_name').notNull(),
  category:            text('category').notNull(),
  culturalCuisine:     text('cultural_cuisine'),
  description:          text('description'),
  verified:             boolean('verified'),
  active:               boolean('active'),
  ranking:              integer('ranking'),
  isDedicatedFacility: boolean('is_dedicated_facility').notNull(),
  isCertified:         boolean('is_certified').notNull(),
  trainedStaff:         boolean('trained_staff'),
  // ...allergenColumns,
  // ...dietColumns,
  knowBeforeYouBuy:    text('know_before_you_buy'),
  whereToBuy:          text('where_to_buy'),
  // ...auditColumns,
  createdAt:            timestamp('created_at').defaultNow(),
  updatedAt:            timestamp('updated_at').defaultNow(),
}, (table) => ({
  categoryIdx:   index('idx_gp_category').on(table.category),
  // glutenIdx:     index('idx_gp_gluten').on(table.freeOfGluten),
}))

// ── TABLE: ingredients ─────────────────────────────────────
export const ingredients = pgTable('ingredients', {
  id:                  text('id').primaryKey(),
  name:                text('name').notNull(),
  type:                text('type').notNull(),
  cuisineCulture:      text('cuisine_culture'),
  verified:             boolean('verified'),
  active:               boolean('active'),
  ranking:              integer('ranking'),
  // ...allergenColumns,
  createdAt:           timestamp('created_at').defaultNow(),
  updatedAt:           timestamp('updated_at').defaultNow(),
})

// // ── TABLE: listing_staging ─────────────────────────────────
// export const listingStaging = pgTable('listing_staging', {
//   id:            text('id').primaryKey(),
//   source:        text('source').notNull(),
//   rawData:       jsonb('raw_data').notNull(),
//   aiAnalysis:    jsonb('ai_analysis'),
//   confidence:    text('confidence'),
//   status:        text('status').default('pending'),
//   reviewerNotes: text('reviewer_notes'),
//   discoveredAt:  timestamp('discovered_at').defaultNow(),
//   reviewedAt:    timestamp('reviewed_at'),
// })

// ── Types (auto-generated from schema) ────────────────────
export type DiningArea       = typeof places.$inferSelect
export type NewDiningArea    = typeof places.$inferInsert
export type Product          = typeof products.$inferSelect
// export type Ingredient       = typeof ingredients.$inferSelect