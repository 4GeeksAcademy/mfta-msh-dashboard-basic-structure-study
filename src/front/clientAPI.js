// Obtain the API URL from the environment Vite variable
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/';

export async function registerUser(email, username, password, role="user") {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username, password, role })
  });
  if (!response.ok) {
    throw new Error('Failed to register');
  }
  const data = await response.json();
  return data;
}


export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    throw new Error('Failed to login');
  }
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
}


export async function getUsersList() {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users list');
  }
  const data = await response.json();
  return data;
}


export async function getUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data;
}

