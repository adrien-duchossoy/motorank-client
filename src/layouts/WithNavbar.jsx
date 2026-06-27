import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const WithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

export default WithNavbar
