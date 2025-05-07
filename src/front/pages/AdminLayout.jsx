import React from 'react'
import Sidebar from '../components/admin-dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='d-flex align-items-start bg-primary'  style={{ height: '95vh' }}>
        <Sidebar />
        <div className="d-flex p-3 p-md-4 overflow-y-scroll w-100 h-100">
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout