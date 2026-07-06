"use client"
import React from 'react'
import Filter from '@/components/Filter'
import { diningAreas, diningCategories, type DiningArea } from '@/data'

const categoryIcons: Record<string, string> = {
  'College Campuses': '🏫',
  'Bakeries': '🥐',
  'Cafes': '☕',
  'Fine Dining': '🍽️',
  'Casual': '🍔',
  'Food Trucks': '🚚',
  'Ethnic Cuisine': '🌍',
}

const ratingBar = (rating: number) => {
  const pct = ((rating - 3.5) / 1.5) * 100
  return Math.min(100, Math.max(0, pct))
}

export default function DiningOutPage() {
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#226580' }}>Dining Out</p>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#151b3a' }} className="text-4xl lg:text-5xl mb-3">
            Verified Dining Spaces
          </h1>
          <p style={{ color: '#151b3a' }} className="text-base max-w-xl">
            Restaurants, cafes, and eateries with certified gluten-free and nut-free production environments. Explore global cuisines, safely.
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
            🌐 All Types
          </button>
          {diningCategories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={selectedCategory === cat
                ? { backgroundColor: '#1A3D2B', color: '#FAF7F0', borderColor: '#1A3D2B' }
                : { backgroundColor: 'transparent', color: '#4A5568', borderColor: '#D1D5DB' }
              }
            >
              {categoryIcons[cat] || '🍴'} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search dining spots..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-full text-sm outline-none border"
            style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-64 shrink-0">
            <Filter onFilterChange={setSelectedFilters} />
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {filtered.length} dining spot{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🍽️</div>
                <p className="font-semibold" style={{ color: '#1A3D2B' }}>No dining spots match your filters</p>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((area: DiningArea) => (
                  <div
                    key={area.id}
                    className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                  >
                    <div
                      className="flex items-center justify-center py-8 text-5xl relative"
                      style={{ backgroundColor: '#F0EBE0' }}
                    >
                      {area.image}
                      <span
                        className="absolute top-3 left-3 text-xs px-2.5 py-0.5 rounded-full font-semibold"
                        style={{ backgroundColor: '#1A3D2B', color: '#FAF7F0' }}
                      >
                        {area.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base" style={{ color: '#1A3D2B' }}>{area.name}</h3>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs font-bold" style={{ color: '#E8A020' }}>★ {area.rating}</span>
                        </div>
                      </div>
                      {/* Rating bar */}
                      <div className="h-1 rounded-full mb-3" style={{ backgroundColor: '#F3F4F6' }}>
                        <div
                          className="h-1 rounded-full"
                          style={{ width: `${ratingBar(area.rating)}%`, backgroundColor: '#E8A020' }}
                        />
                      </div>
                      <p className="text-xs mb-3 leading-relaxed" style={{ color: '#6B7280' }}>{area.description}</p>
                      <div className="space-y-1 mb-4 text-xs" style={{ color: '#4A5568' }}>
                        <div className="flex items-center gap-2">
                          <span>📍</span> <span>{area.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🕐</span> <span>{area.hours}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {area.dietaryTags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Old code from last week
// const DiningOutPage = () => {
//     const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

//     const filteredDining = React.useMemo(() => {
//         return diningAreas.filter((area: DiningArea) => {
//             const categoryMatch = !selectedCategory || area.category === selectedCategory
//             return categoryMatch
//         })
//     }, [selectedCategory])

//     return (
//         <div className="p-4 lg:px-20 xl:px-40">
//             <div className="flex flex-col md:flex-row gap-8">
//                 <div className="w-full md:w-1/4">
//                     <Filter />
                    
//                     <div className="mt-8">
//                         <h3 className="font-bold text-lg mb-4">Dining Categories</h3>
//                         <div className="space-y-2">
//                             <button
//                                 onClick={() => setSelectedCategory(null)}
//                                 className={`block w-full text-left px-3 py-2 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
//                             >
//                                 All Types
//                             </button>
//                             {diningCategories.map((category: string) => (
//                                 <button
//                                     key={category}
//                                     onClick={() => setSelectedCategory(category)}
//                                     className={`block w-full text-left px-3 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
//                                 >
//                                     {category}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="w-full md:w-3/4">
//                     <h1 className="text-3xl font-bold mb-6">Dining Options</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {filteredDining.map((area: DiningArea) => (
//                             <div key={area.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
//                                 <div className="bg-gray-100 p-6 text-5xl text-center">{area.image}</div>
//                                 <div className="p-4">
//                                     <h3 className="font-bold text-xl mb-2">{area.name}</h3>
//                                     <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                                    
//                                     <div className="mb-3 space-y-1 text-sm">
//                                         <p><span className="font-semibold">Address:</span> {area.address}</p>
//                                         <p><span className="font-semibold">Hours:</span> {area.hours}</p>
//                                         <p><span className="font-semibold">Rating:</span> {'⭐'.repeat(Math.floor(area.rating))} {area.rating}</p>
//                                     </div>

//                                     <div className="mb-3">
//                                         <p className="text-xs font-semibold text-gray-500 mb-2">Category:</p>
//                                         <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm">
//                                             {area.category}
//                                         </span>
//                                     </div>

//                                     <div>
//                                         <p className="text-xs font-semibold text-gray-500 mb-2">Dietary Options:</p>
//                                         <div className="flex flex-wrap gap-1">
//                                             {area.dietaryTags.map((tag: string) => (
//                                                 <span key={tag} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                                                     {tag}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DiningOutPage