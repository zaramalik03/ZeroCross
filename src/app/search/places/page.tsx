"use client"
import React from 'react'
import Filter from '@/components/Filter'
import { diningAreas, type DiningArea } from '@/data'

const diningCategories = [
  { category: 'College Campuses', symbol: '🏫' },
  { category: 'Bakeries', symbol: '🥐' },
  { category: 'Cafes', symbol: '☕' },
  { category: 'Fine Dining', symbol: '🍽️' },
  { category: 'Casual', symbol: '🍔' },
  { category: 'Food Trucks', symbol: '🚚' },
  { category: 'Daycares & Schools', symbol: '👧🏼' },
  { category: 'Hotels & Resorts', symbol: '🏨' },
  { category: 'Ice Cream & Dessert Shops', symbol: '🍦' }
]

const ratingBar = (rating: number) => {
  const pct = ((rating - 3.5) / 1.5) * 100
  return Math.min(100, Math.max(0, pct))
}

const tagColors: Record<string, { bg: string; text: string }> = {
  'gluten-free': { bg: '#D1FAE5', text: '#065F46' },
  'vegan': { bg: '#DBEAFE', text: '#1E40AF' },
  'keto': { bg: '#F3E8FF', text: '#6B21A8' },
  'paleo': { bg: '#FEF3C7', text: '#92400E' },
  'tree-nut': { bg: '#FEE2E2', text: '#991B1B' },
  'nut-free': { bg: '#D1FAE5', text: '#065F46' },
}

// Add all east asian, south asian, southeast asian, european, middle eastern, latin american, and african categories for groceries
const global_categories = [
  { flag: '🇯🇵', name: 'Japanese' },
  { flag: '🇰🇷', name: 'Korean' },
  { flag: '🇨🇳', name: 'Chinese' },
  { flag: '🇹🇭', name: 'Thai' },
  { flag: '🇻🇳', name: 'Vietnamese' },
  { flag: '🇲🇾', name: 'Malaysian' },
  { flag: '🇮🇩', name: 'Indonesian' },
  { flag: '🇵🇭', name: 'Filipino' },
  { flag: '🇰🇭', name: 'Cambodian' },
  { flag: '🇱🇦', name: 'Laotian' },
  { flag: '🇲🇲', name: 'Burmese' },
  { flag: '🇳🇵', name: 'Nepalese' },
  { flag: '🇮🇳', name: 'Indian' },
  { flag: '🇵🇰', name: 'Pakistani' },
  { flag: '🇧🇩', name: 'Bangladeshi' },
  { flag: '🇱🇰', name: 'Sri Lankan' },
  { flag: '🇲🇽', name: 'Mexican' },
  { flag: '🇵🇪', name: 'Peruvian' },
  { flag: '🇨🇴', name: 'Colombian' },
  { flag: '🇦🇷', name: 'Argentinian' },
  { flag: '🇧🇷', name: 'Brazilian' },
  { flag: '🇨🇱', name: 'Chilean' },
  { flag: '🇪🇨', name: 'Ecuadorean' },
  { flag: '🇨🇦', name: 'Canadian' },
  { flag: '🇺🇸', name: 'American' },
  { flag: '🇱🇧', name: 'Lebanese' },
  { flag: '🇮🇷', name: 'Iranian' },
  { flag: '🇸🇦', name: 'Saudi' },
  { flag: '🇪🇬', name: 'Egyptian' },
  { flag: '🇹🇷', name: 'Turkish' },
  { flag: '🇪🇹', name: 'Ethiopian' },
  { flag: '🇳🇬', name: 'Nigerian' },
  { flag: '🇿🇦', name: 'South African' },
  { flag: '🇰🇪', name: 'Kenyan' },
  { flag: '🇲🇦', name: 'Moroccan' },
  { flag: '🇹🇳', name: 'Tunisian' },
  { flag: '🇮🇱', name: 'Israeli' },
  { flag: '🇮🇹', name: 'Italian' },
  { flag: '🇫🇷', name: 'French' },
  { flag: '🇪🇸', name: 'Spanish' },
  { flag: '🇬🇷', name: 'Greek' },
  { flag: '🇵🇹', name: 'Portuguese' },
  { flag: '🇩🇪', name: 'German' },
  { flag: '🇵🇱', name: 'Polish' },
  { flag: '🇷🇺', name: 'Russian' },
  { flag: '🇧🇪', name: 'Belgian' },
  { flag: '🇳🇱', name: 'Dutch' },
  { flag: '🇸🇪', name: 'Swedish' },
  { flag: '🇩🇰', name: 'Danish' },
  { flag: '🇫🇮', name: 'Finnish' },
  { flag: '🇳🇴', name: 'Norwegian' },
  { flag: '🇨🇭', name: 'Swiss' },
  { flag: '🇦🇹', name: 'Austrian' },
  { flag: '🇮🇪', name: 'Irish' },
  { flag: '🇬🇧', name: 'British' },
]

const getTagStyle = (tag: string) => tagColors[tag] || { bg: '#F3F4F6', text: '#374151' }

export default function DiningPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])
  const [search, setSearch] = React.useState('')

  const filtered = React.useMemo(() => {
    return diningAreas.filter((area: DiningArea) => {
      const catOk = !selectedCategory || area.category === selectedCategory
      const searchOk = !search || area.name.toLowerCase().includes(search.toLowerCase())
      const filterOk = selectedFilters.length === 0 || selectedFilters.every(f => area.dietaryTags.includes(f))
      return catOk && searchOk && filterOk
    })
  }, [selectedCategory, selectedFilters, search])

  return (
    <div style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#e2efef' }} className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#226580' }}>Dining</p>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#151b3a' }} className="text-4xl lg:text-5xl mb-3">
            Verified Dining Spaces
          </h1>
          <p style={{ color: '#151b3a' }} className="text-base max-w-xl">
            Explore a curated selection of allergen-free dining options, verified for safety and quality. From gluten-free to nut-free, find spaces that fit your dietary needs.
          </p>
        </div>
      </div>

      {/* Category scroll strip */}
      <div style={{ backgroundColor: '#e2efef', borderBottom: '1px solid #E5E7EB' }} className="px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-1">
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
          {diningCategories.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={selectedCategory === category.category
                ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
                : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
              }
            >
              {category.symbol} {category.category}
            </button>
          ))}
        </div>
      </div>
      {/* Global Foods scroll strip */}
      <div style={{ backgroundColor: '#e2efef', borderBottom: '1px solid #E5E7EB' }} className="px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-1">
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
          {global_categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={selectedCategory === category.name
                ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
                : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
              }
            >
              {category.flag} {category.name}
            </button>
          ))}
        </div>
      </div>
      {/* Add cultural filter above */}
      {/* <div className="px-6 lg:px-12 py-4">
        {global_categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all mr-2 direction-row"
            style={selectedCategory === cat.name
              ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
              : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
            }
          >
            {cat.flag} {cat.name}
          </button>
        ))}
      </div> */}
      {/* Search bar */}
      <div className="px-6 lg:px-12 py-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for dining spaces..."
          className="w-full px-5 py-3 rounded-full text-sm outline-none border"
          style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
        />
      </div>
      {/* Make a database like list of dining places */}
      <div className="px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dining) => (
                <div key={dining.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-lg font-semibold mb-2">{dining.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dining.category}</p>
                    <div className="flex flex-wrap gap-2">
                        {dining.dietaryTags.map((tag) => {
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
                    </div>
                </div>
            ))}
          </div>     
        </div>
    </div>
  ) 
}
