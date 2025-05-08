import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	const handleAdminLogin = () => {
		dispatch({type: "simulate_admin_login"});
	}

	const handleUserLogin = () => {
		dispatch({type: "simulate_user_login"});
	}

	return (
		<nav className="navbar navbar-expand-lg shadow-sm">
			<div className="container-fluid">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">Dashboard Study</span>
				</Link>
				<div className="ml-auto d-flex justify-content-end gap-2">
					{
						!store.user?.id && 
						<>
							<button className="btn btn-primary" onClick={handleAdminLogin}>Simulate Login as Admin</button>
							<button className="btn btn-secondary" onClick={handleUserLogin}>Simulate Login as User</button>
						</>
					}

					{
						store.user?.id &&
						<>
							<span className="text-white">Welcome, {store.user.username}</span>
							<button className="btn btn-danger" onClick={() => dispatch({type: "simulate_logout"})}>Simulate Logout</button>
						</>
					}
					{
						store.user?.role === "admin" &&
						<Link to="/admin" className="btn btn-info">
							Admin Dashboard
						</Link>
					}
					
				</div>
			</div>
		</nav>
	);
};