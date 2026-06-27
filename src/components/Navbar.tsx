import React from 'react'
import Menu from './Menu'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40 xl:px-40">
            <div className="hidden md:flex gap-4 flex-1">
                <Link href="/">Home</Link>
                <Link href="/groceries">Groceries</Link>
                <Link href="/dining">Dining</Link>
                <Link href="/recipes">Recipes</Link>
                <Link href="/blogs">Blogs</Link>
            </div>
            {/* LOGO */}
            <div className="text-xl md:font-bold flex-1 md:text-center">
                <Link href="/">ZeroCross</Link>
            </div>
            {/* MENU */}
            <div className="md:hidden">
                <Menu />
            </div>
            {/* RIGHT LINKS */}
            <div className="hidden md:flex gap-4 items-center justify-end flex-1">
                <Link href="/login">Login</Link>
                {/* <CartIcon /> */}
            </div>
        </div>
    )
}

export default Navbar