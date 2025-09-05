import React from 'react'
import { Outlet } from 'react-router-dom'
import RestroHeader from '../../components/restro component/RestroHeader'
import RestroSideBar from '../../components/restro component/RestroSideBar'

export default function RestroLayout() {
  return (
    <>

      <div className='bg-gray-100 relative'>
        <RestroHeader />
        <div className='grid grid-cols-11 '>
          <div className='col-span-2  bg-white' >
            <RestroSideBar />
          </div>
          <div className='col-span-9' >
            <Outlet />
          </div>
        </div>
      </div>

    </>
  )
}
