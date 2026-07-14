"use client"
import React from 'react'
import Link from 'next/link'
// import Filter from '@/components/Filter'
// import { recipes, type Recipe } from '@/data'

const global_categories = [
  'Japanese 🇯🇵',
  'Korean 🇰🇷',
  'Chinese 🇨🇳', 
  'Thai 🇹🇭',
  'Vietnamese 🇻🇳',
  'Malaysian 🇲🇾', 
  'Indonesian 🇮🇩', 
  'Filipino 🇵🇭', 
  'Cambodian 🇰🇭', 
  'Laotian 🇱🇦', 
  'Burmese 🇲🇲',
  'Nepalese 🇳🇵', 
  'Indian 🇮🇳', 
  'Pakistani 🇵🇰', 
  'Bangladeshi 🇧🇩', 
  'Sri Lankan 🇱🇰', 
  'Mexican 🇲🇽', 
  'Peruvian 🇵🇪', 
  'Colombian 🇨🇴', 
  'Argentinian 🇦🇷', 
  'Brazilian 🇧🇷', 
  'Chilean 🇨🇱', 
  'Ecuadorean 🇪🇨', 
  'Canadian 🇨🇦', 
  'American 🇺🇸', 
  'Lebanese 🇱🇧', 
  'Iranian 🇮🇷', 
  'Saudi 🇸🇦', 
  'Egyptian 🇪🇬', 
  'Turkish 🇹🇷', 
  'Ethiopian 🇪🇹', 
  'Nigerian 🇳🇬', 
  'South African 🇿🇦', 
  'Kenyan 🇰🇪', 
  'Moroccan 🇲🇦', 
  'Tunisian 🇹🇳', 
  'Israeli 🇮🇱', 
  'Italian 🇮🇹', 
  'French 🇫🇷', 
  'Spanish 🇪🇸', 
  'Greek 🇬🇷', 
  'Portuguese 🇵🇹', 
  'German 🇩🇪', 
  'Polish 🇵🇱', 
  'Russian 🇷🇺', 
  'Belgian 🇧🇪',
  'Dutch 🇳🇱', 
  'Swedish 🇸🇪', 
  'Danish 🇩🇰', 
  'Finnish 🇫🇮', 
  'Norwegian 🇳🇴', 
  'Swiss 🇨🇭', 
  'Austrian 🇦🇹', 
  'Irish 🇮🇪', 
  'British 🇬🇧' 
]

export default function RecipesPage() {
  // const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])
  // const [search, setSearch] = React.useState('')
  // const [difficulty, setDifficulty] = React.useState<string | null>(null)

  // const filtered = React.useMemo(() => {
  //   return recipes.filter((r: Recipe) => {
  //     const searchOk = !search || r.name.toLowerCase().includes(search.toLowerCase())
  //     const diffOk = !difficulty || r.difficulty === difficulty
  //     const filterOk = selectedFilters.length === 0 || selectedFilters.every(f => r.dietaryTags.includes(f))
  //     return searchOk && diffOk && filterOk
  //   })
  // }, [selectedFilters, search, difficulty])

  return (
    <div style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#e2efef' }} className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto rounded-3xl border border-border bg-card p-7">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#226580' }}>Recipe Customizer</p>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#151b3a' }} className="text-2xl lg:text-5xl mb-3">
            Generate from Verified Ingredients
          </h1>
          <label className="mt-6 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">What do you have or want?</label>
          <textarea
                rows={4}
                defaultValue="put in ingredients/products you have"
                className="mt-2 w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:border-foreground"
              />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Cuisine</label>
                  <select className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2 text-sm">
                    {global_categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {/* {global_categories.map((category) => (
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
                ))} */}
            </div>
            <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Meal</label>
                <select className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2 text-sm">
                <option>Lunch</option><option>Dinner</option><option>Breakfast</option><option>Snack</option><option>Dessert</option>
                </select>
            </div>
          </div>
          <label className="mt-6 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Locked from your profile</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {/* {LOCKED.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-danger px-3 py-1.5 text-xs font-semibold text-danger-foreground">
                    🔒 No {a}
                  </span>
                ))} */}
              </div>

              <button
                // onClick={() => setGenerated(true)}
                className="mt-7 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Generate from verified ingredients
              </button>
        </div>
        <div className="flex h-full flex-col justify-center text-sm px-20">
            <span className="rounded-full bg-muted py-1 text-xs font-semibold uppercase tracking-widest">Output</span>
            <p className="mt-4 max-w-xl text-base">Your recipe will appear here. Every line item links back to a database entry so you can verify the source.</p>
        </div>
      </div>
    </div>
  )
}

// Old code from last week
// "use client"
// import React from 'react'
// import Filter from '@/components/Filter'
// import { recipes, type Recipe } from '@/data'

// const RecipesPage = () => {
//     const [selectedDiets] = React.useState<string[]>([])

//     const filteredRecipes = React.useMemo(() => {
//         if (selectedDiets.length === 0) return recipes
//         return recipes.filter((recipe: Recipe) =>
//             selectedDiets.every(diet => recipe.dietaryTags.includes(diet))
//         )
//     }, [selectedDiets])

//     return (
//         <div className="p-4 lg:px-20 xl:px-40">
//             <div className="flex flex-col md:flex-row gap-8">
//                 <div className="w-full md:w-1/4">
//                     <Filter />
//                 </div>

//                 <div className="w-full md:w-3/4">
//                     <h1 className="text-3xl font-bold mb-6">Recipes</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {filteredRecipes.map((recipe: Recipe) => (
//                             <div key={recipe.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
//                                 <div className="bg-gray-100 p-6 text-5xl text-center">{recipe.image}</div>
//                                 <div className="p-4">
//                                     <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
//                                     <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                                    
//                                     <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
//                                         <div>
//                                             <p className="text-gray-500">Cook Time</p>
//                                             <p className="font-semibold">{recipe.cookTime} min</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-gray-500">Servings</p>
//                                             <p className="font-semibold">{recipe.servings}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-gray-500">Difficulty</p>
//                                             <p className="font-semibold">{recipe.difficulty}</p>
//                                         </div>
//                                     </div>

//                                     <div className="mb-3">
//                                         <p className="text-xs font-semibold text-gray-500 mb-2">Tags:</p>
//                                         <div className="flex flex-wrap gap-1">
//                                             {recipe.dietaryTags.map((tag: string) => (
//                                                 <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                                                     {tag}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <p className="text-xs font-semibold text-gray-500 mb-2">Ingredients:</p>
//                                         <ul className="text-sm list-disc list-inside text-gray-700">
//                                             {recipe.ingredients.slice(0, 3).map((ing: string, idx: number) => (
//                                                 <li key={idx}>{ing}</li>
//                                             ))}
//                                             {recipe.ingredients.length > 3 && (
//                                                 <li>+{recipe.ingredients.length - 3} more</li>
//                                             )}
//                                         </ul>
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

// export default RecipesPage