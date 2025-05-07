import React, { useEffect } from 'react'
import Sidebar from '../components/admin-dashboard/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'

const AdminLayout = () => {
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer()
  const adminIsLoggedIn = store.user?.role === 'admin'

  useEffect(() => {
    if (!adminIsLoggedIn) {
      navigate('/')
    }
  }, [adminIsLoggedIn, navigate])

  return (
    <>
      {
        !adminIsLoggedIn &&
        <></>
      }
      {
        adminIsLoggedIn &&
        <div className='d-flex align-items-start bg-light' style={{ height: '95vh' }}>
          <Sidebar />
          <div className="d-flex p-3 p-md-4 overflow-y-scroll w-100 h-100">
            <Outlet />
          </div>
        </div>
      }
    </>
  )
}

export default AdminLayout