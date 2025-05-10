import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../clientAPI'

const Register = () => {
  const navigate = useNavigate()
  const [new_user, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
    role: "user"
  })
  const { email, username, password } = new_user

  const handleChange = (e) => {
    setNewUser({
      ...new_user,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await registerUser(email, username, password)
      if (data) {
        alert("User registered successfully")
        navigate("/login")
      }
    }
    catch (error) {
      alert("Error registering user")
      console.error(error)
    }
  }



  return (
    <div className="d-flex flex-column w-100 h-100">
      <h2 className='fs-5 fw-semibold text-center my-4'>Register</h2>
      <div className="d-flex justify-content-center align-items-center h-100">
        <form className="w-25" onSubmit={handleSubmit} >
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
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register