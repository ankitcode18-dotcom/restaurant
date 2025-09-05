import React from 'react'
import AdminHeader from '../../components/admin component/AdminHeader'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/admin component/SideBar'

export default function AdminLayout() {
  return (
    <>
      <div className='bg-gray-100 relative'>
        <AdminHeader />
        <div className='grid grid-cols-11 '>
          <div className='col-span-2 bg-white' >
            <SideBar />
          </div>
          <div className='col-span-9' >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
