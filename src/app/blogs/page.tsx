import React from 'react'
import Link from 'next/link'

const posts = [
  {
    id: 1,
    category: 'Production Spaces',
    title: 'What "gluten-free certified" actually means for production facilities',
    excerpt: 'Not all gluten-free labels are created equal. We break down the difference between dedicated facilities, shared lines with protocols, and what cross-contact really means for people with celiac disease.',
    author: 'Dr. Mia Chen',
    date: 'June 2026',
    readTime: '6 min read',
    emoji: '🏭',
  },
  {
    id: 2,
    category: 'Global Cuisine',
    title: 'How 7 cuisines are naturally gluten-free and nut-free at their core',
    excerpt: 'From Ethiopian injera to Mexican tortillas de maíz, many traditional foods were free of today\'s major allergens long before "free-from" was a marketing term.',
    author: 'Amara Osei',
    date: 'May 2026',
    readTime: '8 min read',
    emoji: '🌍',
  },
  {
    id: 3,
    category: 'Community',
    title: 'Traveling with a nut allergy: lessons from 30 countries',
    excerpt: 'Our community member Priya shares what she\'s learned navigating restaurants, street food, and grocery stores across Asia, Europe, and the Americas.',
    author: 'Priya Nair',
    date: 'May 2026',
    readTime: '11 min read',
    emoji: '✈️',
  },
  {
    id: 4,
    category: 'Recipes',
    title: 'The Japanese pantry essentials that are safe for gluten-free kitchens',
    excerpt: 'Miso, soy sauce, tamari — navigating Japanese flavors when you avoid gluten. A guide to building umami without wheat.',
    author: 'Kenji Morita',
    date: 'April 2026',
    readTime: '5 min read',
    emoji: '🍱',
  },
  {
    id: 5,
    category: 'Production Spaces',
    title: 'Inside a dedicated nut-free bakery: what the certification process looks like',
    excerpt: 'We toured three certified nut-free bakeries to understand what it actually takes to earn — and keep — that designation.',
    author: 'ZeroCross Team',
    date: 'April 2026',
    readTime: '7 min read',
    emoji: '🥐',
  },
  {
    id: 6,
    category: 'Community',
    title: 'How we verify restaurants for our database: the ZeroCross protocol',
    excerpt: 'We don\'t just take a restaurant\'s word for it. Here\'s the multi-step process our community and team use to verify every listing.',
    author: 'ZeroCross Team',
    date: 'March 2026',
    readTime: '4 min read',
    emoji: '✅',
  },
]

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Production Spaces': { bg: '#D1FAE5', text: '#065F46' },
  'Global Cuisine': { bg: '#FEF3C7', text: '#92400E' },
  'Community': { bg: '#DBEAFE', text: '#1E40AF' },
  'Recipes': { bg: '#F3E8FF', text: '#6B21A8' },
}

export default function BlogsPage() {
  return (
    <div style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1A3D2B' }} className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#E8A020' }}>Community</p>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#FAF7F0' }} className="text-4xl lg:text-5xl mb-3">
            Stories, Guides & Insights
          </h1>
          <p style={{ color: '#A7C4B5' }} className="text-base max-w-xl">
            From production space certifications to global food culture — knowledge from the ZeroCross community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        {/* Featured post */}
        <div
          className="rounded-3xl overflow-hidden mb-12 flex flex-col lg:flex-row"
          style={{ backgroundColor: '#1A3D2B' }}
        >
          <div className="flex items-center justify-center p-12 text-8xl lg:w-64 shrink-0" style={{ backgroundColor: '#152E21' }}>
            {posts[0].emoji}
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ backgroundColor: '#E8A020', color: '#1A3D2B' }}
              >
                Featured
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ backgroundColor: categoryColors[posts[0].category]?.bg || '#F3F4F6', color: categoryColors[posts[0].category]?.text || '#374151' }}
              >
                {posts[0].category}
              </span>
            </div>
            <h2
              className="text-2xl lg:text-3xl mb-3 leading-snug"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#FAF7F0' }}
            >
              {posts[0].title}
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#A7C4B5' }}>{posts[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs" style={{ color: '#6B9E84' }}>
              <span>{posts[0].author}</span>
              <span>·</span>
              <span>{posts[0].date}</span>
              <span>·</span>
              <span>{posts[0].readTime}</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map(post => {
            const { bg, text } = categoryColors[post.category] || { bg: '#F3F4F6', text: '#374151' }
            return (
              <article
                key={post.id}
                className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex flex-col"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-center justify-center py-8 text-5xl" style={{ backgroundColor: '#F0EBE0' }}>
                  {post.emoji}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold mb-3 w-fit"
                    style={{ backgroundColor: bg, color: text }}
                  >
                    {post.category}
                  </span>
                  <h3
                    className="font-semibold text-base mb-2 leading-snug flex-1"
                    style={{ color: '#1A3D2B', fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: '#6B7280' }}>{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs mt-auto" style={{ color: '#9CA3AF' }}>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Newsletter */}
        <div
          className="mt-16 rounded-3xl p-10 text-center"
          style={{ backgroundColor: '#F0EBE0', border: '1px solid #E5E7EB' }}
        >
          <h3
            className="text-2xl mb-3"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A3D2B' }}
          >
            Join the community
          </h3>
          <p className="text-sm mb-6" style={{ color: '#4A5568' }}>
            Get new stories, verified production space listings, and globally inspired recipes delivered weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full text-sm outline-none border"
              style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
            />
            <button
              className="px-6 py-3 rounded-full text-sm font-semibold shrink-0"
              style={{ backgroundColor: '#1A3D2B', color: '#FAF7F0' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}