import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-expand-lg shadow-sm">
			<div className="container-fluid">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">Dashboard Study</span>
				</Link>
				<div className="ml-auto d-flex justify-content-end gap-3 align-items-center">
					{
						!store.user?.id && 
						<>
							<Link to="/login" >Login</Link>
							<Link to="/register" >Register</Link>
						</>
					}

					{
						store.user?.id && store.user?.role === "admin" &&
						<Link to="/admin" className="">
							Admin Dashboard
						</Link>
					}
					{
						store.user?.id &&
						<>
							<button className="btn btn-sm btn-outline-danger" onClick={() => dispatch({type: "logout"})}>Logout</button>
						</>
					}
					
					
				</div>
			</div>
		</nav>
	);
};