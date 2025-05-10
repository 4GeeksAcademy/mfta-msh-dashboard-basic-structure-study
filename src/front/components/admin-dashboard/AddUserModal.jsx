import React, { useState, useRef, useEffect } from 'react'
import { Modal } from 'bootstrap'
import { registerUser } from '../../clientAPI'

const AddUserModal = ({ modalId }) => {
    const [new_user, setNewUser] = useState({
        email: "",
        username: "",
        password: "",
        role: "user"
    })
    const { email, username, password } = new_user

    const modalRef = useRef(null);

    useEffect(() => {
        const myModal = new Modal("#" + modalId);
        modalRef.current = myModal;
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewUser((prevNewUser) => ({
            ...prevNewUser,
            [id]: value
        }));
    }

    const handleReset = () => {
        setNewUser({
            email: "",
            username: "",
            password: "",
            role: "user"
        });
    }

    const handleClose = () => {
        modalRef.current.hide();
        handleReset();
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(email, username, password);
            if (data) {
                alert("User registered successfully");
                // Reset form and close the modal after successful registration
                handleClose();
            }
        }
        catch (error) {
            alert("Error registering user");
            console.error(error);
        }
    }

    return (
        <div ref={modalRef} className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`${modalId}Label`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`${modalId}Label`}>Create User</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReset}></button>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" required value={email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" value={username} required onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" required value={password} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleReset}>Close</button>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    )
}

export default AddUserModal