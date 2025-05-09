import React, {useState} from 'react'
import { loginUser } from '../clientAPI'
import { useNavigate } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'

const Login = () => {
    const navigate = useNavigate()
    const {dispatch} = useGlobalReducer()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser(email, password)
            console.log('Login successful:', response)
            dispatch({type: "login", payload: response.user})
            navigate("/")
        }
        catch (error) {
            console.error('Login failed:', error)
        }
    }

    const handleValueChange = (e) => {
        const { id, value } = e.target
        if (id === 'email') {
            setEmail(value)
        } else if (id === 'password') {
            setPassword(value)
        }
    }


  return (
    <div className="d-flex flex-column w-100 h-100">
      <h2 className='fs-5 fw-semibold'>Login</h2>
      <div className="d-flex justify-content-center align-items-center h-100">
        <form className="w-25" onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} required onChange={(e) => {handleValueChange(e)}} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} required onChange={(e) => {handleValueChange(e)}} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login