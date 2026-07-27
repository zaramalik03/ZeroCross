"use client"
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ── Types ─────────────────────────────────────────────────
type PlaceResult = {
  id:                   number
  name:                 string
  category:             string | null
  ranking:              1 | 2 | 3 | null
  culturalCuisine:      string | null
  description:          string | null
  city:                 string
  state:                string
  streetAddress:        string | null
  website:              string | null
  phone:                string | null
  isDedicatedFacility:  boolean
  isCertified:          boolean
  trainedStaff:         boolean | null
  writtenAllergenMenu:  boolean | null
  knowBeforeYouGo:      string | null
  verified:             boolean | null
  freeOf:               string[]
  contains:             string[]
  mayContain:           string[]
  dietTags:             string[]
}

const RANKING_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Dedicated Allergen-Free Facility', color: '#065F46', bg: '#D1FAE5' },
  2: { label: 'Allergen-Free Menu Available',     color: '#1E40AF', bg: '#DBEAFE' },
  3: { label: 'Limited Allergen-Free Options',    color: '#92400E', bg: '#FEF3C7' },
}

const DINING_CATEGORIES = [
  { category: 'Bakery',            symbol: '🥐' },
  { category: 'Cafe',              symbol: '☕' },
  { category: 'Restaurant',        symbol: '🍽️' },
  { category: 'Food Truck',        symbol: '🚚' },
  { category: 'Health Food Store', symbol: '🌿' },
]

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

export default function DiningPage() {
  const [results, setResults]                   = useState<PlaceResult[]>([])
  const [loading, setLoading]                   = useState(true)
  const [error, setError]                       = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCulture, setSelectedCulture]   = useState<string | null>(null)
  const [selectedRanking, setSelectedRanking]   = useState<number | null>(null)
  const [search, setSearch]                     = useState('')

  const fetchPlaces = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.set('state', 'TN')
      if (selectedCategory)       params.set('category', selectedCategory)
      if (selectedCulture)        params.set('culture',  selectedCulture)
      if (selectedRanking)        params.set('ranking',  String(selectedRanking))
      if (search.trim())          params.set('q',        search.trim())

      const res = await fetch(`/api/places?${params.toString()}`)
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const json = await res.json()
      setResults(json.data ?? [])
    } catch {
      setError('Could not load dining spots. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, selectedCulture, selectedRanking, search])

  useEffect(() => {
    fetchPlaces()
  }, [fetchPlaces])

  return (
    <div style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#226580' }}>
            Dining
          </p>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#151b3a' }}
            className="text-4xl lg:text-5xl mb-3">
            Discover Places
          </h1>
          <p style={{ color: '#151b3a' }} className="text-base max-w-xl">
            Explore allergen-free dining options verified for safety. Ranked by how safely
            they accommodate dietary restrictions.
          </p>
        </div>
      </div>

      {/* ── Category filters ── */}
      <div style={{ borderBottom: '1px solid #D1D5DB' }} className="px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
            style={!selectedCategory
              ? { backgroundColor: '#151b3a', color: '#FAF7F0', borderColor: '#151b3a' }
              : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }}
          >
            All Types
          </button>
          {DINING_CATEGORIES.map(c => (
            <button
              key={c.category}
              onClick={() => setSelectedCategory(selectedCategory === c.category ? null : c.category)}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={selectedCategory === c.category
                ? { backgroundColor: '#151b3a', color: '#FAF7F0', borderColor: '#151b3a' }
                : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }}
            >
              {c.symbol} {c.category}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cultural cuisine filters ── */}
      <div style={{ borderBottom: '1px solid #D1D5DB' }} className="px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCulture(null)}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
            style={!selectedCulture
              ? { backgroundColor: '#226580', color: '#FAF7F0', borderColor: '#226580' }
              : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }}
          >
            All Cuisines
          </button>
          {CULTURAL_CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCulture(selectedCulture === c.id ? null : c.id)}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={selectedCulture === c.id
                ? { backgroundColor: '#226580', color: '#FAF7F0', borderColor: '#226580' }
                : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }}
            >
              {c.flag} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Ranking filter ── */}
      <div className="px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {([1, 2, 3] as const).map(r => {
            const meta = RANKING_LABELS[r]
            return (
              <button
                key={r}
                onClick={() => setSelectedRanking(selectedRanking === r ? null : r)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
                style={selectedRanking === r
                  ? { backgroundColor: meta.color, color: '#FFFFFF', borderColor: meta.color }
                  : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }}
              >
                Rank {r} — {meta.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or city..."
            className="w-full max-w-lg px-5 py-3 rounded-full text-sm outline-none border"
            style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
          />
        </div>
      </div>

      {/* ── Results ── */}
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
                <button onClick={fetchPlaces} className="ml-2 underline">Retry</button>
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
          <div className="grid grid-cols-1 gap-5">
            {results.map(item => {
              const rankMeta = item.ranking ? RANKING_LABELS[item.ranking] : null
              return (
                <Link
                  key={item.id}
                  href={`/places/${item.id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                    style={{
                      border: '1px solid #E5E7EB',
                      // Subtle lift on hover — signals clickability
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
                          {item.streetAddress && `${item.streetAddress} · `}
                          {item.city}, {item.state}
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
                    {(item.freeOf?.length > 0 ||
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
                    )}

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
                      {item.trainedStaff && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{ backgroundColor: '#F3E8FF', color: '#6B21A8' }}
                        >
                          👨‍🍳 Trained Staff
                        </span>
                      )}
                      {item.writtenAllergenMenu && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                        >
                          📋 Written Allergen Menu
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
                    {item.knowBeforeYouGo && (
                      <div
                        className="rounded-xl px-4 py-3 mt-2"
                        style={{ backgroundColor: '#FEF3C7', borderLeft: '3px solid #E8A020' }}
                      >
                        <p className="text-xs font-semibold mb-1" style={{ color: '#92400E' }}>
                          Know before you go
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: '#78350F' }}>
                          {item.knowBeforeYouGo}
                        </p>
                      </div>
                    )}

                    {/* Footer row — website + "View details" cue */}
                    <div
                      className="flex items-center justify-between mt-3 pt-3"
                      style={{ borderTop: '1px solid #F3F4F6' }}
                    >
                      <div>
                        {item.website && (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium underline"
                            style={{ color: '#226580' }}
                            onClick={e => e.stopPropagation()}
                          >
                            Visit website →
                          </a>
                        )}
                      </div>
                      {/* Visual cue that the card is clickable */}
                      <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
                        View details →
                      </span>
                    </div>

                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
