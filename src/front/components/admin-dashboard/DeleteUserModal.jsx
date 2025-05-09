import React from 'react'

const DeleteUserModal = ({ modalId, selectedUser, setSelectedUser }) => {

    const resetSelectedUser = () => {
        setSelectedUser(null);
    }

    return (
        <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`${modalId}Label`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`${modalId}Label`}>Warning</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetSelectedUser}></button>
                    </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this user?</p>
                            <p>This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetSelectedUser} >Close</button>
                            <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                        </div>

                </div>
            </div>
        </div >
    )
}

export default DeleteUserModal