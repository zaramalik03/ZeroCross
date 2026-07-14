"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
 

const Navbar = () => {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)

    const links = [
        { href: '/', label: 'Home' },
        { href: '/search/groceries', label: 'Groceries' },
        { href: '/search/places', label: 'Dining' },
        { href: '/recipes', label: 'Recipes' },
        { href: '/search', label: 'Search' },
        // { href: '/blogs', label: 'Community' },
    ]

    return (
        <nav
            style={{ backgroundColor: '#e2efef', fontFamily: 'Inter, system-ui, sans-serif' }}
            className="sticky top-0 z-50 shadow-md"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span
                        className="text-xl font-bold tracking-tight"
                        style={{ color: '#151b3a', fontFamily: 'Playfair Display, Georgia, serif' }}
                    >
                        Zero<span style={{ color: '#151b3a' }}>Cross</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors duration-200"
                            style={{
                                color: pathname === link.href ? '#226580' : '#545554',
                                borderBottom: pathname === link.href ? '2px solid #226580' : '2px solid transparent',
                                paddingBottom: '2px',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                        style={{ color: '#ffffff', backgroundColor: '#151b3a' }}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/onboarding"
                        className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                        style={{ color: '#ffffff', backgroundColor: '#151b3a' }}
                    >
                        Profile
                    </Link>
                </div>                

                {/* Mobile menu button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="block w-5 h-0.5 bg-white"></span>
                    <span className="block w-5 h-0.5 bg-white"></span>
                    <span className="block w-5 h-0.5 bg-white"></span>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{ backgroundColor: '#151b3a', borderTop: '1px solid #2A5C42' }} className="md:hidden px-6 py-4 flex flex-col gap-4">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium"
                            style={{ color: pathname === link.href ? '#151b3a' : '#545554' }}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="text-sm font-semibold text-center py-2 rounded-full"
                        style={{ backgroundColor: '#151b3a', color: '#ffffff' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/onboarding"
                        className="text-sm font-semibold text-center py-2 rounded-full"
                        style={{ backgroundColor: '#151b3a', color: '#ffffff' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Build my Profile
                    </Link>                        
                </div>
            )}
        </nav>
    )
}

export default Navbar


// Old NavBar from last week
// const Navbar = () => {
//     return (
//         <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40 xl:px-40">
//             <div className="hidden md:flex gap-4 flex-1">
//                 <Link href="/">Home</Link>
//                 <Link href="/groceries">Groceries</Link>
//                 <Link href="/dining">Dining</Link>
//                 <Link href="/recipes">Recipes</Link>
//                 <Link href="/blogs">Blogs</Link>
//             </div>
//             {/* LOGO */}
//             <div className="text-xl md:font-bold flex-1 md:text-center">
//                 <Link href="/">ZeroCross</Link>
//             </div>
//             {/* MENU */}
//             <div className="md:hidden">
//                 <Menu />
//             </div>
//             {/* RIGHT LINKS */}
//             <div className="hidden md:flex gap-4 items-center justify-end flex-1">
//                 <Link href="/login">Login</Link>
//                 {/* <CartIcon /> */}
//             </div>
//         </div>
//     )
// }

// export default Navbar