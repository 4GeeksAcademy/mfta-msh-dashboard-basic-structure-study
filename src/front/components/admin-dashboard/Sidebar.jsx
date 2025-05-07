import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div style={{ width: '250px'}} className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100">
            <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">Toggle offcanvas</button>

            <div className="offcanvas-lg offcanvas-end" tabIndex={-1} id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">


                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/admin">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/users">Users</Link>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    )
}

export default Sidebar