import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return <>
    <Navbar />
    <div className="movie-app bg-[#44406F]">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </>
}
