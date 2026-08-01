"use client"
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ── Types ─────────────────────────────────────────────────
type ProductResult = {
  id:                   number
  name:                 string
  category:             string | null
  ranking:              1 | 2 | 3 | null
  culturalCuisine:      string | null
  description:          string | null
  isDedicatedFacility:  boolean
  isCertified:          boolean
  knowBeforeYouBuy:     string | null
  whereToBuy:           string | null
  verified:             boolean | null
  freeOf:               string[]
  contains:             string[]
  mayContain:           string[]
  dietTags:             string[]
}

const RANKING_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Dedicated Allergen-Free Facility', color: '#065F46', bg: '#D1FAE5' },
  2: { label: 'Allergen-Free',                    color: '#1E40AF', bg: '#DBEAFE' },
  3: { label: 'May Not Be Allergen-Free',         color: '#92400E', bg: '#FEF3C7' },
}

const PRODUCT_CATEGORIES = [
  { category: 'Bakery',            symbol: '🥐' },
  { category: 'Cafe',              symbol: '☕' },
  { category: 'Restaurant',        symbol: '🍽️' },
  { category: 'Food Truck',        symbol: '🚚' },
  { category: 'Health Food Store', symbol: '🌿' },
]

// const tagColors: Record<string, { bg: string; text: string }> = {
//   'gluten-free': { bg: '#D1FAE5', text: '#065F46' },
//   'vegan': { bg: '#DBEAFE', text: '#1E40AF' },
//   'keto': { bg: '#F3E8FF', text: '#6B21A8' },
//   'paleo': { bg: '#FEF3C7', text: '#92400E' },
//   'tree-nut': { bg: '#FEE2E2', text: '#991B1B' },
//   'nut-free': { bg: '#D1FAE5', text: '#065F46' },
// }

// Add all east asian, south asian, southeast asian, european, middle eastern, latin american, and african categories for groceries
const CULTURAL_CATEGORIES = [
  { id: 'mexican',         label: 'Mexican / Latin',  flag: '🌮' },
  { id: 'japanese',        label: 'Japanese',         flag: '🍱' },
  { id: 'south_asian',     label: 'Indian',           flag: '🍛' },
  { id: 'southeast_asian', label: 'Thai / SE Asian',  flag: '🍜' },
  { id: 'middle_eastern',  label: 'Middle Eastern',   flag: '🌿' },
  { id: 'ethiopian',       label: 'Ethiopian',        flag: '🫘' },
  { id: 'west_african',    label: 'West African',     flag: '🌍' },
  { id: 'korean',          label: 'Korean',           flag: '🥢' },
]
// const getTagStyle = (tag: string) => tagColors[tag] || { bg: '#F3F4F6', text: '#374151' }

