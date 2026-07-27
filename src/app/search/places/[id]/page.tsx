// src/app/dining/[id]/page.tsx
"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const RANKING_META: Record<number, {
  label: string; color: string; bg: string; detail: string
}> = {
  1: {
    label:  'Dedicated Allergen-Free Facility',
    color:  '#065F46',
    bg:     '#D1FAE5',
    detail: 'This facility is 100% dedicated to allergen-free production. No allergen cross-contact from shared equipment or shared facilities.'
  },
  2: {
    label:  'Allergen-Free Menu Available',
    color:  '#1E40AF',
    bg:     '#DBEAFE',
    detail: 'This place has a documented allergen-free menu or a strong variety of safe options. It may or may not be a dedicated facility — confirm with staff before ordering.'
  },
  3: {
    label:  'Limited Allergen-Free Options',
    color:  '#92400E',
    bg:     '#FEF3C7',
    detail: 'This place has some allergen-free options but is not a dedicated facility. Cross-contact risk is higher. Best for mild intolerances rather than severe allergies.'
  },
}

type PlaceDetail = {
  id:                   number
  name:                 string
  category:             string | null
  ranking:              1 | 2 | 3 | null
  culturalCuisine:      string | null
  description:          string | null
  website:              string | null
  phone:                string | null
  streetAddress:        string | null
  city:                 string
  state:                string
  zipcode:              string | null
  verified:             boolean | null
  active:               boolean | null
  isDedicatedFacility:  boolean
  isCertified:          boolean
  trainedStaff:         boolean | null
  writtenAllergenMenu:  boolean | null
  knowBeforeYouGo:      string | null
  freeOf:               string[]
  contains:             string[]
  mayContain:           string[]
  dietTags:             string[]
}

