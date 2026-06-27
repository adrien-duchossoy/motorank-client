import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'

const WithNavbar = () => (
  <div className="relative pb-28">
    <div className="absolute top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    <Outlet />
    <Navbar />
  </div>
)

export default WithNavbar