export default function GroceriesPage() {
  const [results, setResults]                   = useState<ProductResult[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  // const [selectedFilters, setSelectedFilters]   = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading]                   = useState(true)
  const [error, setError]                       = useState<string | null>(null)
  const [selectedCulture, setSelectedCulture]   = useState<string | null>(null)
  const [selectedRanking, setSelectedRanking]   = useState<number | null>(null) 

  // const filtered = useMemo(() => {
  //   return results.filter((grocery) => {
  //     const catOk = !selectedCategory || grocery.category === selectedCategory
  //     const searchOk = !search || grocery.name.toLowerCase().includes(search.toLowerCase())
  //     const filterOk = selectedFilters.length === 0 || selectedFilters.every(f => grocery.dietaryTags.includes(f))
  //     return catOk && searchOk && filterOk
  //   })
  // }, [selectedCategory, selectedFilters, search])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (selectedCategory)       params.set('category', selectedCategory)
      if (selectedCulture)        params.set('culture',  selectedCulture)
      if (selectedRanking)        params.set('ranking',  String(selectedRanking))
      if (search.trim())          params.set('q',        search.trim())

      const res = await fetch(`/api/products?${params.toString()}`)
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const json = await res.json()
      setResults(json.data ?? [])
    } catch {
      setError('Could not load product. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, selectedCulture, selectedRanking, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="page-shell px-6 lg:px-12 py-12">
      <div className="page-header px-6 lg:px-12 py-4">
        <h1 className="section-title mb-3">Discover Products</h1>
        <p className="section-body max-w-xl">
          Explore a curated selection of allergen-free products, verified for safety and quality. From gluten-free to nut-free, find products that fit your dietary needs.
        </p>
      </div>

      {/* Category scroll strip */}
      <div style={{ backgroundColor: '#e2efef', borderBottom: '1px solid #E5E7EB' }} className="px-6 lg:px-12 py-4">
        <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#151b3a' }}
            className="text-2xl lg:text-3xl mb-3">
            Which category do you prefer?
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <button className="rounded-3xl border p-5 text-left transition border-border bg-white hover:border-primary/60">
            <span className="text-3xl">🍱</span>
            <h2 className="mt-3 text-lg font-semibold">Grab&Go Meals</h2>
            {/* <p className="mt-1 text-xs">Sit-Down Restaurants and Casual Dining</p> */}
          </button>
          <button className="rounded-3xl border p-5 text-left transition border-border bg-white hover:border-primary/60">
            <span className="text-3xl">🧁</span>
            <h2 className="mt-3 text-lg font-semibold">Desserts</h2>
            {/* <p className="mt-1 text-xs">Order Ahead for Takeout</p> */}
          </button>
          <button className="rounded-3xl border p-5 text-left transition border-border bg-white hover:border-primary/60">
            <span className="text-3xl">🥨</span>
            <h2 className="mt-3 text-lg font-semibold">Snacks</h2>
            {/* <p className="mt-1 text-xs">Find Dedicated Baked Goods</p> */}
          </button>
        </div>
        {/* <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
            style={!selectedCategory
              ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
              : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
            }
          >
            All
          </button>
          {PRODUCT_CATEGORIES.map((c) => (
            <button
              key={c.category}
              onClick={() => setSelectedCategory(c.category)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={selectedCategory === c.category
                ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
                : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
              }
            >
              {c.symbol} {c.category}
            </button>
          ))}
        </div> */}
      </div>
      {/* ── Category filters ── */}
      <div style={{ borderBottom: '1px solid #D1D5DB'}} className="px-6 lg:px-12 py-3">
        <div className="bg-white mt-10 flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-card p-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Culture</label>
            <select className="mt-2 rounded-full border border-border bg-white px-4 py-2 text-sm">
              {CULTURAL_CATEGORIES.map(c => (
                <option
                  key={c.id}
                  onClick={() => setSelectedCulture(selectedCulture === c.id ? null : c.id)}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
                  style={selectedCulture === c.id
                    ? { backgroundColor: '#226580', color: '#FAF7F0', borderColor: '#226580' }
                    : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }}
                >
                  {c.flag} {c.label}
                </option>
              ))}
            </select>
          </div>
        {/* ── Search ── */}
        <div>
          <div className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-primary">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
            />
          </div>
        </div>
        <button className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary">Clear all</button>
      </div>
    </div>
      {/* ── Cultural cuisine filters ── */}
      {/* <div style={{ backgroundColor: '#e2efef', borderBottom: '1px solid #E5E7EB' }} className="px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCulture(null)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
            style={!selectedCategory
              ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
              : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
            }
          >
            All
          </button>
          {CULTURAL_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.label)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={selectedCategory === category.label
                ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
                : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
              }
            >
              {category.label}
            </button>
          ))}
        </div>
      </div> */}
      {/* Search */}
      <div className="px-6 lg:px-12 py-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for groceries..."
          className="w-full px-5 py-3 rounded-full text-sm outline-none border"
          style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
        />
      </div>
      {/* List of product results */}
      <div className="px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Status bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: '#4A5568' }}>
              {loading
                ? 'Loading...'
                : `${results.length} place${results.length !== 1 ? 's' : ''} found`}
            </p>
            {error && (
              <p className="text-sm font-medium" style={{ color: '#991B1B' }}>
                {error}
                <button onClick={fetchProducts} className="ml-2 underline">Retry</button>
              </p>
            )}
          </div>
          {/* Empty state */}
          {!loading && !error && results.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold" style={{ color: '#151b3a' }}>
                No places match your filters
              </p>
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                Try adjusting the category, cuisine, or ranking filters
              </p>
            </div>
          )}
          <div className="px-6 lg:px-12 py-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(item => {
                  const rankMeta = item.ranking ? RANKING_LABELS[item.ranking] : null
                  return (
                    <Link
                      href={`products/${item.id}`}
                      key={item.id}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div
                        className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                        style={{
                          border: '1px solid #E5E7EB',
                          transition: 'box-shadow 0.15s, transform 0.15s',
                        }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3
                              className="text-base font-semibold"
                              style={{ color: '#151b3a' }}
                            >
                              {item.name}
                            </h3>
                            <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>
                              {item.category && ` · ${item.category}`}
                            </p>
                            {item.culturalCuisine && (
                              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                                {item.culturalCuisine}
                              </p>
                            )}
                          </div>
                          {/* Ranking badge */}
                          {rankMeta && (
                            <span
                              className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                              style={{ backgroundColor: rankMeta.bg, color: rankMeta.color }}
                            >
                              Rank {item.ranking} — {rankMeta.label}
                            </span>
                          )}
                        </div>
                        {/* Description */}
                        {item.description && (
                          <p
                            className="text-sm mb-3 leading-relaxed"
                            style={{ color: '#374151' }}
                          >
                            {item.description}
                          </p>
                        )}

                        {/* Allergen badges */}
                        {/* {(item.freeOf?.length > 0 ||
                          item.contains?.length > 0 ||
                          item.mayContain?.length > 0) && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {item.freeOf?.map(a => (
                              <span
                                key={`free-${a}`}
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                              >
                                ✓ {a}-free
                              </span>
                            ))}
                            {item.mayContain?.map(a => (
                              <span
                                key={`may-${a}`}
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                              >
                                ⚠ may contain {a}
                              </span>
                            ))}
                            {item.contains?.map(a => (
                              <span
                                key={`has-${a}`}
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
                              >
                                ✗ contains {a}
                              </span>
                            ))}
                          </div>
                        )} */}

                        {/* Safety flags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.isDedicatedFacility && (
                            <span
                              className="text-xs px-2.5 py-1 rounded-full font-semibold"
                              style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                            >
                              🏭 Dedicated Facility
                            </span>
                          )}
                          {item.isCertified && (
                            <span
                              className="text-xs px-2.5 py-1 rounded-full font-semibold"
                              style={{ backgroundColor: '#DBEAFE', color: '#1E40AF' }}
                            >
                              ✓ Certified
                            </span>
                          )}
                          {/* {item.verified && (
                            <span
                              className="text-xs px-2.5 py-1 rounded-full font-semibold"
                              style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                            >
                              ✓ ZeroCross Verified
                            </span>
                          )} */}
                        </div>

                        {/* Know before you go */}
                        {item.knowBeforeYouBuy && (
                          <div
                            className="rounded-xl px-4 py-3 mt-2"
                            style={{ backgroundColor: '#FEF3C7', borderLeft: '3px solid #E8A020' }}
                          >
                            <p className="text-xs font-semibold mb-1" style={{ color: '#92400E' }}>
                              Know before you buy
                            </p>
                            <p className="text-xs leading-relaxed" style={{ color: '#78350F' }}>
                              {item.knowBeforeYouBuy}
                            </p>
                          </div>
                        )}      
                        <div
                          className="flex items-center justify-between mt-3 pt-3"
                          style={{ borderTop: '1px solid #F3F4F6' }}
                        >
                          <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
                            View details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
      
                {/* {filtered.map((grocery) => (
                    <div key={grocery.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-lg font-semibold mb-2">{grocery.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{grocery.category}</p> */}
                        {/* <div className="flex flex-wrap gap-2">
                            {grocery.dietaryTags.map((tag) => {
                                const style = getTagStyle(tag)
                                return (
                                    <span
                                        key={tag}
                                        className="text-xs font-semibold px-2 py-1 rounded"
                                        style={{ backgroundColor: style.bg, color: style.text }}
                                    >
                                        {tag}
                                    </span>
                                )
                            })}
                        </div> */}
                    {/* </div>
                ))} */}
              </div>
              </div>
          </div>
        </div>
    </div>
  ) 
}
