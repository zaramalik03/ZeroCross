'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
 
export default function RecommendationsPage() {
  const [data, setData]       = useState<any>(null)
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/recommendations')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])
 
  if (loading) return <div className="p-8">Loading your safe picks...</div>
  if (data?.needsOnboarding) {
    return <div className="p-8">
      <p>Set up your allergen profile first.</p>
      <Link href="/onboarding">Start onboarding →</Link>
    </div>
  }
 
  return (
    <div style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#1A3D2B', padding: '1.5rem 2rem' }}>
        <p style={{ color: '#E8A020', fontSize: 12, fontWeight: 600 }}>
          YOUR FEED
        </p>
        <h1 style={{ color: '#FAF7F0', fontSize: 24, margin: '4px 0' }}>
          Safe picks for {data.profile.displayName}
        </h1>
        <p style={{ color: '#A7C4B5', fontSize: 14 }}>
          Filtering out {data.profile.avoidingCount} allergen
          {data.profile.avoidingCount !== 1 ? 's' : ''}
        </p>
      </div>
 
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <Section title="🍽️ Dining" items={data.dining}
          link="/dining" />
        <Section title="🛒 Groceries" items={data.products}
          link="/groceries" />
        <Section title="🍽️ Catering" items={data.catering}
          link="/dining" />
      </div>
    </div>
  )
}
 
function Section({ title, items, link }: any) {
  if (!items?.length) return null
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600,
          color: '#1A3D2B' }}>{title}</h2>
        <Link href={link} style={{ fontSize: 13,
          color: '#6B7280' }}>See all →</Link>
      </div>
      <div style={{ display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',
        gap: 12 }}>
        {items.map((item: any) => (
          <div key={item.id} style={{ background:'#fff',
            borderRadius: 12, overflow:'hidden',
            border: '1px solid #E5E7EB' }}>
            <div style={{ background:'#F0EBE0', padding:'1rem',
              textAlign:'center', fontSize: 32 }}>
              {item.emojiIcon ?? '🍴'}
            </div>
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontSize: 13, fontWeight: 600,
                color: '#1A3D2B' }}>{item.name}</div>
              <div style={{ fontSize: 11,
                color: '#9CA3AF', marginTop: 2 }}>
                {item.city ?? item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
