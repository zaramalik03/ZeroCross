"use client"
import React, {useState} from 'react'

export default function ProfilePage() {
const [text, setText] = useState('');
return (
    <div style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif' }} className="min-h-screen bg-gray-300 pt-20 text-gray-900">
      <section className="mx-auto flex max-w-4xl flex-col gap-12 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">username</h1>
        </div>
        <div style={{ backgroundColor: '#FAF7F0'}} className="rounded-2xl border bg-card p-5 text-left transition shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">About Me</h2>
          <input
            id="name-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-6 rounded w-full max-w-xl"
            placeholder="Tell a little about yourself"
        />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Projects</h2>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div 
            style={{
                backgroundColor: '#FAF7F0',
            }}
            className="rounded-2xl border p-5 text-left transition shadow-md">
              <h3 className="mb-2 text-xl font-semibold">Allergens</h3>
              <p className="text-sm text-gray">
                allergens appear here
              </p>
            </div>
            <div 
            style={{
                backgroundColor: '#FAF7F0',
            }}
            className="rounded-2xl border p-5 text-left transition shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-xl font-semibold">Diets</h3>
              <p className="text-sm text-gray">
                diets appear here
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}