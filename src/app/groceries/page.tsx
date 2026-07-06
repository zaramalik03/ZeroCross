"use client"
import React from 'react'
import Filter from '@/components/Filter'
import { groceries, groceryCategories, type Grocery } from '@/data'

const tagColors: Record<string, { bg: string; text: string }> = {
  'gluten-free': { bg: '#D1FAE5', text: '#065F46' },
  'vegan': { bg: '#DBEAFE', text: '#1E40AF' },
  'keto': { bg: '#F3E8FF', text: '#6B21A8' },
  'paleo': { bg: '#FEF3C7', text: '#92400E' },
  'tree-nut': { bg: '#FEE2E2', text: '#991B1B' },
  'nut-free': { bg: '#D1FAE5', text: '#065F46' },
}

const getTagStyle = (tag: string) => tagColors[tag] || { bg: '#F3F4F6', text: '#374151' }

export default function GroceriesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])
  const [search, setSearch] = React.useState('')

  const filtered = React.useMemo(() => {
    return groceries.filter((item: Grocery) => {
      const catOk = !selectedCategory || item.category === selectedCategory
      const searchOk = !search || item.name.toLowerCase().includes(search.toLowerCase())
      const filterOk = selectedFilters.length === 0 || selectedFilters.every(f => item.dietaryTags.includes(f))
      return catOk && searchOk && filterOk
    })
  }, [selectedCategory, selectedFilters, search])

  return (
    <div style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#e2efef' }} className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#226580' }}>Database</p>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#151b3a' }} className="text-4xl lg:text-5xl mb-3">
            Variety of Groceries to Choose From
          </h1>
          <p style={{ color: '#151b3a' }} className="text-base max-w-xl">
            Gluten-free and nut-free products verified by production space certification. Shop with zero second-guessing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-full text-sm outline-none border transition-all"
            style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <Filter onFilterChange={setSelectedFilters} />

            <div className="mt-8 border-t pt-6" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4A5568' }}>
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={!selectedCategory
                    ? { backgroundColor: '#1A3D2B', color: '#FAF7F0' }
                    : { color: '#4A5568', backgroundColor: 'transparent' }
                  }
                >
                  All Categories
                </button>
                {groceryCategories.map((cat: string) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={selectedCategory === cat
                      ? { backgroundColor: '#1A3D2B', color: '#FAF7F0' }
                      : { color: '#4A5568', backgroundColor: 'transparent' }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-semibold" style={{ color: '#1A3D2B' }}>No items match your filters</p>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((item: Grocery) => (
                  <div
                    key={item.id}
                    className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                  >
                    <div
                      className="flex items-center justify-center py-8 text-5xl"
                      style={{ backgroundColor: '#F0EBE0' }}
                    >
                      {item.image}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base" style={{ color: '#1A3D2B' }}>{item.name}</h3>
                        <span className="text-base font-bold shrink-0" style={{ color: '#6B7280' }}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs mb-3 leading-relaxed" style={{ color: '#6B7280' }}>{item.description}</p>
                      <p className="text-xs font-medium mb-3" style={{ color: '#9CA3AF' }}>{item.category}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.dietaryTags.map((tag: string) => {
                          const { bg, text } = getTagStyle(tag)
                          return (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: bg, color: text }}
                            >
                              {tag}
                            </span>
                          )
                        })}
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
// "use client"
// import React from 'react'
// import Filter from '@/components/Filter'
// import { groceries, groceryCategories, type Grocery } from '@/data'

// const GroceriesPage = () => {
//     const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

//     const filteredGroceries = React.useMemo(() => {
//         return groceries.filter((item: Grocery) => {
//             const categoryMatch = !selectedCategory || item.category === selectedCategory
//             return categoryMatch
//         })
//     }, [selectedCategory])

//     return (
//         <div className="p-4 lg:px-20 xl:px-40">
//             <div className="flex flex-col md:flex-row gap-8">
//                 <div className="w-full md:w-1/4">
//                     <Filter />
                    
//                     <div className="mt-8">
//                         <h3 className="font-bold text-lg mb-4">Categories</h3>
//                         <div className="space-y-2">
//                             <button
//                                 onClick={() => setSelectedCategory(null)}
//                                 className={`block w-full text-left px-3 py-2 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
//                             >
//                                 All Categories
//                             </button>
//                             {groceryCategories.map((category: string) => (
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
//                     <h1 className="text-3xl font-bold mb-6">Groceries</h1>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {filteredGroceries.map((item: Grocery) => (
//                             <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition">
//                                 <div className="text-5xl mb-2">{item.image}</div>
//                                 <h3 className="font-bold text-lg">{item.name}</h3>
//                                 <p className="text-sm text-gray-600 mb-2">{item.description}</p>
//                                 <p className="text-blue-600 font-bold mb-2">${item.price.toFixed(2)}</p>
//                                 <p className="text-xs text-gray-500 mb-2">Category: {item.category}</p>
//                                 <div className="flex flex-wrap gap-1">
//                                     {item.dietaryTags.map((tag: string) => (
//                                         <span key={tag} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                                             {tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default GroceriesPage