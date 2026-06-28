import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { ThemeToggle } from "../components/ThemeToggle"
import ProfileSheet from "../components/profile/ProfileSheet"

const WithNavbar = () => {
    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <div className="relative pb-28">
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            <Outlet />
            <Navbar onOpenProfile={() => setProfileOpen(true)} />
            <ProfileSheet open={profileOpen} onClose={() => setProfileOpen(false)} />
        </div>
    )
}

export default WithNavbar