export default function PlaceDetailPage() {
  const params   = useParams()
  const router   = useRouter()
  const [place, setPlace]     = useState<PlaceDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!params.id) return

    fetch(`/api/places/${params.id}`)
      .then(r => {
        if (!r.ok) throw new Error(`${r.status}`)
        return r.json()
      })
      .then(json => {
        setPlace(json.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message === '404'
          ? 'This place could not be found.'
          : 'Could not load place details. Please try again.'
        )
        setLoading(false)
      })
  }, [params.id])

  if (loading) return (
    <div style={{ backgroundColor: '#FAF7F0', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p style={{ color: '#6B7280' }}>Loading...</p>
    </div>
  )

  if (error || !place) return (
    <div style={{ backgroundColor: '#FAF7F0', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p style={{ color: '#991B1B', marginBottom: 16 }}>
        {error ?? 'Place not found'}
      </p>
      <Link href="/dining"
        style={{ color: '#1A3D2B', fontWeight: 600, fontSize: 14 }}>
        ← Back to dining
      </Link>
    </div>
  )

  const rankMeta = place.ranking ? RANKING_META[place.ranking] : null

  return (
    <div style={{ backgroundColor: '#FAF7F0', minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Back button */}
      <div style={{ backgroundColor: '#1A3D2B', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <button
            onClick={() => router.back()}
            style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: '#A7C4B5', fontSize: 13, padding: 0,
              display: 'flex', alignItems: 'center', gap: 6 }}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ backgroundColor: '#1A3D2B', padding: '2rem 2rem 3rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Category + verified */}
          <div style={{ display: 'flex', alignItems: 'center',
            gap: 8, marginBottom: 12 }}>
            {place.category && (
              <span style={{ fontSize: 12, color: '#A7C4B5',
                textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {place.category}
              </span>
            )}
            {place.verified && (
              <span style={{ fontSize: 11, padding: '2px 8px',
                borderRadius: 99, backgroundColor: '#D1FAE5',
                color: '#065F46', fontWeight: 600 }}>
                ✓ ZeroCross Verified
              </span>
            )}
          </div>

          {/* Name */}
          <h1 style={{ color: '#FAF7F0', fontSize: 30, margin: '0 0 6px',
            fontFamily: 'Fraunces, serif', fontWeight: 550 }}>
            {place.name}
          </h1>

          {/* Location */}
          <p style={{ color: '#A7C4B5', fontSize: 14, margin: '0 0 16px' }}>
            {place.streetAddress && `${place.streetAddress} · `}
            {place.city}, {place.state}
            {place.zipcode && ` ${place.zipcode}`}
            {place.culturalCuisine && ` · ${place.culturalCuisine}`}
          </p>

          {/* Ranking badge */}
          {rankMeta && (
            <span style={{
              display: 'inline-block',
              fontSize: 12, fontWeight: 600,
              padding: '5px 14px', borderRadius: 99,
              backgroundColor: rankMeta.bg,
              color: rankMeta.color,
            }}>
              Rank {place.ranking} — {rankMeta.label}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 800, margin: '0 auto',
        padding: '2rem', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Description */}
        {place.description && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16,
            padding: '1.5rem', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: 15, color: '#374151',
              lineHeight: 1.7, margin: 0 }}>
              {place.description}
            </p>
          </div>
        )}

        {/* Ranking explanation */}
        {rankMeta && (
          <div style={{ backgroundColor: rankMeta.bg, borderRadius: 16,
            padding: '1.25rem 1.5rem',
            border: `1px solid ${rankMeta.color}30` }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: rankMeta.color,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              margin: '0 0 6px' }}>
              What Rank {place.ranking} means
            </p>
            <p style={{ fontSize: 13, color: rankMeta.color,
              margin: 0, lineHeight: 1.6 }}>
              {rankMeta.detail}
            </p>
          </div>
        )}

        {/* Allergen status */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '1.5rem', border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1A3D2B',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            margin: '0 0 16px' }}>
            Allergen Information
          </h2>

          {place.freeOf.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#065F46',
                margin: '0 0 8px' }}>Confirmed free of</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {place.freeOf.map(a => (
                  <span key={a} style={{ fontSize: 12, padding: '4px 10px',
                    borderRadius: 99, backgroundColor: '#D1FAE5',
                    color: '#065F46', fontWeight: 500 }}>
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {place.mayContain.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#92400E',
                margin: '0 0 8px' }}>May contain — confirm before ordering</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {place.mayContain.map(a => (
                  <span key={a} style={{ fontSize: 12, padding: '4px 10px',
                    borderRadius: 99, backgroundColor: '#FEF3C7',
                    color: '#92400E', fontWeight: 500 }}>
                    ⚠ {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {place.contains.length > 0 && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#991B1B',
                margin: '0 0 8px' }}>Confirmed contains</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {place.contains.map(a => (
                  <span key={a} style={{ fontSize: 12, padding: '4px 10px',
                    borderRadius: 99, backgroundColor: '#FEE2E2',
                    color: '#991B1B', fontWeight: 500 }}>
                    ✗ {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Safety flags */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '1.5rem', border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1A3D2B',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            margin: '0 0 16px' }}>
            Safety Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              [place.isDedicatedFacility, '🏭', 'Dedicated allergen-free facility',
                'No shared equipment with allergen-containing products'],
              [place.isCertified, '✓', 'Third-party certified',
                'Holds a recognized allergen-free certification'],
              [place.trainedStaff, '👨‍🍳', 'Allergen-trained staff',
                'Staff have completed formal allergen awareness training'],
              [place.writtenAllergenMenu, '📋', 'Written allergen menu',
                'A printed allergen menu is available on request'],
            ].map(([present, icon, label, detail]) => (
              <div key={String(label)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: present ? '#D1FAE5' : '#F3F4F6',
                  flexShrink: 0, fontSize: 14 }}>
                  {present ? icon : '—'}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 2px',
                    color: present ? '#1A3D2B' : '#9CA3AF' }}>
                    {String(label)}
                  </p>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>
                    {present ? String(detail) : 'Not confirmed'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diet tags */}
        {place.dietTags.length > 0 && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16,
            padding: '1.5rem', border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1A3D2B',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              margin: '0 0 12px' }}>
              Dietary Options
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {place.dietTags.map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: '4px 12px',
                  borderRadius: 99, backgroundColor: '#F3E8FF',
                  color: '#6B21A8', fontWeight: 500 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Know before you go */}
        {place.knowBeforeYouGo && (
          <div style={{ backgroundColor: '#FEF3C7', borderRadius: 16,
            padding: '1.5rem',
            borderLeft: '4px solid #E8A020' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#92400E',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              margin: '0 0 10px' }}>
              Know before you go
            </h2>
            <p style={{ fontSize: 14, color: '#78350F',
              margin: 0, lineHeight: 1.7 }}>
              {place.knowBeforeYouGo}
            </p>
          </div>
        )}

        {/* Contact */}
        {(place.website || place.phone) && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16,
            padding: '1.5rem', border: '1px solid #E5E7EB',
            display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {place.website && (
              <a href={place.website} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 500, color: '#1A3D2B',
                  textDecoration: 'none',
                  padding: '8px 16px', borderRadius: 99,
                  backgroundColor: '#1A3D2B', color: '#FAF7F0' }}>
                Visit website →
              </a>
            )}
            {place.phone && (
              <a href={`tel:${place.phone}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 500,
                  padding: '8px 16px', borderRadius: 99,
                  border: '1.5px solid #D1D5DB', color: '#1A3D2B',
                  textDecoration: 'none', backgroundColor: 'transparent' }}>
                📞 {place.phone}
              </a>
            )}
          </div>
        )}

        {/* Back link */}
        <div style={{ paddingTop: 8, paddingBottom: 32 }}>
          <Link href="/dining"
            style={{ fontSize: 14, color: '#6B7280',
              textDecoration: 'none', fontWeight: 500 }}>
            ← Back to all dining spots
          </Link>
        </div>
      </div>
    </div>
  )
}