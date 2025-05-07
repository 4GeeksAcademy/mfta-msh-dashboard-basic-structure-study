import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark h-100">
            <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"><i className="fa-solid fa-bars"></i></button>

            <div className="offcanvas-lg offcanvas-end lg-show text-bg-dark" style={{ width: '250px'}} tabIndex={-1} id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
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