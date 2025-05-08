import React, { useState } from 'react'

const AddUserModal = ({ modalId }) => {
    const [user, setUser] = useState({ id: null, lastName: "", name: "", username: "", password: "" });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value
        }));
    }

    const handleReset = () => {
        setUser({ id: null, lastName: "", name: "", username: "", password: "" });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('User updated:', user);
        // Reset the form after successful submission
        handleReset();
        // Close the modal after successful submission
    }

    return (
        <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`${modalId}Label`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`${modalId}Label`}>Create User</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReset}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" value={user.name} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastName" value={user.lastName} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" value={user.username} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" value={user.password} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleReset} >Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default AddUserModal