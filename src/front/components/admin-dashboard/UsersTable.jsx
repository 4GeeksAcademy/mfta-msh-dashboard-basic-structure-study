import React, { useState } from 'react'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import EditUserModal from './EditUserModal'
import DeleteUserModal from './DeleteUserModal'
import AddUserModal from './AddUserModal'

const UsersTable = () => {
    const { store } = useGlobalReducer()
    const [selectedUser, setSelectedUser] = useState(null)

    return (
        <div className="d-flex flex-column w-100 h-100">
            <h2 className='fs-5 fw-semibold'>Users Table</h2>
            <div className="d-flex justify-content-end py-3">
                <button className="btn btn-sm btn-primary">Add User</button>
            </div>
            <table className="table table-striped table-hover table-bordered mb-4">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Username</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store.usersList?.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
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