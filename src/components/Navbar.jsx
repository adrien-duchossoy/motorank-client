import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { HugeiconsIcon } from '@hugeicons/react'
import {
    Home01Icon,
    Search01Icon,
    GarageIcon,
    BookmarkIcon,
    User02Icon,
    Login01Icon,
    Motorbike01Icon,
} from '@hugeicons/core-free-icons'

const Navbar = () => {
    const { pathname } = useLocation()
    const { isLoggedIn, loggedUserRole } = useContext(AuthContext)
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const canAddBike = loggedUserRole === "verified" || loggedUserRole === "admin"

    const loggedInItems = [
        { label: 'Feed',    icon: Home01Icon,     to: '/feed' },
        { label: 'Explore', icon: Search01Icon,   to: '/' },
        ...(canAddBike ? [{ label: 'New Bike', icon: Motorbike01Icon, to: '/new-bike' }] : []),
        { label: 'Garage',  icon: GarageIcon,     to: '/garage' },
        { label: 'Saved',   icon: BookmarkIcon,   to: '/saved' },
        { label: 'Profile', icon: User02Icon,     to: '/me' },
    ]

    const navItems = isLoggedIn
        ? loggedInItems
        : [
            { label: 'Explore', icon: Search01Icon, to: '/explore' },
            { label: 'Login',   icon: Login01Icon,  to: '/auth' },
        ]
    
    const getScaleClass = (index) => {
        if (hoveredIndex === null) return "scale-100"
        const distance = Math.abs(index - hoveredIndex)
        if (distance === 0) return "scale-[1.6]"
        if (distance === 1) return "scale-[1.3]"
        if (distance === 2) return "scale-[1.1]"
        return "scale-100"
    }

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-zinc-100/90 dark:bg-zinc-950/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-2xl">
                {navItems.map(({ label, icon, to }, index) => {
                    const isActive = pathname === to
                    const sharedClass = `nav-item flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                        isActive
                            ? 'text-zinc-900 dark:text-white'
                            : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                    } transition-transform duration-500 origin-bottom ${getScaleClass(index)}`
                    return (
                        <Link 
                            key={to} 
                            to={to} 
                            className={sharedClass}
                            onMouseEnter={() => {setHoveredIndex(index)}}
                            onMouseLeave={() => {setHoveredIndex(null)}}
                        >
                            <HugeiconsIcon icon={icon} size={22} strokeWidth={isActive ? 2 : 1.5} />
                            <span className="text-[10px] font-medium tracking-wide">{label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navbar
