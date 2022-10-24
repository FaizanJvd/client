import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
const UserRoutes = () => {
  return (
    <div className='d-flex'>
    <div className='vh-100 bg-dark'>
      <Sidebar/>
    </div>
    <div>
      <Outlet/>
    </div>
    </div>
  )
}

export default UserRoutes
