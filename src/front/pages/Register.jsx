import React from 'react'

const Register = () => {
  return (
    <div className="d-flex flex-column w-100 h-100">
      <h2 className='fs-5 fw-semibold'>Register</h2>
      <div className="d-flex justify-content-center align-items-center h-100">
        <form className="w-25">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register