// Creates database of all certified allergen-free groceries, restaurants, and dining places. Users can search for allergen-free options and view details about each item.
// Add filter for groceries, places.
// Change the page to first show if you want groceries, or places to go; then direct to that page.
"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SearchPage() {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        // Fetch search results from the backend API
        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            setSearchResults(data.results)
        } catch (error) {
            console.error('Error fetching search results:', error)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
            <h1 style={{fontFamily: 'Fraunces, serif', fontWeight: 550, color: '#151b3a'}} className="text-4xl lg:text-5xl mb-3">Search Allergen-Free Options</h1>
            <div className="mb-7 flex gap-4">
                <Link
                    href="/search/groceries"
                    className="px-5 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200"
                    style={{ borderColor: '#A7C4B5', color: '#151b3a', backgroundColor: '#ffffff' }}
                >
                    Groceries
                </Link>
                <Link
                    href="/search/places"
                    className="px-5 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200"
                    style={{ borderColor: '#A7C4B5', color: '#151b3a', backgroundColor: '#ffffff' }}
                >
                    Places to Go
                </Link>
            </div>
            {/* If clicked on groceries, show database of all allergen-free groceries */}
            {/* If clicked on places, show database of all allergen-free restaurants and dining places */}
            <div className="mb-6">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for groceries, restaurants, or recipes..."
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', color: '#1A3D2B' }}
                    />
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                        style={{ backgroundColor: '#151b3a', color: '#ffffff' }}
                    >
                        Search
                    </button>
                </form>
            </div>
            <div>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((result: any) => (
                            <li key={result.id} className="mb-2">
                                <Link href={result.url} className="text-blue-600 hover:underline">
                                    {result.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    )
}
