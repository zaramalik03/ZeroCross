"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const cuisines = [
  { flag: '🇯🇵', name: 'Japanese', dish: 'Miso Ramen', tags: ['gluten-free', 'nut-free'] },
  { flag: '🇮🇳', name: 'Indian', dish: 'Dal Tadka', tags: ['gluten-free', 'vegan'] },
  { flag: '🇲🇽', name: 'Mexican', dish: 'Tacos de Canasta', tags: ['gluten-free', 'nut-free'] },
  { flag: '🇱🇧', name: 'Lebanese', dish: 'Mezze Platter', tags: ['vegan', 'gluten-free'] },
  { flag: '🇹🇭', name: 'Thai', dish: 'Pad See Ew', tags: ['gluten-free', 'nut-free'] },
  { flag: '🇪🇹', name: 'Ethiopian', dish: 'Injera & Wot', tags: ['gluten-free', 'vegan'] },
  { flag: '🇵🇪', name: 'Peruvian', dish: 'Ceviche', tags: ['gluten-free', 'pescatarian'] },
  { flag: '🇰🇷', name: 'Korean', dish: 'Bibimbap', tags: ['gluten-free', 'nut-free'] },
]

const steps = [
  { num: '01', title: 'Set your allergen profile', desc: 'Tell us your restrictions once. Every result you see is filtered to match — automatically.' },
  { num: '02', title: 'Browse verified spaces', desc: 'Restaurants, grocery brands, and recipes all screened for gluten-free and nut-free production.' },
  { num: '03', title: 'Eat with confidence', desc: 'Community-reviewed, cross-contact assessed. Trust what you put on your plate.' },
]

const allergens = [
  { icon: '🌾', name: 'Gluten' }, { icon: '🥜', name: 'Peanuts' }, { icon: '🌰', name: 'Tree Nuts' },
  { icon: '🥛', name: 'Dairy' }, { icon: '🥚', name: 'Eggs' }, { icon: '🫛', name: 'Soy' },
  { icon: '🐟', name: 'Fish' }, { icon: '🦞', name: 'Shellfish' }, { icon: '🌱', name: 'Sesame' },
]

