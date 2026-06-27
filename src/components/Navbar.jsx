import { useContext } from "react"
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
} from '@hugeicons/core-free-icons'

const Navbar = () => {
    const { pathname } = useLocation()
    const { isLoggedIn } = useContext(AuthContext)

    const navItems = isLoggedIn
        ? [
            { label: 'Feed',    icon: Home01Icon,   to: '/' },
            { label: 'Explore', icon: Search01Icon, to: '/explore' },
            { label: 'Garage',  icon: GarageIcon,   to: '/garage' },
            { label: 'Saved',   icon: BookmarkIcon, to: '/saved' },
            { label: 'Profile', icon: User02Icon,   to: '/profile' },
        ]
        : [
            { label: 'Explore', icon: Search01Icon, to: '/explore' },
            { label: 'Login',   icon: Login01Icon,  to: '/logging' },
        ]

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-zinc-100/90 dark:bg-zinc-950/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-2xl">
                {navItems.map(({ label, icon, to }) => {
                    const isActive = pathname === to
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                                isActive
                                    ? 'text-zinc-900 dark:text-white'
                                    : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                            }`}
                        >
                            <HugeiconsIcon
                                icon={icon}
                                size={22}
                                strokeWidth={isActive ? 2 : 1.5}
                            />
                            <span className="text-[10px] font-medium tracking-wide">{label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navbar
