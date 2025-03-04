import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footerme from '@/components/Footer/Footer'


export default function Layout() {
  return <>
    <Navbar />
    <div className="movie-app bg-[#44406F]">
      <div className="container min-h-screen py-12">
        <Outlet />
      </div>
    </div>
    <Footerme/>
  </>
}