export default function Slider() {
  const [activeCuisine, setActiveCuisine] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveCuisine(c => (c + 1) % cuisines.length), 2800)
    return () => clearInterval(t)
  }, [])

  const c = cuisines[activeCuisine]

  return (
    <div style={{ fontFamily: 'Fraunces, system-ui, serif', fontWeight: 550, color: '#151b3a' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#e2efef', minHeight: '88vh' }}
      >
        {/* Diagonal cream accent */}
        <div
        // w/2 for adding a diagonal cream accent on the right side of the hero section if needed
          className="absolute bottom-0 right-0 h-full hidden lg:block" 
          style={{
            backgroundColor: '#FAF7F0',
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center min-h-[88vh] gap-12 py-16">

          {/* Left: headline */}
          <div className="flex-1 flex flex-col gap-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest w-fit"
              style={{ backgroundColor: '#ffffff', color: '#A7C4B5' }}
            >
              Allergen-free · Various Options
            </div>
            <h1
              className="text-5xl lg:text-6xl xl:text-7xl leading-tight"
              style={{ fontFamily: "Fraunces, serif", fontWeight: 550, color:'#151b3a' }}
            >
              Allergen-free food access<br />
              <span style={{ color: '#226580', fontStyle: 'italic'}}>within reach</span><br />
              of every neighborhood.
            </h1>
            <p className="text-lg max-w-md leading-relaxed" style={{ color: '#545554' }}>
              ZeroCross aggregates certified allergen-free production spaces and removes the noise for people with dietary restrictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/search"
                className="px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 text-center"
                style={{ backgroundColor: '#151b3a', color: '#ffffff' }}
              >
                Browse the Database →
              </Link>
              <Link
                href="/recipes"
                className="px-8 py-4 rounded-full font-semibold text-sm border-2 text-center transition-all duration-200"
                style={{ borderColor: '#A7C4B5', backgroundColor: '#ffffff' }}
              >
                Explore Recipes
              </Link>
            </div>
          </div>

          {/* Right: rotating cuisine card */}
          {/* <div className="flex-1 flex items-center justify-center lg:justify-end z-10">
            <div
              className="rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 text-center transition-all duration-500"
              style={{ backgroundColor: '#FFFFFF', minWidth: 300, maxWidth: 360 }}
            >
              <div className="text-7xl">{c.flag}</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#6B9E84' }}>
                  {c.name} Cuisine
                </p>
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#151b3a' }}
                >
                  {c.dish}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {c.tags.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                {cuisines.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCuisine(i)}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === activeCuisine ? 20 : 6,
                      height: 6,
                      backgroundColor: i === activeCuisine ? '#E8A020' : '#D1D5DB',
                    }}
                    aria-label={`Cuisine ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Stat strip */}
        {/* <div className="relative z-10 border-t" style={{ borderColor: '#2A5C42', backgroundColor: '#152E21' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['500+', 'Production Spaces'], ['40+', 'Global Cuisines'], ['9', 'Allergens Screened'], ['100%', 'Community Verified']].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold" style={{ color: '#E8A020' }}>{val}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B9E84' }}>{label}</div>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 lg:px-12" style={{ backgroundColor: '#e2efef' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#151b3a' }}>The Process</p>
            <h2
              className="text-4xl lg:text-5xl"
              style={{ fontFamily: 'Fraunces, serif', color: '#151b3a' }}
            >
              Three steps to confident eating
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{ backgroundColor: i === 1 ? '#151b3a' : '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <div
                  className="text-6xl font-bold mb-6 opacity-10 select-none"
                  style={{ color: i === 1 ? '#FFFFFF' : '#151b3a', fontFamily: 'Playfair Display, serif' }}
                >
                  {s.num}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: i === 1 ? '#FAF7F0' : '#151b3a' }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: i === 1 ? '#A7C4B5' : '#6B7280' }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALLERGENS COVERED ── */}
      <section className="py-20 px-6 lg:px-12" style={{ backgroundColor: '#151b3a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#226580' }}>What We Screen For</p>
            <h2
              className="text-3xl lg:text-4xl"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#ffffff' }}
            >
              The top 9 allergens, and then some
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
            {allergens.map(a => (
              <div
                key={a.name}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <span className="text-3xl">{a.icon}</span>
                <span className="text-xs font-medium text-center" style={{ color: '#4A5568' }}>{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORLD CUISINES TEASER ── */}
      {/* <section className="py-24 px-6 lg:px-12" style={{ backgroundColor: '#e2efef' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#E8A020' }}>Our Mission</p>
              <h2
                className="text-4xl lg:text-5xl mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A3D2B' }}
              >
                Dietary restrictions should not mean<br />
                <em>culinary restrictions.</em>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#4A5568' }}>
                We built ZeroCross because people with gluten sensitivities, nut allergies, and other dietary needs deserve access to the full richness of global cuisine — not just a corner of it.
              </p>
              <Link
                href="/dining"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ backgroundColor: '#1A3D2B', color: '#FAF7F0' }}
              >
                Find Dining Near You →
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {cuisines.slice(0, 4).map(c => (
                <div
                  key={c.name}
                  className="rounded-2xl p-6 flex flex-col gap-3"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                >
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#1A3D2B' }}>{c.dish}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{c.name}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map(t => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: '#e2efef' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-4xl lg:text-5xl mb-6"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 550,color: '#151b3a' }}
          >
            Ready to begin?
          </h2>
          <p className="mb-8 text-base" style={{ color: '#226580' }}>
            Set up your profile and start browsing allergen-free groceries, dining spaces, and recipes today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/groceries"
              className="px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200"
              style={{ backgroundColor: '#151b3a', color: '#ffffff' }}
            >
              Browse Groceries
            </Link>
            <Link
              href="/recipes"
              className="px-8 py-4 rounded-full font-semibold text-sm border-2 transition-all duration-200"
              style={{ borderColor: '#A7C4B5', color: '#151b3a', backgroundColor: '#ffffff' }}
            >
              Discover Recipes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}



//  Old Code from last week
// "use client"
// import React, {useState, useEffect} from 'react'
// import Link from 'next/link'

// const data = [
//   {
//     num: '1',
//     title: 'Set your allergy profile',
//     desc: 'Tell us your restrictions once. Everything on the platform filters to match your exact needs automatically.',
//   },
//   {
//     num: '2',
//     title: 'Browse without second-guessing',
//     desc: 'Every restaurant, product, and recipe you see has been verified for your profile — the unsafe stuff filters out.',
//   },
//   {
//     num: '3',
//     title: 'Feel confident in your dietary lifestyle',
//     desc: 'Community-verified, label-checked, and cross-contact assessed. You can trust what you see here.',
//   },
// ];

// const allergens = [
//   { icon: '🌾', name: 'Gluten' }, { icon: '🥜', name: 'Peanuts' }, { icon: '🌰', name: 'Tree Nuts' },
//   { icon: '🥛', name: 'Dairy' }, { icon: '🥚', name: 'Eggs' }, { icon: '🫛', name: 'Soy' },
//   { icon: '🐟', name: 'Fish' }, { icon: '🦞', name: 'Shellfish' }, { icon: '🌱', name: 'Sesame' },
// ]

// const Slider = () => {
//     return (
//         <div>
//             <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50'>
//                 {/* TEXT CONTAINER */}
//                 <div className='h-1/2 flex items-center justify-center flex-col gap-8 text-red-500 font-bold lg:h-full'>
//                     <h1 className='text-5xl items-center p-4'>
//                         Find groceries, dining places, and recipes completely allergen-free.
//                     </h1>
//                     <button className='bg-red-500 text-white p-4 md:text-2xl xl:text-2xl'>
//                         Get Started
//                     </button>
//                 </div>
//                 <div className="flex flex-col w-full relative p-8 gap-10 items-center justify-center">
//                     {data.map((item) => (
//                         <div key={item.num}>
//                             <h3 className="text-3xl font-semibold">{item.title}</h3>
//                             <p className="text-xl mt-1 text-sm">{item.desc}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-20'>
//                 <div className='h-1/2 flex items-center justify-center flex-col gap-8 text-red-500 font-bold lg:h-full'></div>
//                     <h1 className='text-5xl items-center p-4'>
//                         Covers the Top 9 Allergens and Many More
//                     </h1>
//                 </div>
//                 <div className="flex flex-col w-full relative p-8 gap-10 items-center justify-center">
//                   {allergens.map((f) => (
//                     <div
//                         key={f.title}
//                         className="rounded-xl w-35 p-6 border flex flex-row items-center justify-center"
//                         >
//                         <span className="text-3xl mb-3">{f.icon}</span>
//                         <h3
//                             className="text-sm font-semibold text-center"
//                             style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}
//                         >
//                             {f.title}
//                         </h3>
//                     </div>
//                     ))} 
//             </div> */}
//             {/* <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-20'>
//                 <div className='h-1/2 flex items-center justify-center flex-col gap-8 text-red-500 font-bold lg:h-full'></div>
//                     <h1 className='text-5xl items-center p-4'>
//                         ZeroCross is the simple way to find restaurants, groceries, and recipes that match your allergies — reviewed by people with the same restrictions as you.
//                     </h1>
//                 </div>
//                     ))} 
//             </div> */}
//         </div>
//     )
// }

// export default Slider