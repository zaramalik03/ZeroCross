"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Left panel — decorative */}
      {/* <div
        className="hidden lg:flex flex-col justify-between p-12 w-2/5"
        style={{ backgroundColor: '#1A3D2B' }}
      >
        <Link href="/" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#FAF7F0', fontSize: 22, fontWeight: 700 }}>
          Zero<span style={{ color: '#E8A020' }}>Cross</span>
        </Link>
        <div>
          <div className="text-6xl mb-6">🌍</div>
          <h2
            className="text-3xl mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#FAF7F0' }}
          >
            Safe food from<br />every cuisine.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#A7C4B5' }}>
            Create your allergen profile once. Every search result, recipe, and restaurant is filtered to match your needs — automatically.
          </p>
        </div>
        <div className="text-xs" style={{ color: '#6B9E84' }}>© 2026 ZeroCross</div>
      </div> */}

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1
            className="text-3xl mb-2"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#151b3a' }}
          >
            {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
          </h1>
          <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
            {mode === 'login'
              ? 'Sign in to access your allergen profile and saved places.'
              : 'Join thousands exploring global food, safely.'
            }
          </p>

          <div className="space-y-4 mb-6">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A5568' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-all"
                  style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#455269' }}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-all"
                style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A5568' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-all"
                style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
              />
            </div>
          </div>

          <button
            className="w-full py-3 rounded-full font-semibold text-sm transition-all mb-4"
            style={{ backgroundColor: '#151b3a', color: '#FAF7F0' }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="relative flex items-center my-5">
            <div className="flex-1 h-px" style={{ backgroundColor: '#E5E7EB' }} />
            <span className="mx-4 text-xs" style={{ color: '#9CA3AF' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#E5E7EB' }} />
          </div>

          <button
            className="w-full py-3 rounded-full font-semibold text-sm border transition-all mb-6"
            style={{ borderColor: '#D1D5DB', color: '#4A5568', backgroundColor: '#FFFFFF' }}
          >
            Continue with Google
          </button>

          <p className="text-center text-xs" style={{ color: '#6B7280' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-semibold underline"
              style={{ color: '#151b3a' }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}