import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons'

const WithoutNavbar = () => {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen">
            <div className="absolute top-4 left-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <HugeiconsIcon icon={ArrowLeft01Icon} />
                </Button>
            </div>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <Outlet />
        </div>
    )
}

export default WithoutNavbar
