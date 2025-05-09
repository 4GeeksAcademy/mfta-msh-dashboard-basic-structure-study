import React, { useEffect, useState } from 'react'
import EditUserModal from './EditUserModal'
import DeleteUserModal from './DeleteUserModal'
import AddUserModal from './AddUserModal'
import { getUsersList } from '../../clientAPI'

const UsersTable = () => {
    const [usersList, setUsersList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await getUsersList()
                setUsersList(response)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }
        fetchUsers()
    }, [])

    return (
        <div className="d-flex flex-column w-100 h-100">
            <h2 className='fs-5 fw-semibold'>Users Table</h2>
            <div className="d-flex justify-content-end py-3">
                <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add User</button>
            </div>
            <table className="table table-striped table-hover table-bordered mb-4">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersList.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>{user.is_active ? "active" : "inactive"}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-solid fa-gear me-1"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=> {setSelectedUser(user)}}><i className="fa-solid fa-pen me-2"></i> Edit</button></li>
                                            <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> {setSelectedUser(user)}}><i className="fa-solid fa-trash-can me-2"></i> Delete</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Modals */}
            <AddUserModal modalId="addModal" />
            <EditUserModal modalId="editModal" selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <DeleteUserModal modalId="deleteModal" selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
    )
}

export default UsersTable